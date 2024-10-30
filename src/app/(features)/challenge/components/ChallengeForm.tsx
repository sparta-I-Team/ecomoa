import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useChallengeStore } from "@/zustand/challengeStore";
import { useModal } from "@/zustand/modalStore";
import { ChallengeFormInputs } from "@/types/challengesType";
import Select from "./form/Select";
import ImageUpload from "./form/ImageUpload";
import BlackAutoWidthButton from "./ui/BlackAutoWidthButton";
import { useChallengeMutation } from "@/hooks/useChallenge";
import { calculateTotalCarbon } from "@/utlis/challenge/calculateCarbon";
import { CHALLENGES } from "@/utlis/challenge/challenges";
import { getUser } from "@/api/auth-actions";

export const ChallengeForm = () => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { selectedChallenges, setStep } = useChallengeStore();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChallengeFormInputs>();

  const { openModal } = useModal();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviews((prev) => [...prev, previewUrl]);
    setImageFiles((prev) => [...prev, file]);

    e.target.value = "";
  };

  const handleDeleteImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOptionToggle = (challengeId: string, optionId: string) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[challengeId] || [];
      const newOptions = currentOptions.includes(optionId)
        ? currentOptions.filter((id) => id !== optionId)
        : [...currentOptions, optionId];

      return {
        ...prev,
        [challengeId]: newOptions
      };
    });
  };

  const challengeMutation = useChallengeMutation();

  const onSubmit = async (data: ChallengeFormInputs) => {
    try {
      const totalCarbon = calculateTotalCarbon(selectedChallenges);

      await challengeMutation.mutateAsync({
        userId: userId,
        content: data.content,
        images: imageFiles,
        selectedOptions,
        carbon: totalCarbon,
        point: selectedChallenges.length * 100
      });

      openModal(
        <div className="p-6 flex flex-col items-center w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">챌린지 인증 완료!</h2>
          <p className="text-gray-700">
            오늘의 챌린지를 성공적으로 완료했습니다.
          </p>
          <p className="mt-2 text-lg font-semibold">
            포인트 획득: {selectedChallenges.length * 100}
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-4 w-full">
            {CHALLENGES.filter((c) => selectedChallenges.includes(c.id)).map(
              (ch) => (
                <div
                  key={ch.id}
                  className="
                  rounded-full bg-black px-4 py-1.5 text-sm 
                  text-white shadow-sm whitespace-nowrap
                  "
                  title={ch.label}
                >
                  {ch.label}
                </div>
              )
            )}
          </div>
        </div>
      );

      setStep(1);
    } catch (error) {
      alert("챌린지 등록에 실패했습니다.");
      console.error("Challenge submission error:", error);
    }
  };

  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const handleGetUser = async () => {
      const res = await getUser();
      setUserId(res?.id || "");
    };
    handleGetUser();
  }, []);

  return (
    <div className="mx-auto">
      <button
        onClick={() => setStep(1)}
        className="mb-4 px-4 py-2 hover:text-gray-700 transition-colors"
      >
        ← 챌린지 홈
      </button>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg p-6">
        <div className="mb-6">
          <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
        </div>

        <Select
          selectedOptions={selectedOptions}
          onToggle={handleOptionToggle}
        />

        <ImageUpload
          register={register}
          onChange={handleImageChange}
          errors={errors}
          previews={previews}
          onDelete={handleDeleteImage}
        />

        <div className="mt-6">
          <textarea
            {...register("content", { required: "내용을 입력해주세요" })}
            className="w-full p-4 border rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="내용을 입력해주세요"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <BlackAutoWidthButton
          text={challengeMutation.isPending ? "제출 중..." : "인증 완료"}
          disabled={challengeMutation.isPending}
        />
      </form>
    </div>
  );
};

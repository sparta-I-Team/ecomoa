import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useModalStore } from "@/zustand/modalStore";
import { useChallengeStore } from "@/zustand/challengeStore";
import { userStore } from "@/zustand/userStore";
import { useChallengeMutation } from "@/hooks/useChallenge";
import { calculateTotalCarbon } from "@/utlis/challenge/calculateCarbon";
import { CHALLENGES } from "@/utlis/challenge/challenges";
import { ChallengeFormInputs } from "@/types/challengesType";

export const useChallengeForm = () => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const { selectedChallenges, setStep } = useChallengeStore();
  const { user } = userStore();
  const { openModal, closeModal } = useModalStore();
  const challengeMutation = useChallengeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<ChallengeFormInputs>();

  const handleOptionToggle = (challengeId: string, optionId: string) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[challengeId] || [];
      const newOptions = currentOptions.includes(optionId)
        ? currentOptions.filter((id) => id !== optionId)
        : [...currentOptions, optionId];

      const updatedOptions = {
        ...prev,
        [challengeId]: newOptions
      };

      const allOptionsSelected = selectedChallenges.every((id) => {
        const options = updatedOptions[id] || [];
        return options.length > 0;
      });

      if (allOptionsSelected) {
        clearErrors("selectedOptions");
      }

      return updatedOptions;
    });
  };

  const successModalContent = useMemo(
    () => (
      <div className="p-6 flex flex-col items-center w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">챌린지 인증 완료!</h2>
        <p className="text-gray-700">
          오늘의 챌린지를 성공적으로 완료했습니다.
        </p>
        <p className="mt-2 text-lg font-semibold">
          포인트 획득: {selectedChallenges.length * 100}P
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-4 w-full">
          {CHALLENGES.filter((c) => selectedChallenges.includes(c.id)).map(
            (ch) => (
              <div
                key={ch.id}
                className="rounded-full bg-black px-4 py-1.5 text-sm text-white shadow-sm whitespace-nowrap"
                title={ch.label}
              >
                {ch.label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    [selectedChallenges]
  );

  const onSubmit = async (data: ChallengeFormInputs, imageFiles: File[]) => {
    try {
      const unselectedChallenges = selectedChallenges.filter((challengeId) => {
        return (
          !selectedOptions[challengeId] ||
          selectedOptions[challengeId].length === 0
        );
      });

      if (unselectedChallenges.length > 0) {
        const challengeNames = unselectedChallenges
          .map((id) => CHALLENGES.find((c) => c.id === id)?.label)
          .filter(Boolean)
          .join(", ");

        setError("selectedOptions", {
          type: "validate",
          message: `${challengeNames}의 상세 항목을 선택해주세요.`
        });
        return;
      }

      const totalCarbon = calculateTotalCarbon(selectedChallenges);

      await challengeMutation.mutateAsync({
        userId: user.id,
        content: data.content,
        images: imageFiles,
        selectedOptions,
        carbon: totalCarbon,
        point: selectedChallenges.length * 100
      });

      openModal(successModalContent, "autoClose", 2000);
      setStep(1);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("이미 오늘의 챌린지를 제출")
      ) {
        openModal(alreadyParticipatedModalContent, "persistent", 0);
      } else {
        openModal(
          <div className="p-10 flex flex-col items-center w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-500">오류 발생</h2>
            <p className="text-gray-700 text-center">
              {error instanceof Error
                ? error.message
                : "챌린지 등록에 실패했습니다."}
            </p>
          </div>,
          "autoClose",
          2000
        );
      }
    }
  };
  const alreadyParticipatedModalContent = useMemo(
    () => (
      <div className="p-10 flex flex-col items-center w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">이미 참여하셨어요!</h2>
        <p className="text-gray-700 mb-2">
          오늘은 이미 챌린지에 참여하셨습니다.
        </p>
        <p className="text-gray-600">내일 다시 도전해주세요! 🌱</p>
        <button
          className="mt-6 px-6 py-2 w-full bg-black text-white rounded"
          onClick={() => {
            closeModal();
            setStep(1);
          }}
        >
          확인
        </button>
      </div>
    ),
    [closeModal, setStep]
  );

  const goBackModalContent = useMemo(
    () => (
      <div className="flex flex-col p-10 w-[600px]">
        <div className="flex flex-col justify-center items-center space-y-2 text-2xl pt-16">
          <p className="text-gray-800">챌린지 인증을 취소하겠습니까?</p>
          <p className="text-gray-800">
            지금 인증하면{" "}
            <span className="font-bold text-black">
              {selectedChallenges.length * 100}P
            </span>
            를 받을 수 있어요!
          </p>
        </div>
        <div className="flex gap-4 mt-12">
          <button
            className="px-6 py-4 mt-6 w-full bg-gray-300 transition-colors"
            onClick={() => {
              setStep(1);
              closeModal();
            }}
          >
            다음에 인증할게요
          </button>
          <button
            className="px-6 py-4 mt-6 w-full bg-black text-white transition-colors"
            onClick={closeModal}
          >
            계속 작성할게요
          </button>
        </div>
      </div>
    ),
    [closeModal, setStep, selectedChallenges.length]
  );

  return {
    selectedOptions,
    register,
    handleSubmit,
    errors,
    handleOptionToggle,
    onSubmit,
    handleOpenGoBackModal: () => openModal(goBackModalContent, "persistent", 0),
    challengeMutation
  };
};

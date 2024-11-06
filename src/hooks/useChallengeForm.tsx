import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useModalStore } from "@/zustand/modalStore";
import { useChallengeStore } from "@/zustand/challengeStore";
import { userStore } from "@/zustand/userStore";
import { useChallengeMutation } from "@/hooks/useChallenge";
import { calculateTotalCarbon } from "@/utlis/challenge/calculateCarbon";
import { CHALLENGES } from "@/utlis/challenge/challenges";
import { ChallengeFormInputs } from "@/types/challengesType";
import Image from "next/image";

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
      <div className="flex flex-col items-center w-[615px]">
        <figure className="block">
          <Image
            src="/images/complete.png"
            alt="챌린지 완료 이미지"
            width={615}
            height={422}
            className="rounded-xl"
          />
        </figure>
        <div className="flex flex-col justify-center items-center gap-[30px] mt-[40px]">
          <h2 className="text-[24px] font-semibold">챌린지 인증 완료했어요!</h2>
          <p className="text-[24px] font-semibold">
            총{" "}
            <span className="text-[#0D9C36]">
              {selectedChallenges.length * 100}
            </span>
            P를 모았어요!
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-4 w-full p-6">
          {CHALLENGES.filter((c) => selectedChallenges.includes(c.id)).map(
            (ch) => (
              <div
                key={ch.id}
                className="rounded-full bg-[#0D9C36] p-2 text-sm text-white shadow-sm whitespace-nowrap"
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

  const goBackModalContent = (
    <div className="flex flex-col w-[585px] h-[300px] p-6">
      <div className="flex flex-col justify-center mb-[60px]">
        <figure className="mx-auto mb-[30px]">
          <Image
            src="/images/gobackImage.png"
            alt="뒤로가기 이미지"
            width={60}
            height={60}
          />
        </figure>
        <div className="flex flex-col font-semibold text-[22px] justify-center items-center gap-[30px]">
          <p className="">챌린지 인증을 취소하겠습니까?</p>
          <p className="text-gray-800">
            지금 인증하면{" "}
            <span className="font-bold text-[#0D9C36]">
              {selectedChallenges.length * 100}P
            </span>
            를 받을 수 있어요!
          </p>
        </div>
      </div>
      <div className="flex w-full h-[60px] gap-[12px] justify-between">
        <button
          className="w-1/2 bg-[#E8F3E8] rounded-full text-[#525660] border-none"
          onClick={() => {
            setStep(1);
            closeModal();
          }}
        >
          다음에 인증할게요
        </button>
        <button
          className="w-1/2 rounded-full bg-[#0D9C36] text-white border-none"
          onClick={closeModal}
        >
          계속 작성할게요
        </button>
      </div>
    </div>
  );

  // onSubmit 함수
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

      openModal({
        type: "custom",
        content: successModalContent,
        autoClose: 2000
      });

      setStep(1);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("이미 오늘의 챌린지를 제출")
      ) {
        openModal({
          type: "custom",
          content: (
            <div className="flex flex-col w-[585px] h-[300px] p-6">
              <div className="flex flex-col justify-center mb-[60px]">
                <figure className="mx-auto mb-[30px]">
                  <Image
                    src="/images/gobackImage.png"
                    alt="뒤로가기 이미지"
                    width={60}
                    height={60}
                  />
                </figure>
                <div className="flex flex-col font-semibold text-[22px] justify-center items-center gap-[30px]">
                  <p className="">오늘은 이미 챌린지에 참여하셨습니다.</p>
                  <p className="text-gray-800">내일 다시 도전해주세요! 🌱</p>
                </div>
              </div>
              <div className="flex w-full h-[60px] gap-[12px] justify-between">
                <button
                  className="w-full bg-[#0D9C36] rounded-full text-white border-none"
                  onClick={() => {
                    setStep(1);
                    closeModal();
                  }}
                >
                  다음에 인증하기
                </button>
              </div>
            </div>
          )
        });
      } else {
        openModal({
          type: "alert",
          content:
            error instanceof Error
              ? error.message
              : "챌린지 등록에 실패했습니다.",
          autoClose: 2000
        });
      }
    }
  };

  // handleOpenGoBackModal
  const handleOpenGoBackModal = () =>
    openModal({
      type: "custom",
      content: goBackModalContent
    });

  return {
    selectedOptions,
    register,
    handleSubmit,
    errors,
    handleOptionToggle,
    onSubmit,
    handleOpenGoBackModal,
    challengeMutation
  };
};

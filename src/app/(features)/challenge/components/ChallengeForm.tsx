import { ChallengeFormInputs } from "@/types/challengesType";
import { CHALLENGES } from "@/utlis/challenges";
import { useChallengeStore } from "@/zustand/challengeStore";
import { useModal } from "@/zustand/modalStore";
import { useForm } from "react-hook-form";

export const ChallengeForm = () => {
  const { selectedChallenges, setStep } = useChallengeStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChallengeFormInputs>();
  
  // 모달스토어에서 모달 openModal 함수 가져오기!!
  const { openModal } = useModal();

  const onSubmit = (data: ChallengeFormInputs) => {
    const submitData = {
      challenges: selectedChallenges.length,
      content: data.content,
      image: data.image,
      date: new Date().toISOString
    };
    console.log(submitData);

    // 모달안에 넣을 컨텐츠를 설정!
    openModal(
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-4">챌린지 인증 완료!</h2>
        <p>오늘의 챌린지를 성공적으로 완료했습니다.</p>
        <p className="mt-2">포인트 획득: {selectedChallenges.length * 100}</p>
      </div>
    );

    setStep(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border">
      {/* 날짜 표시 */}
      <div className="flex flex-row space-x-4">
        <h3 className="font-bold">오늘 날짜</h3>
        <p>{new Date().toLocaleDateString()}</p>
      </div>
      {/* 선택된 챌린지 목록 */}
      <div className="flex flex-row space-x-4">
        <h3 className="font-bold">챌린지</h3>
        <ul className="flex flex-row space-x-4">
          {selectedChallenges.map((id) => (
            <li key={id}>{CHALLENGES.find((c) => c.id === id)?.label}</li>
          ))}
        </ul>
      </div>
      {/* 이미지 업로드 */}
      <div className="flex flex-row space-x-4">
        <h3 className="font-bold">인증 사진</h3>
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: "인증 사진을 업로드해주세요." })}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>
      {/* 내용 작성 */}
      <div className="flex flex-row space-x-4">
        <h3 className="font-bold">글</h3>
        <textarea
          {...register("content", { required: "내용을 입력해주세요" })}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-black text-white rounded-lg"
      >
        인증하기
      </button>
    </form>
  );
};

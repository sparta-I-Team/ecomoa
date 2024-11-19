"use client";

import Image from "next/image";
import { CHALLENGE_OPTIONS, CHALLENGES } from "@/utlis/challenge/challenges";
import Link from "next/link";
import { useModalStore } from "@/zustand/modalStore";
import { Modal } from "@/components/shared/Modal";
import ChallengeForm from "@/app/(features)/challenge/components/ChallengeForm";
import { useDeleteChallenge, useGetChallenge } from "@/hooks/useChallenge";
import { useRouter } from "next/navigation";
import { userStore } from "@/zustand/userStore";

interface Props {
  params: {
    id: string;
  };
}

const ChallengeDetailPage = ({ params }: Props) => {
  const { data: challenge, isError } = useGetChallenge(params.id);
  const deleteChallenge = useDeleteChallenge(params.id);

  const { user } = userStore();
  const { openModal, closeModal } = useModalStore();
  const router = useRouter();

  const canEdit = user.id === challenge?.user_id;

  if (isError) {
    return (
      <div className="text-red-500">
        Challenge를 가져오는 데 오류가 발생했습니다.
      </div>
    );
  }

  if (!challenge) {
    return <div>로딩 중...</div>;
  }

  const handleDelete = async () => {
    openModal({
      type: "confirm",
      content: "정말 이 챌린지를 삭제하시겠습니까?",
      buttonText: {
        confirm: "삭제",
        cancel: "취소"
      },
      onConfirm: async () => {
        await deleteChallenge.mutateAsync();
        closeModal();
        router.push("/community");
      }
      // onConfirm: async () => {
      //   await deleteChallenge.mutateAsync();
      //   openModal({
      //     type: "custom",
      //     content: <div>챌린지가 성공적으로 삭제되었습니다.</div>,
      //     autoClose: 1500,
      //     onConfirm: () => {
      //       router.push("/community");
      //     }
      //   });
      // }
    });
  };

  const createdAtDate = new Date(challenge.created_at);
  const formattedDate = createdAtDate
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      weekday: "long"
    })
    .replace(/\./g, "")
    .replace(/(\d{4}) (\w{1,2}) (\d{1,2}) (\w+)/, "$1년 $2월 $3일 $4");

  const selectedCount = Object.values(challenge.selected_options).filter(
    (option) => option.length > 0
  ).length;
  const totalPoints = selectedCount * 100;

  return (
    <div className="mt-8 md:w-[1200px]  mx-auto mb-4 w-[330px] p-2 md:p-0">
      <Link href={"/community"}>{"< 챌린지 인증 "}</Link>
      <div className="mb-4 md:w-[1200px] h-px bg-[#D5D7DD] mt-4 w-[330px]"></div>
      <div className="flex flex-col md:flex-row md:items-center gap-[12px]">
        <label className="flex w-[72px] p-[12px_16px] justify-center items-center gap-2.5 rounded-[4px] bg-[#0D9C36] text-white md:flex-shrink-0">
          {totalPoints}P
        </label>
        <div className="flex  flex-row md:items-center gap-1">
          <label>{formattedDate}</label>
          <label>데일리 챌린지</label>
        </div>
      </div>

      <article className="mb-8 mt-[40px]">
        <div className="mb-4">
          <div className="mt-4 flex flex-col ">
            {Object.entries(
              challenge.selected_options as Record<string, string[]>
            ).map(([category, selectedIds]) => {
              const findLabelByCategory = (category: string) => {
                return CHALLENGES.find((item) => item.id === category);
              };
              const categoryName = findLabelByCategory(category)?.label;
              return (
                <div key={category} className="mb-4">
                  <h3 className="font-semibold">{categoryName}</h3>
                  <div key={category}>
                    {selectedIds.map((id) => {
                      const option = CHALLENGE_OPTIONS[category].find(
                        (opt) => opt.id === id
                      );
                      const imgSrc = CHALLENGES.filter(
                        (challenge) => challenge.id === category
                      )[0].image;

                      return (
                        <div key={id}>
                          <span className="mt-2 inline-flex py-4 px-[16px] mb-2 rounded-[32px] border border-[#D5D7DD] bg-[white] text-[14px] flex-wrap">
                            <Image
                              src={imgSrc}
                              alt="아이콘"
                              width={12}
                              height={12}
                              className="mr-2"
                            />
                            {option?.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex mb-4">
          <div className="flex space-x-2">
            {challenge.image_urls && challenge.image_urls.length > 0 ? (
              challenge.image_urls.map((url, idx) => (
                <Image
                  key={idx}
                  src={url}
                  alt={`Challenge ${idx + 1}`}
                  width={180}
                  height={180}
                  className="object-cover rounded-[12px]"
                />
              ))
            ) : (
              <div className="flex-none w-[220px] h-[220px] mb-4 bg-gray-200 flex items-center justify-center">
                <span>이미지가 없습니다</span>
              </div>
            )}
          </div>
        </div>
      </article>

      <div className="mt-6">
        <h1 className="font-bold text-[14px] mb-2">챌린지 내용</h1>
        <div className="w-full p-4 border rounded-lg min-h-[80px] bg-[#F5F5F5] border-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500">
          {challenge.content}
        </div>
      </div>
      <hr className="my-[10px]" />
      {canEdit && (
        <div className="flex flex-row gap-[4px] justify-end mt-[10px]">
          <button
            onClick={() =>
              openModal({
                type: "custom",
                content: <ChallengeForm initialData={challenge} />,
                className: "md:w-[585px] md:h-[800px] md:px-6"
              })
            }
            className="w-[80px] h-[32px] rounded text-[14px] "
          >
            수정하기
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteChallenge.isPending}
            className="w-[80px] h-[32px] rounded text-[14px]"
          >
            삭제하기
          </button>
        </div>
      )}
      <Modal />
    </div>
  );
};

export default ChallengeDetailPage;

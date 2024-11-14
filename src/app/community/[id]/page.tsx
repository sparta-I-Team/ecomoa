"use client";

import Image from "next/image";
import { CHALLENGE_OPTIONS, CHALLENGES } from "@/utlis/challenge/challenges";
import Link from "next/link";
import { useModalStore } from "@/zustand/modalStore";
import { Modal } from "@/components/shared/Modal";
import ChallengeForm from "@/app/(features)/challenge/components/ChallengeForm";
import { useDeleteChallenge, useGetChallenge } from "@/hooks/useChallenge";
import { ChallengeOption } from "@/types/challengesType";
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
    <div className="mt-8 w-[1200px]  mx-auto">
      <Link href={"/community"}>{"< 첼린지 인증 "}</Link>
      <div className="mb-4 w-[1200px] h-px bg-[#D5D7DD] mt-4"></div>

      <div className="flex items-center gap-2">
        <label className="flex p-[12px_16px] justify-center items-center gap-2.5 rounded-[4px] bg-[#0D9C36] text-white">
          {totalPoints}P
        </label>
        <label>{formattedDate}</label>
        <label>데일리 첼린지</label>
      </div>

      <article className="mb-8">
        <div className="mb-4">
          <div className="p-2 mt-2 flex flex-col gap-4">
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
                  <div className="flex flex-col space-y-2 mt-4">
                    {(selectedIds as string[]).map((id) => {
                      const option = (
                        CHALLENGE_OPTIONS[category] as ChallengeOption[]
                      )?.find((opt) => opt.id === id);
                      return (
                        <label
                          key={id}
                          className="mb-2 inline-block rounded-[32px] border border-[#D5D7DD] p-2 w-fit"
                        >
                          {option?.label}
                        </label>
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
            {(challenge.image_urls as string[]).map((url, idx) => (
              <Image
                key={idx}
                src={url}
                alt={`Challenge ${idx + 1}`}
                width={180}
                height={180}
                className="object-cover rounded-[12px]"
              />
            ))}
          </div>
        </div>
      </article>

      {canEdit && (
        <div>
          <button
            onClick={() =>
              openModal({
                type: "custom",
                content: <ChallengeForm initialData={challenge} />,
                className: "w-[1200px] h-[800px] p-6"
              })
            }
            className="w-[80px] h-[32px] rounded text-[14px]"
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

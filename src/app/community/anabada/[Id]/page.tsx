"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { communityApi } from "@/api/communityApi";
import { Post } from "@/types/community";
import { userStore } from "@/zustand/userStore";
import { useRouter } from "next/navigation";
import EditPostModal from "../../components/EditPostModal";
import { useModalStore } from "@/zustand/modalStore";
import { Modal } from "@/components/shared/Modal";

const Page = ({ params }: { params: { Id: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { openModal, closeModal } = useModalStore();
  const { Id } = params;
  const router = useRouter();

  const { user } = userStore();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await communityApi.getPostById(Id);
        if (error) {
          setErrorMessage(error);
          return;
        }

        if (data) {
          setPost(data); // post 상태 업데이트
        } else {
          setErrorMessage("게시글이 없습니다.");
        }
      } catch (error) {
        setErrorMessage("게시글을 불러오는 데 오류가 발생했습니다.");
        console.log("error", error);
      }
    };

    fetchPost();
  }, [Id]);

  if (errorMessage) {
    return (
      <div className="text-center mt-10">
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-10">
        <p>게시글을 불러오는 중입니다...</p>
      </div>
    );
  }

  const images = post.post_img ?? [];

  const canEdit = user.isAuthenticated && post.user_id === user.id;

  // 수정 버튼 클릭 시 모달 열기
  const handleEditClick = () => {
    if (post) {
      openModal({
        type: "custom",
        content: (
          <EditPostModal
            type="anabada"
            onClose={closeModal}
            post={post}
            onSave={(updatedPost) => {
              handleSavePost(updatedPost);
              closeModal();
            }}
          />
        )
      });
    }
  };

  // 수정된 게시글 저장
  const handleSavePost = async (editedPost: Post) => {
    try {
      // 게시글 정보를 업데이트
      const { error } = await communityApi.update(editedPost);

      if (error) {
        throw error;
      }

      // 상태 업데이트 및 모달 닫기
      setPost(editedPost);
      console.log("게시글 수정 성공:", editedPost);
    } catch (error) {
      // 오류 처리
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeletePost = async (post: Post) => {
    const confirmed = window.confirm("정말 삭제 하시겠습니까?");
    console.log("컨펌", confirmed);
    if (confirmed) {
      try {
        const { error } = await communityApi.delete(post);
        if (error) {
          throw error;
        }
        alert("게시글이 삭제 되었습니다.");
        router.push("/community/anabada");
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <main className="w-[320px]  md:w-[1200px] mx-auto ">
      <Link href="/community/anabada">
        <h3 className="font-[Wanted Sans] text-base font-semibold mt-4">
          {"< 아나바다 시장 홈 "}
        </h3>
      </Link>
      <div className="mb-4 w-[320px] md:w-[1200px] h-px bg-[#D5D7DD] mt-4"></div>
      <article className="flex flex-col md:flex-row w-[360px] mx-auto md:w-[1200px]">
        {images.length > 0 ? (
          <div className="md:w-[585px] md:h-[585px] w-[320px]h-[320px]">
            <Image
              src={images[0]}
              alt="게시글 이미지"
              width={585}
              height={585}
              priority
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          // 이미지가 없으면 회색 배경을 사용
          <div
            className="bg-gray-300  md:h-[585px]  w-[320px] md:w-[585px] flex items-center justify-center"
            style={{ backgroundColor: "#D5D7DD" }}
          >
            <p className="text-gray-500">등록된 이미지가 없습니다</p>
          </div>
        )}

        <div className="flex flex-col md:ml-8 w-[320px] md:w-[585px] gap-3 mt-4">
          <label className="text-[22px] mb-2 text-[#000301]">
            {post.post_title}
          </label>
          <label className="text-[38px] font-bold">{post.price}원</label>
          <div className="flex text-base text-gray-500 tracking-tight">
            <label>{post.user_info?.user_nickname}</label>
            <time>{new Date(post.created_at).toLocaleDateString()}</time>
            <div className="ml-2">· ♡ {post.like || 0}</div>
            <div className="ml-2">· 댓글 {post.comment || 0}</div>
          </div>
          <div className="mb-4 mt-4 w-[585px] h-px bg-[#D5D7DD]"></div>
          <div className="w-[585px] flex flex-col h-full">
            <p className="text-[14px] text-[#0D9C36] font-semibold mb-4">
              상품정보
            </p>
            <p className="text-[14px] font-normal mb-5">{post.post_content}</p>
            <label className="text-[#0D9C36] mb-4 ">거래 희망 지역</label>
            <label className="md:mt-4 mb-2 inline-block rounded-[32px] border w-[100px] border-[#D5D7DD] p-2">
              {post.location}
            </label>

            <button
              onClick={() => {
                alert("업데이트 예정입니다.");
              }}
              className="bg-[#0D9C36] text-white font-normal rounded-[40px] mt-auto flex justify-center items-center gap-[10px] md:w-[380px] md:h-[52px] md:p-[24px] md:px-[16px] w-[256px] h-[46px]"
            >
              채팅하기
            </button>
            {/* <button>거래 완료</button> */}
          </div>
        </div>
      </article>
      <div className="mb-4 w-[1200px] h-px bg-[#D5D7DD] mt-4"></div>
      <div>
        {canEdit && (
          <div>
            <button onClick={handleEditClick} className="mt-4 border-none mr-2">
              수정하기
            </button>

            <button
              onClick={() => handleDeletePost(post)}
              className="  mt-4  border-none"
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
      <Modal />
    </main>
  );
};

export default Page;

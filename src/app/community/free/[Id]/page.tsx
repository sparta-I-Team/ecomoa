"use client";
import { useEffect, useState } from "react"; // MouseEvent 임포트
import Image from "next/image";
import { communityApi } from "@/api/communityApi";
import { Post } from "@/types/community";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userStore } from "@/zustand/userStore";
import { useModalStore } from "@/zustand/modalStore";
import { Modal } from "@/components/shared/Modal";
import EditPostModal from "../../components/EditPostModal";

type Props = {
  params: {
    Id: string;
  };
};

const PostDetailPage = ({ params }: Props) => {
  const [post, setPost] = useState<Post | null>(null); // post는 초기에는 null
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { Id } = params;
  const router = useRouter();
  const { user } = userStore();
  const { openModal, closeModal } = useModalStore();

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

  const canEdit = user.isAuthenticated && post.user_id === user.id;

  const handleEditClick = () => {
    if (post) {
      openModal({
        type: "custom",
        content: (
          <EditPostModal
            type="free"
            post={post}
            onClose={closeModal}
            onSave={(updatedPost) => {
              handleSavePost(updatedPost); // onSave 수정
              closeModal();
            }}
          />
        )
      });
    }
  };

  // 수정된 게시글 저장 처리
  const handleSavePost = async (
    editedPost: Post | null // MouseEvent 제거, 이제 클릭 이벤트는 EditPostModal에서 처리
  ) => {
    if (!editedPost) return; // editedPost가 null인 경우 처리

    try {
      const { error } = await communityApi.update(editedPost);
      if (error) {
        throw error;
      }
      setPost(editedPost); // 수정된 게시글 상태 업데이트
      console.log("게시글 수정 성공:", editedPost);
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleDeletePost = async (post: Post) => {
    const confirmed = window.confirm("정말 삭제 하시겠습니까?");
    if (confirmed) {
      try {
        const { error } = await communityApi.delete(post);
        if (error) {
          throw error;
        }
        alert("게시글이 삭제되었습니다.");
        router.push("/community/free");
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="p-6 mt-6 mx-auto w-[1200px]">
      <Link href={"/community/free"} className="mb-4 mt-4">
        {"< 자유게시판 "}
      </Link>
      <div className="mb-4 w-[1200px] h-px bg-[#D5D7DD] mt-4"></div>
      <article>
        <label className="text-2xl font-semibold">{post.post_title}</label>
        <div className="flex mt-4 mb-2 text-sm text-gray-600">
          <label className="mr-4">{post.user_info.user_nickname}</label>
          <label>{new Date(post.created_at).toLocaleDateString()}</label>
          <div className="flex space-x-4 text-gray-600">
            <label>♡ {post.like}</label>
          </div>
        </div>
        <p className="mt-4 leading-normal">{post.post_content}</p>

        {post.post_img &&
        Array.isArray(post.post_img) &&
        post.post_img.length > 0 ? (
          <div>
            <div className="flex mt-6 gap-4">
              {post.post_img.map((img, index) => (
                <div key={index} className="max-w-[168px] max-h-[168px]">
                  <Image
                    src={img}
                    alt={`게시글 이미지 ${index + 1}`}
                    width={168}
                    height={168}
                    className="w-full h-full object-cover p-2 rounded-[12px]"
                  />
                </div>
              ))}
            </div>
            <div className="relative flex justify-between mt-10">
              <input
                type="text"
                placeholder="댓글을 입력해주세요"
                className="rounded-[16px] bg-[#CBF5CB] w-[1200px] h-[70px] leading-[40px] px-4 border-none text-[#A1A7B4]"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#0D9C36] border-none rounded-[12px] text-white px-6 py-2 font-wanted-sans text-[16px] font-medium leading-[24px] tracking-[-0.16px]"
              >
                댓글 등록
              </button>
            </div>
          </div>
        ) : (
          post.post_img &&
          typeof post.post_img === "string" &&
          post.post_img !== "" && (
            <div className="max-w-[168px]">
              <Image
                src={post.post_img}
                alt="게시글 이미지"
                width={168}
                height={168}
                className="w-full h-full object-cover"
              />
            </div>
          )
        )}
      </article>
      <div>
        {canEdit && (
          <div>
            <button onClick={handleEditClick} className="  mt-4 border-none ">
              수정하기
            </button>
            <button
              onClick={() => handleDeletePost(post)}
              className="mt-4  border-none"
            >
              삭제하기
            </button>
          </div>
        )}
      </div>
      <Modal />
    </div>
  );
};

export default PostDetailPage;

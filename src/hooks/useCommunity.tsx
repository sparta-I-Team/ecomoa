import { communityApi } from "@/api/communityApi";
import { getUserInfo } from "@/api/user-action";
import { UserInfo } from "@/types/userInfoType";
import { createClient } from "@/utlis/supabase/client";
import { useModalStore } from "@/zustand/modalStore";
import { userStore } from "@/zustand/userStore";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL과 ANON KEY는 .env.local에 정의되어야 합니다.");
}

const supabase = createClient();

export const useCommunity = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    Array(3).fill("")
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [location, setLocation] = useState(""); // 지역명 상태 추가
  const [price, setPrice] = useState(""); // 가격 상태 추가

  const { user } = userStore();
  const { openModal, closeModal } = useModalStore();
  useEffect(() => {
    const fetch = async () => {
      const res = await getUserInfo(user.id);
      setUserInfo(res);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      const newPreviews = [...imagePreviews];
      newPreviews[index] = URL.createObjectURL(selectedImage);
      setImagePreviews(newPreviews);

      const newImages = [...images];
      newImages[index] = selectedImage;
      setImages(newImages);
    }
  };

  const handleImageClick = (index: number) => {
    fileInputRef.current?.setAttribute("data-index", index.toString());
    fileInputRef.current?.click();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImages(Array(3).fill(null));
    setImagePreviews(Array(3).fill(""));
    setUploadedImageUrls([]);
    setErrorMessage("");
    setPrice("");
    setLocation("");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    type: string
  ) => {
    event.preventDefault();
    if (!user) {
      setErrorMessage("사용자가 인증되지 않았습니다.");
      return;
    }

    const uploadedUrls: string[] = [];

    for (const image of images) {
      if (image) {
        const sanitizedFileName = image.name
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9._-]/g, "");

        const uniqueFileName = `public/${Date.now()}_${sanitizedFileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("posts")
          .upload(uniqueFileName, image);

        if (uploadError) {
          console.error("업로드 실패:", uploadError.message);
          setErrorMessage("이미지 업로드에 실패했습니다.");
          return;
        }

        const imageUrl = `https://${
          supabaseUrl.split("/")[2]
        }/storage/v1/object/public/posts/${uploadData.path}`;
        uploadedUrls.push(imageUrl);
      }
    }
    //imageUpload 할 때 아래처럼 해야함
    const formattedUrls = `{${uploadedUrls
      .map((url) => `"${url}"`)
      .join(",")}}`;
    //imageUpload 할 때 아래처럼 해야함
    //글 작성이 완료되면 커뮤니티 메인페이지로 라우팅처리 (useRouter 사용하기)
    try {
      await communityApi.create({
        user_id: user.id,
        title,
        content,
        formattedUrls,
        price,
        location,
        type
      });
      openModal({
        type: "custom",
        content: (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative w-[585px] h-[600px]">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 border-none text-3xl"
            >
              &times; {/* X 아이콘 */}
            </button>
            <div className="p-12">
              <h4 className="font-semibold mb-4 text-2xl">
                게시글을 업로드 했어요
              </h4>
              {uploadedUrls[0] ? (
                <Image
                  src={uploadedUrls[0]}
                  alt="등록한 이미지"
                  width={300}
                  height={260}
                  className="mb-4 max-w-full rounded"
                />
              ) : (
                <div className="text-gray-500 ">등록된 이미지가 없습니다.</div>
              )}
              <h4 className=" py-2 px-3">위치</h4>
              <h3>{"마이페이지 > 나의 게시글 > 아나바다 시장 "} </h3>
              <Link
                href="/community/anabada"
                className="mt-4 p-2 bg-black text-white rounded "
              >
                업로드한 게시글 보러가기
              </Link>
            </div>
          </div>
        )
      });
      resetForm();
    } catch (error) {
      console.error("게시글 작성 에러", error);
    }
  };

  const handleCloseModal = () => {
    closeModal();
    setUploadedImageUrls([]);
  };

  return {
    setTitle,
    userInfo,
    errorMessage,
    handleSubmit,
    title,
    content,
    fileInputRef,
    handleImageClick,
    imagePreviews,
    uploadedImageUrls,
    setContent,
    handleImageChange,
    location,
    setLocation,
    price,
    setPrice
  };
};

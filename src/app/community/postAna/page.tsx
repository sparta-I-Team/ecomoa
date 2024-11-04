"use client";
import React, { useState, useEffect, useRef } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utlis/supabase/client";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL과 ANON KEY는 .env.local에 정의되어야 합니다.");
}

const supabase = createClient();

const PostFree = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userNickname, setUserNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    Array(3).fill("")
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [location, setLocation] = useState(""); // 지역명 상태 추가
  const [price, setPrice] = useState(""); // 가격 상태 추가

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();
      if (error) {
        console.error("사용자 정보 가져오기 오류:", error.message);
      } else {
        setUser(user);
        if (user) {
          const { data, error } = await supabase
            .from("user_info")
            .select("user_nickname")
            .eq("user_id", user.id)
            .single();
          if (data) {
            setUserNickname(data.user_nickname);
          } else {
            console.error("닉네임을 가져오는 데 실패했습니다:", error.message);
          }
        }
      }
    };

    fetchUser();
  }, []);

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
    setLocation(""); // 지역명 초기화
    setPrice(""); // 가격 초기화
    setImages(Array(3).fill(null));
    setImagePreviews(Array(3).fill(""));
    setUploadedImageUrls([]);
    setErrorMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const formattedUrls = `{${uploadedUrls
      .map((url) => `"${url}"`)
      .join(",")}}`;

    // anabada 테이블에 데이터 삽입
    const { error } = await supabase.from("anabada").insert([
      {
        user_id: user.id,
        post_title: title,
        post_content: content,
        created_at: new Date().toISOString(),
        post_img: formattedUrls,
        local: location, // 지역명 추가
        price: price // 가격 추가
      }
    ]);

    if (error) {
      console.error("게시글 생성 오류:", error.message);
      setErrorMessage("게시글 등록에 실패했습니다.");
    } else {
      resetForm();
      setIsModalVisible(true);
      setUploadedImageUrls(uploadedUrls);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setUploadedImageUrls([]);
  };

  return (
    <div>
      <Link href="/community/anabada">
        <h3 className="text-lg font-bold mb-4">{"< 아나바다 시장 홈 "} </h3>
      </Link>
      <div className="mb-4 w-[1200px] h-px bg-[#D5D7DD]"></div>
      {userNickname && (
        <div className="flex items-center mb-4">
          <label className="font-bold">상품 등록</label>
          <time className="ml-4">{new Date().toLocaleDateString("ko-KR")}</time>
        </div>
      )}
      {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h4 className="font-semibold mb-4">상품명</h4>
        <input
          type="text"
          placeholder="상품명을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <h4 className="font-semibold mb-4">가격</h4>
        <input
          type="text"
          placeholder=" ₩ 가격을 입력해주세요"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <h4 className="font-semibold mb-4">상품 정보</h4>
        <textarea
          placeholder={`상품 정보를 입력해주세요 \n - 저작권 침해, 음란, 청소년 유해물, 기타 위법자료 등을 게시할 경우 경고 없이 삭제됩니다`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 rounded resize-none"
        />
        <h4 className="font-semibold mb-4">사진</h4>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const index = parseInt(
              fileInputRef.current?.getAttribute("data-index") || "0"
            );
            handleImageChange(e, index);
          }}
          ref={fileInputRef}
          className="hidden"
        />
        <div className="flex gap-2 mb-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className="w-[160px] h-[160px] bg-[#EDEEF0] flex items-center justify-center border border-gray-300 rounded cursor-pointer"
            >
              {imagePreviews[index] ? (
                <Image
                  src={imagePreviews[index]}
                  alt={`Preview ${index + 1}`}
                  width={160}
                  height={160}
                  className="object-cover rounded"
                />
              ) : (
                <span className="text-gray-500">이미지 선택</span>
              )}
            </div>
          ))}
        </div>
        <h4 className="font-semibold mb-4">거래 희망 지역</h4>
        <input
          type="text"
          placeholder=" oo동"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-[832px] h-[66px] mb-4"
        />
        <button
          type="submit"
          className="p-2 rounded w-[380px] h-[52px] bg-black text-white"
        >
          게시글 등록
        </button>
      </form>

      {isModalVisible && (
        <Modal imageUrl={uploadedImageUrls[0]} onClose={closeModal} />
      )}
    </div>
  );
};

interface ModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center relative w-[585px] h-[600px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 border-none text-3xl"
        >
          &times; {/* X 아이콘 */}
        </button>
        <div className="p-12">
          <h4 className="font-semibold mb-4 text-2xl">
            게시글을 업로드 했어요
          </h4>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="등록한 이미지"
              width={300}
              height={260}
              className="mb-4 max-w-full rounded"
            />
          ) : (
            <div className="text-gray-500 ">등록된 이미지가 없습니다.</div>
          )}
          <h4 className=" py-2 px-3">위치</h4>
          <h3>{"마이페이지 > 나의 게시글 > 자유게시판 "} </h3>
          <Link
            href="/community/anabada"
            className="mt-4 p-2 bg-black text-white rounded "
          >
            업로드한 게시글 보러가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostFree;

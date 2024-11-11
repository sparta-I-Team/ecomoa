import { useCommunity } from "@/hooks/useCommunity";
import Image from "next/image";
import React from "react";

interface Props {
  type: string;
}

const PostForm = ({ type = "free" }: Props) => {
  const {
    location,
    setLocation,
    setTitle,
    price,
    setPrice,
    handleSubmit,
    title,
    content,
    fileInputRef,
    handleImageClick,
    imagePreviews,
    setContent,
    handleImageChange
  } = useCommunity();

  return (
    <div>
      {type === "free" ? (
        <form onSubmit={(e) => handleSubmit(e, type)} className="flex flex-col">
          <h4 className="font-semibold mb-4">제목</h4>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300 rounded-[12px]"
          />
          <h4 className="font-semibold mb-4">내용</h4>
          <textarea
            placeholder={`내용을 입력해주세요 \n - 저작권 침해, 음란, 청소년 유해물, 기타 위법자료 등을 게시할 경우 경고 없이 삭제됩니다`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300  rounded-[12px] resize-none"
          />
          <h4 className="font-semibold mb-4">사진(최대 3개 선택)</h4>
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
                  <span className="text-gray-500">+</span>
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="p-2 rounded-[40px] w-[380px] h-[52px] bg-[#DCECDC] text-[#6E7481] border-none"
          >
            게시글 등록
          </button>
        </form>
      ) : (
        <form onSubmit={(e) => handleSubmit(e, type)} className="flex flex-col">
          <h4 className="font-semibold mb-4">상품명</h4>
          <input
            type="text"
            placeholder="상품명을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300 rounded-[12px]"
          />
          <h4 className="font-semibold mb-4">가격</h4>
          <input
            type="text"
            placeholder=" ₩ 가격을 입력해주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300 rounded-[12px]"
          />
          <h4 className="font-semibold mb-4">상품 정보</h4>
          <textarea
            placeholder={`상품 정보를 입력해주세요 \n - 저작권 침해, 음란, 청소년 유해물, 기타 위법자료 등을 게시할 경우 경고 없이 삭제됩니다`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300 rounded-[12px] resize-none"
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
                className="w-[160px] h-[160px] bg-[#EDEEF0] flex items-center justify-center border border-gray-300 rounded-[12px] cursor-pointer"
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
                  <span className="text-gray-500">+</span>
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
            className="w-[832px] h-[66px] mb-4 rounded-[12px]"
          />
          <button
            type="submit"
            className="p-2 text-[#6E7481] w-[380px] h-[52px] bg-[#DCECDC] rounded-[40px] border-none"
          >
            게시글 등록
          </button>
        </form>
      )}
    </div>
  );
};

export default PostForm;

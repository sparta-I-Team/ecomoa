import { Modal } from "@/components/shared/Modal";
import { useCommunity } from "@/hooks/useCommunity";
import Image from "next/image";
import React, { useState } from "react";

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

  const [priceError, setPriceError] = useState<string>(""); // 가격 오류 메시지 상태

  // 가격 입력 처리
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 입력되도록 처리 (정규식 사용)
    if (/^\d+$/.test(value) || value === "") {
      setPrice(value ? Number(value) : 0); // 가격을 숫자로 저장
      setPriceError(""); // 오류 메시지 초기화
    } else {
      setPriceError("가격은 숫자만 입력 가능합니다."); // 오류 메시지 설정
    }
  };

  return (
    <div>
      {type === "free" ? (
        <form onSubmit={(e) => handleSubmit(e, type)} className="flex flex-col">
          <h4 className="font-semibold mb-4 mt-2">제목</h4>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300 rounded-[12px] w-[320px] h-[62px] md:w-[1200px] md:h-[62px]"
          />
          <h4 className="font-semibold mb-4">내용</h4>
          <textarea
            placeholder={`내용을 입력해주세요 \n - 저작권 침해, 음란, 청소년 유해물, 기타 위법자료 등을 게시할 경우 경고 없이 삭제됩니다`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300  rounded-[12px] resize-none leading-tight  w-[320px] h-[62px] md:w-[1200px] md:h-[62px] overflow-y-hidden text-sm md:text-base"
          />
          <h4 className="font-semibold mb-4">사진 선택</h4>
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
            {Array.from({ length: 1 }).map((_, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                className="w-[160px] h-[160px] bg-[#EDEEF0] flex items-center justify-center border border-gray-300 rounded cursor-pointer"
              >
                {imagePreviews[index] ? (
                  <div className=" w-[160px] h-[160px]">
                    <Image
                      src={imagePreviews[index]}
                      alt={`Preview ${index + 1}`}
                      width={160}
                      height={160}
                      className="object-fill rounded w-full h-full"
                    />
                  </div>
                ) : (
                  <span className="text-gray-500">+</span>
                )}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="p-2 rounded-[40px] md:w-[380px] md:h-[52px] bg-[#DCECDC] border-none  hover:bg-[#0D9C36] text-white w-[320px] h-[60px]"
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
            className="mb-4 p-2 border border-gray-300 rounded-[12px]  w-[320px] h-[62px] md:w-[1200px] md:h-[62px]"
          />
          <h4 className="font-semibold mb-4">가격</h4>
          <input
            type="text"
            placeholder=" ₩ 가격을 입력해주세요"
            value={price}
            onChange={handlePriceChange} // 가격 입력 처리
            required
            className="mb-4 p-2 border border-gray-300 rounded-[12px]  w-[320px] h-[62px] md:w-[1200px] md:h-[62px]"
          />
          {/* 가격 오류 메시지 */}
          {priceError && <p className="text-red-500 mb-4">{priceError}</p>}
          <h4 className="font-semibold mb-4">상품 정보</h4>
          <textarea
            placeholder={`상품 정보를 입력해주세요 \n - 저작권 침해, 음란, 청소년 유해물, 기타 위법자료 등을 게시할 경우 경고 없이 삭제됩니다`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mb-4 p-2 border border-gray-300  rounded-[12px] resize-none leading-tight  w-[320px] h-[62px] md:w-[1200px] md:h-[62px] overflow-y-hidden text-sm md:text-base"
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
            {Array.from({ length: 1 }).map((_, index) => (
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
                    className="object-cover w-full h-full"
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
            placeholder=" OO동"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="md:w-[832px] md:h-[66px] mb-4 rounded-[12px] w-[320px] h-[62px]"
          />
          <button
            type="submit"
            className="p-2 rounded-[40px] md:w-[380px] md:h-[52px] bg-[#DCECDC] border-none  hover:bg-[#0D9C36] text-white w-[320px] h-[60px]"
          >
            게시글 등록
          </button>
        </form>
      )}
      <Modal />
    </div>
  );
};

export default PostForm;

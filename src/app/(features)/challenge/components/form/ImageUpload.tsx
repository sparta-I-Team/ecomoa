import { ChallengeFormInputs } from "@/types/challengesType";
import React, { useRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<ChallengeFormInputs>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<ChallengeFormInputs>;
  previews: string[];
  onDelete: (index: number) => void;
}

const ImageUpload = ({
  register,
  onChange,
  errors,
  previews,
  onDelete
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // 5개의 미리보기 영역 배열
  const previewPlaceholders = Array(5).fill(null);

  const handlePreviewClick = (index: number) => {
    if (!previews[index]) {
      fileInputRef.current?.click();
    }
  };

  const validateImage = (file: File) => {
    // 이미지 형식
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert("JPG, PNG, GIF, WEBP 형식의 이미지만 업로드 가능합니다.");
      return false;
    }

    if (file.size > maxSize) {
      alert("이미지 크기는 5MB 이하여야 합니다.");
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImage(file)) {
      e.target.value = "";
      return;
    }

    onChange(e);
  };

  const { ref, ...rest } = register("images", {
    validate: {
      fileType: (fileList: FileList) => {
        if (!fileList?.[0]) return true;
        return validateImage(fileList[0]) || "올바른 이미지 형식이 아닙니다.";
      }
    }
  });

  return (
    <div className="mt-6">
      <input
        {...rest}
        ref={(e) => {
          ref(e); // react-hook-form의++- ref
          if (e) fileInputRef.current = e; // 내부 사용 ref
        }}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleChange}
        className="hidden"
      />

      {errors.images && (
        <p className="text-red-500 text-sm">{errors.images.message}</p>
      )}

      <div className="grid grid-cols-5 gap-4">
        {previewPlaceholders.map((_, index) => (
          <div
            key={index}
            onClick={() => handlePreviewClick(index)}
            className={`relative aspect-square rounded-lg overflow-hidden bg-gray-300
              cursor-pointer hover:bg-gray-500 transition-colors`}
          >
            {previews[index] ? (
              <>
                <img
                  src={previews[index]}
                  alt={`미리보기 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                  }}
                  className="absolute top-2 right-2 px-2  rounded-full bg-gray-400"
                >
                  X
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <span className="text-sm mt-2">이미지 추가</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-gray-500 text-sm mt-2">
        * JPG, PNG, GIF, WEBP 형식의 5MB 이하 이미지만 업로드 가능합니다.
      </p>
    </div>
  );
};

export default ImageUpload;

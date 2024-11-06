import { ChallengeFormInputs } from "@/types/challengesType";
import { Plus } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<ChallengeFormInputs>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FieldErrors<ChallengeFormInputs>;
  previews: string[];
  onDelete: (index: number) => void;
  maxImages?: number;
}

const ImageUpload = ({
  register,
  onChange,
  errors,
  previews,
  onDelete,
  maxImages = 6
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewPlaceholders = Array(maxImages).fill(null);

  const registerProps = register("images");

  const handlePreviewClick = (index: number) => {
    if (!previews[index]) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="mt-6">
      <input
        {...registerProps}
        ref={(e) => {
          registerProps.ref(e);
          if (e) fileInputRef.current = e;
        }}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={(e) => {
          registerProps.onChange(e);
          onChange(e);
        }}
        className="hidden"
      />

      {errors.images && (
        <p className="text-red-500 text-sm">{errors.images.message}</p>
      )}

      <h1 className="font-bold text-[14px] mb-2">사진</h1>
      <div className="grid grid-cols-6 gap-[48px]">
        {previewPlaceholders.map((_, index) => (
          <div
            key={index}
            onClick={() => handlePreviewClick(index)}
            className="relative h-[160px]  rounded-lg overflow-hidden bg-[#F5F5F5]
              cursor-pointer hover:bg-gray-200 transition-colors"
          >
            {previews[index] ? (
              <>
                <Image
                  src={previews[index]}
                  alt={`미리보기 ${index + 1}`}
                  fill
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(index);
                  }}
                  className="absolute top-2 right-2 px-2 rounded-full bg-gray-400/80 
                    hover:bg-gray-500/80 text-white transition-colors"
                >
                  ×
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <div className="bg-white rounded-full w-[30px] h-[30px] p-2">
                  <Plus className="w-full h-full" />
                </div>
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

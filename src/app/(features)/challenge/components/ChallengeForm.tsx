import Select from "./form/Select";
import ImageUpload from "./form/ImageUpload";
import BlackAutoWidthButton from "./ui/BlackAutoWidthButton";
import { Modal } from "@/components/shared/Modal";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useChallengeForm } from "@/hooks/useChallengeForm";
import { ChevronLeft } from "lucide-react";

export const ChallengeForm = () => {
  const {
    selectedOptions,
    register,
    handleSubmit,
    errors,
    handleOptionToggle,
    onSubmit,
    handleOpenGoBackModal,
    challengeMutation
  } = useChallengeForm();

  const { previews, imageFiles, handleImageChange, handleDeleteImage } =
    useImageUpload(6);

  return (
    <div className="mx-auto">
      <button
        onClick={handleOpenGoBackModal}
        className="flex flex-row items-center text-[16px] font-bold mb-4 text-[#525660] hover:text-gray-400 transition-colors border-none"
      >
        <ChevronLeft className="w-4 h-4 text-[#525660]" /> <p>챌린지 홈</p>
      </button>
      <hr />
      <form
        onSubmit={handleSubmit((data) => onSubmit(data, imageFiles))}
        className="rounded-lg mt-9"
      >
        <div className="mb-[40px]">
          <p className="text-gray-600 font-semibold text-[24px]">
            {new Date().toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long"
            })}{" "}
            데일리 챌린지
          </p>
        </div>

        <Select
          selectedOptions={selectedOptions}
          onToggle={handleOptionToggle}
          error={errors.selectedOptions}
        />

        <ImageUpload
          register={register}
          onChange={handleImageChange}
          errors={errors}
          previews={previews}
          onDelete={handleDeleteImage}
        />

        <div className="mt-6">
          <h1 className="font-bold text-[14px] mb-2">챌린지 내용</h1>
          <textarea
            {...register("content", {
              required: "챌린지 내용을 입력해주세요."
            })}
            className="w-full p-4 border rounded-lg min-h-[80px] bg-[#F5F5F5] border-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-500"
            placeholder="첼린지 내용을 입력해주세요"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <BlackAutoWidthButton
          className="px-4 py-3 bg-[#0D9C36]"
          text={challengeMutation.isPending ? "제출 중..." : "인증 완료"}
          type="submit"
          onClick={() => {}}
          disabled={challengeMutation.isPending}
        />
      </form>
      <Modal />
    </div>
  );
};

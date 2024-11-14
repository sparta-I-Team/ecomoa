import Select from "./form/Select";
import ImageUpload from "./form/ImageUpload";
import BlackAutoWidthButton from "./ui/BlackAutoWidthButton";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useChallengeForm } from "@/hooks/useChallengeForm";
import { ChevronLeft } from "lucide-react";
import { ChallengeData } from "@/types/challengesType";
import { useModalStore } from "@/zustand/modalStore";

interface Props {
  initialData?: ChallengeData;
}

const ChallengeForm = ({ initialData }: Props) => {
  const {
    selectedOptions,
    register,
    handleSubmit,
    errors,
    handleOptionToggle,
    onSubmit,
    handleOpenGoBackModal,
    challengeMutation,
    updateMutation,
    isEditMode,
    totalPoint
  } = useChallengeForm({ initialData });

  const {
    previews,
    imageFiles,
    existingImages,
    deletedImages,
    handleImageChange,
    handleDeleteImage,
    handleDeleteExistingImage
  } = useImageUpload(6, initialData?.image_urls);

  const { closeModal } = useModalStore();

  const mutation = isEditMode ? updateMutation : challengeMutation;

  return (
    <div>
      {isEditMode ? (
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="p-2 border-none hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-600"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleOpenGoBackModal}
            className="flex flex-row items-center text-[16px] font-bold mb-4 text-[#525660] hover:text-gray-400 transition-colors border-none"
          >
            <ChevronLeft className="w-4 h-4 text-[#525660]" /> <p>챌린지 홈</p>
          </button>
          <hr />
        </>
      )}
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(data, imageFiles, isEditMode ? deletedImages : undefined)
        )}
        className={`rounded-lg 
          ${isEditMode ? "" : "mt-9"}
          `}
      >
        <div className="flex flex-row items-center gap-[20px] mb-[40px]">
          <label className="flex p-[12px_16px] justify-center items-center gap-2.5 rounded-[4px] bg-[#0D9C36] text-white">
            {totalPoint}P
          </label>
          <p className="text-gray-600 font-semibold text-[24px]">
            {(isEditMode
              ? new Date(initialData!.created_at)
              : new Date()
            ).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long"
            })}
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
          existingImages={existingImages}
          onDeleteExisting={handleDeleteExistingImage}
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
          text={
            mutation.isPending
              ? isEditMode
                ? "수정 중..."
                : "제출 중..."
              : isEditMode
              ? "수정 완료"
              : "인증 완료"
          }
          type="submit"
          onClick={() => {}}
          disabled={mutation.isPending}
        />
      </form>
    </div>
  );
};

export default ChallengeForm;

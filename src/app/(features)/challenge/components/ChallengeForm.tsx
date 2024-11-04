import Select from "./form/Select";
import ImageUpload from "./form/ImageUpload";
import BlackAutoWidthButton from "./ui/BlackAutoWidthButton";
import { Modal } from "@/components/shared/Modal";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useChallengeForm } from "@/hooks/useChallengeForm";

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
        className="text-xl font-bold mb-4 hover:text-gray-400 transition-colors border-none"
      >
        챌린지 홈
      </button>
      <hr />
      <form
        onSubmit={handleSubmit((data) => onSubmit(data, imageFiles))}
        className="rounded-lg py-2"
      >
        <div className="mb-6">
          <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
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
          <textarea
            {...register("content", { required: "내용을 입력해주세요" })}
            className="w-full p-4 border rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="내용을 입력해주세요"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <BlackAutoWidthButton
          className="px-4 py-3"
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

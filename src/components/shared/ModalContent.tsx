import { useModalStore } from "@/zustand/modalStore";

export const ModalContent = () => {
  const {
    content,
    type,
    onConfirm,
    onCancel,
    closeModal,
    buttonText,
    className
  } = useModalStore();

  switch (type) {
    case "alert":
      return (
        <div className="w-[320px] p-6">
          <div className="mb-6 text-center">{content}</div>
          <button
            className="w-full h-[48px] bg-black text-white rounded-lg"
            onClick={closeModal}
          >
            {buttonText?.confirm || "확인"}
          </button>
        </div>
      );

    case "confirm":
      return (
        <div className="w-[320px] p-6">
          <div className="mb-6 text-center">{content}</div>
          <div className="flex gap-4">
            <button
              className="flex-1 h-[48px] bg-gray-100 rounded-lg"
              onClick={() => {
                onCancel?.();
                closeModal();
              }}
            >
              {buttonText?.cancel || "취소"}
            </button>
            <button
              className="flex-1 h-[48px] bg-black text-white rounded-lg"
              onClick={() => {
                onConfirm?.();
                closeModal();
              }}
            >
              {buttonText?.confirm || "확인"}
            </button>
          </div>
        </div>
      );

    case "custom":
      return (
        <div
          className={`flex flex-col justify-center overflow-auto max-h-[90vh] ${
            className || " min-h-[360px]"
          }`}
        >
          {content}
        </div>
      );

    default:
      return content;
  }
};

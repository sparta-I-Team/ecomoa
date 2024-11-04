// components/ui/BlackAutoWidthButton.tsx
interface Props {
  className: string;
  text: string;
  type: "button" | "submit";
  onClick: () => void;
  disabled?: boolean;
}

const BlackAutoWidthButton = ({
  className,
  text,
  type = "button",
  onClick,
  disabled
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`mt-6 w-full bg-black text-white transition-colors ${className} bg-green-500 rounded-full
        ${disabled ? "bg-green-400 cursor-not-allowed" : "hover:bg-green-600"}`}
    >
      {text}
    </button>
  );
};

export default BlackAutoWidthButton;

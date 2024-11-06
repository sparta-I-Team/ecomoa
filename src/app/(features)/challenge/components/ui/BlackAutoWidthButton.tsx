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
      className={`mt-10 py-6 w-full text-white transition-colors ${className} rounded-full
        ${disabled ? "bg-green-400 cursor-not-allowed" : ""}`}
    >
      {text}
    </button>
  );
};

export default BlackAutoWidthButton;

// components/ui/BlackAutoWidthButton.tsx
interface Props {
  text: string;
  disabled?: boolean;
}

const BlackAutoWidthButton = ({ text, disabled }: Props) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`mt-6 w-full px-4 py-3 bg-black text-white rounded-lg transition-colors
        ${disabled ? "bg-gray-500 cursor-not-allowed" : "hover:bg-gray-800"}`}
    >
      {text}
    </button>
  );
};

export default BlackAutoWidthButton;

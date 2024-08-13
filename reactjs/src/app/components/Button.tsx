interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}
export function Button({title, ...props}: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full
      bg-orange-400 text-[#232129] h-14 border-0 py-0 px-4 mt-4 rounded-lg font-semibold"
      {...props}
    >
      {title}
    </button>
  )
}
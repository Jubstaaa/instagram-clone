function Button({ type = "button", children, ...props }) {
  return (
    <button
      type={type}
      {...props}
      className="h-[30px] mt-1 w-full flex items-center justify-center gap-x-2 rounded-md bg-brand font-semibold text-sm text-white disabled:opacity-30"
    >
      {children}
    </button>
  );
}

export default Button;

import { useEffect, useRef, useState } from "react";

export default function Input({ label, type = "text", ...props }) {
  const inputRef = useRef();
  const [show, setShow] = useState(false);
  const [inputType, setInputType] = useState(type);
  useEffect(() => {
    if (show) {
      setInputType("text");
      inputRef.current.focus();
    } else if (type === "password") {
      setInputType("password");
    }
  }, [show]);

  return (
    <label className=" relative flex border rounded-sm focus-within:border-gray-400">
      <input
        ref={inputRef}
        type={inputType}
        required={true}
        className="bg-zinc-50  px-2 w-full h-[38px]  outline-none peer valid:pt-[10px] text-xs"
        {...props}
      />
      <small className="absolute top-1/2 left-[9px] text-xs cursor-text pointer-events-none text-gray-500 rounded-sm -translate-y-1/2  transition-all peer-valid:text-[10px] peer-valid:top-2.5   ">
        {label}
      </small>
      {type === "password" && props?.value && (
        <div
          onClick={() => setShow(!show)}
          className=" h-full flex items-center cursor-pointer text-sm font-semibold pr-2 "
        >
          {show ? "Hide" : "Show"}
        </div>
      )}
    </label>
  );
}

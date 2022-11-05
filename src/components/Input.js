import { useField } from "formik";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { useLocation } from "react-router-dom";

export default function Input({ label, type = "text", value, ...props }) {
  const location = useLocation();
  const [field, meta, helpers] = useField(props);
  const inputRef = useRef();
  const [show, setShow] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
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
    <label className=" relative flex border rounded-sm focus-within:border-gray-400 ">
      <input
        ref={inputRef}
        type={inputType}
        className={classNames({
          "bg-zinc-50 px-2 w-full h-[38px] outline-none text-xs": true,
          "pt-[10px]": field.value,
        })}
        value={value}
        {...props}
        {...field}
      />
      <small
        className={classNames({
          "absolute left-[9px] cursor-text pointer-events-none text-gray-500 rounded-sm -translate-y-1/2  transition-all ": true,
          "text-[10px] top-2.5": field.value,
          " text-xs top-1/2": !field.value,
        })}
      >
        {label}
      </small>
      {location.pathname.includes("register") && (
        <div className="relative right-0 top-0 flex items-center justify-end  bg-zinc-50  ">
          {meta.error && field.value ? (
            <div className=" text-[#EE2E3E] top-0 right-0 w-9 h-9  items-center justify-center flex">
              <AiOutlineCloseCircle size={25} />
            </div>
          ) : field.value ? (
            <div className=" text-[#a5a7aa] top-0 right-0 w-9 h-9  items-center justify-center flex">
              <AiOutlineCheckCircle size={25} />
            </div>
          ) : (
            <></>
          )}

          {type === "password" && field.value && (
            <div
              onClick={() => setShow(!show)}
              className=" h-full flex items-center cursor-pointer text-sm font-semibold pr-2 "
            >
              {show ? "Hide" : "Show"}
            </div>
          )}
        </div>
      )}
    </label>
  );
}

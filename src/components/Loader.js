import { FaInstagram } from "react-icons/fa";
function Loader() {
  return (
    <div className="w-full h-full  fixed flex-col top-0 left-0 bg-zinc-50 text-pink-600 flex items-center justify-between text-2xl">
      <div></div>
      <img src="/img/logo.png" alt="" />
      <img className="w-[72px]  pb-8" src="/img/meta.png" alt="" />
    </div>
  );
}

export default Loader;

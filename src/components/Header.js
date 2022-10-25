import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className=" bg-white border-b border-gray-300 ">
      <div className="h-[60px] flex items-center justify-between container mx-auto">
        <Link to="/">
          <img className="h-[29px]" src="/img/instagram.png" alt="" />
        </Link>
      </div>
    </header>
  );
}

export default Header;

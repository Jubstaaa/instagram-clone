import { logout } from "firebaseConfig";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Search from "./Search";
import Icon from "./Icon";
import { useSelector } from "react-redux";
import AddPost from "./AddPost";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className=" bg-white border-b border-gray-300 sticky top-0 z-50 ">
      <div className="h-[60px] flex items-center justify-between container mx-auto">
        <Link to="/">
          <img className="h-[29px]" src="/img/instagram.png" alt="" />
        </Link>
        <Search />
        <div className="flex items-center justify-end space-x-4 relative">
          <Link to="/">
            <Icon name="home" className="h-6 cursor-pointer" size={22} />
          </Link>

          <Icon name="direct" className="cursor-pointer" size={22} />
          <div className="relative ">
            <Icon name="heart" className="cursor-pointer" size={22} />
          </div>
          <Icon
            onClick={() => {
              setModal(true);
            }}
            name="new"
            className="cursor-pointer"
            size={22}
          />
          <Icon name="explore" className="cursor-pointer" size={22} />

          <div
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
            ref={menuRef}
            className="avatar cursor-pointer w-7 h-7 relative"
          >
            <img
              className="rounded-full h-full w-full"
              src={user.photoURL || "/img/no-avatar.jpeg"}
            />
            {openMenu && (
              <div className="absolute right-0 top-9 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1 ">
                  <Link
                    to={`/${user.username}`}
                    className="text-black font-medium block px-4 py-2 text-sm flex items-center justify-start hover:bg-gray-100 hover:text-gray-900"
                  >
                    <CgProfile size={22} className="mr-2" />
                    Profile
                  </Link>
                  <a
                    href="#"
                    className="text-black font-medium block px-4 py-2 text-sm flex items-center justify-start hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Icon name="bookmark" size={22} className="mr-2" />
                    Saved
                  </a>
                  <Link
                    to="/accounts/edit"
                    className="text-black font-medium block px-4 py-2 text-sm flex items-center justify-start hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Icon name="settings" size={22} className="mr-2" />
                    Settings
                  </Link>
                  <a
                    href="#"
                    className="text-black font-medium block px-4 py-2 text-sm flex items-center justify-start hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Icon name="switch" size={22} className="mr-2" />
                    Switch accounts
                  </a>
                </div>
                <div
                  onClick={logout}
                  className="py-1 hover:bg-gray-100 hover:text-gray-900"
                >
                  <a
                    href="#"
                    className="text-black font-medium block px-4 py-2 text-sm"
                  >
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {modal && <AddPost setModal={setModal} user={user} />}
    </header>
  );
}

export default Header;

import Icon from "components/Icon";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
function Sidebar() {
  const location = useLocation();

  return (
    <div
      className={classNames({
        "col-span-4 sm:col-span-1 border-[1px] border-gray-300 ": true,
        "hidden sm:block": location.pathname.split("/").length === 4,
      })}
    >
      <ul className="flex flex-col border-b-2 ">
        <NavLink
          end
          to="./profile"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-l-black font-semibold"
              : "border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder"
          }
        >
          <span className="flex flex-row items-center h-12  text-black">
            <span className="text-base py-2 px-[30px]">Edit Profile</span>
          </span>
        </NavLink>
        <NavLink
          end
          to="./password"
          className={({ isActive }) =>
            isActive
              ? "border-l-2 border-l-black font-semibold"
              : "border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder"
          }
        >
          <span className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">Change password</span>
          </span>
        </NavLink>
        <li className="border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder">
          <a href="#" className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">Apps and websites</span>
          </a>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder">
          <a href="#" className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">
              Email notifications
            </span>
          </a>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder">
          <a href="#" className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">
              Push notifications
            </span>
          </a>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder">
          <a href="#" className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">Manage contacts</span>
          </a>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder">
          <a href="#" className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">
              Privacy and security
            </span>
          </a>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder">
          <a href="#" className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">Ads</span>
          </a>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder">
          <a href="#" className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">Supervision</span>
          </a>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder">
          <a href="#" className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">Login activity</span>
          </a>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder">
          <a href="#" className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">
              Emails from Instagram
            </span>
          </a>
        </li>
        <li className="border-l-2 border-l-transparent hover:bg-zinc-50 hover:border-l-secondaryBorder">
          <a href="#" className="flex flex-row items-center h-12  text-black ">
            <span className="text-base  py-2 px-[30px]">Help</span>
          </a>
        </li>
        <div className="flex">
          <a
            href="#"
            className="text-sm  font-semibold text-brand text-center px-8 py-4 pb-16"
          >
            Switch to professional account
          </a>
        </div>
      </ul>
      <div className="flex flex-col items-start justify-center px-6 py-4">
        <Icon name="meta" size={60} />
        <a
          href="#"
          className="text-base  font-semibold text-brand text-center "
        >
          Accounts center
        </a>
        <p className="text-xs text-gray-500 pt-2">
          Control settings for connected experiences across Instagram, the
          Facebook app and Messenger, including story and post sharing and
          logging in.
        </p>
      </div>
    </div>
  );
}

export default Sidebar;

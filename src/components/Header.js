import { logout, checkUnreadedMessages } from "firebaseConfig";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Search from "./Search";
import Icon from "./Icon";
import { useSelector } from "react-redux";
import AddPost from "./AddPost";
import Notification from "./Notification";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [openMenu, setOpenMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const menuRef = useRef(null);
  const [notificationModal, setNotificationModal] = useState(false);
  const notificationRef = useRef(null);
  const [notifications, setNotifications] = useState(0);
  const [logNotification, setLogNotification] = useState(false);
  const [logs, setLogs] = useState(undefined);

  const checkNotifications = async () => {
    setNotifications(0);
    let final = 0;
    const arr = await checkUnreadedMessages(user);
    arr.map((item) => {
      if (item?.unread === true && item.author !== user.uid) {
        final++;
      }
    });
    setNotifications(final);
  };

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  useEffect(() => {
    setTimeout(() => {
      checkNotifications();
    }, 500);
    setLogs([...user?.notifications]);
  }, [navigate, user]);

  useEffect(() => {
    if (logs?.reverse()[0]?.unread) {
      setLogNotification(true);
    } else {
      setLogNotification(false);
    }
  }, [logs]);

  return (
    <>
      <header className=" bg-white border-b border-gray-300 sticky top-0 z-50 ">
        <div className="h-[60px] flex items-center justify-between container mx-auto relative p-4 space-x-2">
          <Link to="/" className="hidden sm:block">
            <img className="h-[29px]" src="/img/instagram.png" alt="" />
          </Link>
          <Search />
          <div className="flex items-center justify-end space-x-4 relative ">
            <Link to="/">
              <Icon
                name="home"
                className="h-6 cursor-pointer sm:flex hidden"
                size={22}
              />
            </Link>
            <Link to="/direct" className="relative order-3 sm:order-none">
              <Icon name="direct" className="cursor-pointer" size={22} />
              {notifications > 0 && (
                <div className="h-4 w-4 bg-red-500 rounded-full absolute -top-1 -right-1">
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[11px] font-semibold text-white">
                    {notifications}
                  </span>
                </div>
              )}
            </Link>
            <div className="relative order-2 sm:order-none">
              <Icon
                onClick={() => {
                  setNotificationModal(true);
                }}
                name="heart"
                className="cursor-pointer"
                size={22}
              />
              {logNotification && (
                <div className="h-3 w-3 bg-red-500 rounded-full absolute -top-1 -right-1">
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[11px] font-semibold text-white"></span>
                </div>
              )}
            </div>

            <Icon
              onClick={() => {
                setModal(true);
              }}
              name="new"
              className="cursor-pointer order-1 sm:order-none"
              size={22}
            />
            <Icon
              name="explore"
              className="cursor-pointer sm:flex hidden"
              size={22}
            />

            <div
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              ref={menuRef}
              className="avatar cursor-pointer w-7 h-7 relative sm:flex hidden"
            >
              <img
                className="rounded-full h-full w-full object-cover"
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
                    <Link
                      to={`/${user.username}/saved`}
                      className="text-black font-medium block px-4 py-2 text-sm flex items-center justify-start hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Icon name="bookmark" size={22} className="mr-2" />
                      Saved
                    </Link>
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
          {notificationModal && (
            <div
              ref={notificationRef}
              className="bg-white rounded-lg shadow absolute top-[61px] right-0 "
            >
              <ul className=" text-center min-h-[250px] w-[400px] h-[250px] max-h-[350px] overflow-auto relative ">
                {logs
                  ?.sort((a, b) => b.date - a.date)
                  .map((notification, i) => (
                    <Notification
                      key={i}
                      notification={notification}
                      setNotificationModal={setNotificationModal}
                    />
                  ))}
                {/* {user?.notifications?.length === 0 && (
              <NoPeople
                title="Followers"
                desc="You'll see all the people who follow you here."
              />
            )} */}
              </ul>
            </div>
          )}
        </div>
        {modal && <AddPost setModal={setModal} user={user} />}
      </header>
      <div className="bg-zinc-50 py-5 flex w-screen items-center justify-around space-x-4 fixed sm:hidden bottom-0 left-0 z-50 ">
        <Link to="/">
          <Icon name="home" className="h-6 cursor-pointer" size={22} />
        </Link>

        <Icon name="explore" className="cursor-pointer" size={22} />

        <div
          onClick={() => {
            setOpenMenu(!openMenu);
          }}
          ref={menuRef}
          className="avatar cursor-pointer w-7 h-7 relative"
        >
          <img
            className="rounded-full h-full w-full object-cover"
            src={user.photoURL || "/img/no-avatar.jpeg"}
          />
          {openMenu && (
            <div className="absolute bottom-12 -right-12 sm:right-0 sm:top-9 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 ">
                <Link
                  to={`/${user.username}`}
                  className="text-black font-medium block px-4 py-2 text-sm flex items-center justify-start hover:bg-gray-100 hover:text-gray-900"
                >
                  <CgProfile size={22} className="mr-2" />
                  Profile
                </Link>
                <Link
                  to={`/${user.username}/saved`}
                  className="text-black font-medium block px-4 py-2 text-sm flex items-center justify-start hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="bookmark" size={22} className="mr-2" />
                  Saved
                </Link>
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
    </>
  );
}

export default Header;

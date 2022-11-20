import Icon from "./Icon";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import classNames from "classnames";
import { getUsers, sendPost } from "firebaseConfig";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { checkChatExist } from "firebaseConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Search({
  className,
  type = null,
  setMessageModal = null,
  post = null,
  userData = null,
}) {
  const authUser = useSelector((state) => state.auth.user);
  let navigate = useNavigate();
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);
  const filterSearch = () => {
    setFilteredUsers(
      users.filter((el) => {
        if (searchValue.toLowerCase() === "") {
          return null;
        } else {
          return el.username.toLowerCase().includes(searchValue.toLowerCase());
        }
      })
    );
  };
  useEffect(() => {
    filterSearch();
  }, [searchValue]);
  return (
    <div ref={searchRef} className={`"w-[268px] relative group ${className}`}>
      <span
        className={classNames({
          "absolute text-[#8e8e8e] pointer-events-none top-0 left-0 h-9 w-9 flex items-center justify-center": true,
          " hidden ": open,
        })}
      >
        <Icon name="search" />
      </span>
      <input
        ref={searchRef}
        onFocus={() => {
          setOpen(true);
        }}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
        type="text"
        placeholder="Search"
        className={classNames({
          "h-9 w-full rounded bg-[#efefef] pl-9 outline-none text-[#8e8e8e] focus:text-black": true,
          " pl-3 ": open,
        })}
      />
      <button
        onClick={() => {
          setSearchValue("");
          setOpen(false);
        }}
        className={classNames({
          "absolute text-[#c7c7c7] top-0 right-0 w-9 h-9 z-50  items-center justify-center hidden ": true,
          "!flex": open,
        })}
      >
        <AiFillCloseCircle />
      </button>
      {open && (
        <div
          id="dropdown"
          className="w-full h-56 absolute inset-0 top-[36px] z-10 bg-white rounded divide-y divide-gray-100 shadow  overflow-auto "
        >
          <ul className="py-1 text-sm text-black">
            {filteredUsers.map((user) => (
              <li key={user.uid}>
                {type === "message" ? (
                  <Link
                    onClick={async () => {
                      await checkChatExist(authUser, user, navigate);
                      setMessageModal(false);
                    }}
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <div className="flex items-center justify-start space-x-2 ">
                      <img
                        className="h-11 w-11 inline-block rounded-full object-cover "
                        src={user.photoURL || "/img/no-avatar.jpeg"}
                        alt=""
                      />
                      <div className="flex flex-col items-start justify-center">
                        <span className="font-semibold">{user.username}</span>
                        <span className="text-[#8e8e8e]">
                          {user.displayName}
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : type === "direct" ? (
                  <Link
                    onClick={async () => {
                      const conversationId = await checkChatExist(
                        authUser,
                        user
                      );
                      sendPost(
                        authUser,
                        (post = { ...post, username: userData.username }),
                        userData,
                        conversationId
                      );
                      setMessageModal(false);
                    }}
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <div className="flex items-center justify-start space-x-2 ">
                      <img
                        className="h-11 w-11 inline-block rounded-full object-cover "
                        src={user.photoURL || "/img/no-avatar.jpeg"}
                        alt=""
                      />
                      <div className="flex flex-col items-start justify-center">
                        <span className="font-semibold">{user.username}</span>
                        <span className="text-[#8e8e8e]">
                          {user.displayName}
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link
                    onClick={async () => {
                      setOpen(false);
                      setSearchValue("");
                    }}
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    to={`/${user.username}`}
                  >
                    <div className="flex items-center justify-start space-x-2 ">
                      <img
                        className="h-11 w-11 inline-block rounded-full object-cover "
                        src={user.photoURL || "/img/no-avatar.jpeg"}
                        alt=""
                      />
                      <div className="flex flex-col items-start justify-center">
                        <span className="font-semibold">{user.username}</span>
                        <span className="text-[#8e8e8e]">
                          {user.displayName}
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;

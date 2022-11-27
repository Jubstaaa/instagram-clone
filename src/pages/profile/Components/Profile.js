import { useEffect, useState, useRef } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import classNames from "classnames";
import Icon from "components/Icon";
import Loader from "components/Loader";
import ProfileNotFound from "../not-found";
import { getUserInfo, follow, unfollow, checkChatExist } from "firebaseConfig";
import Button from "components/Button";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Following from "./Following";
import Follower from "./Follower";
import NoPeople from "./NoPeople";
import Footer from "components/Footer";

function Profile() {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState(null);
  const { user } = useParams();
  const [unfollowModal, setUnfollowModal] = useState(false);
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);
  const [followersModal, setFollowersModal] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setUnfollowModal(false);
        setFollowingModal(false);
        setFollowersModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    getUserInfo(user)
      .then((res) => {
        setUserData(res);
      })
      .catch((err) => {
        setUserData(false);
      });
  }, [user, authUser]);

  if (userData === null) {
    return <Loader />;
  }
  if (userData === false) {
    return <ProfileNotFound />;
  }

  return (
    userData && (
      <div>
        <Helmet>
          <title>
            {`${userData.displayName} (@${userData.username}) • Instagram photos and
            videos`}
          </title>
        </Helmet>
        <header className="flex items-center justify-start px-24 space-x-24  py-4 pb-10">
          <div className="w-[150px] h-[150px]  relative flex justify-center items-center ">
            <img
              src={userData.photoURL || "/img/no-avatar.jpeg"}
              alt=""
              className="w-full h-full object-cover  rounded-full   "
            />
          </div>
          <div className="flex w-6/12 justify-items-between items-start flex-col space-y-3">
            <div className="flex w-full justify-start items-center space-x-6">
              <h1 className="text-[28px] font-light">{userData.username}</h1>
              <div className="flex justify-center items-center space-x-2">
                {userData.uid === authUser.uid ? (
                  <>
                    <Link
                      to="/accounts/edit"
                      className="text-black border border-[#dbdbdb] font-semibold  px-2 py-1 rounded  text-sm "
                      type="button"
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to="/accounts/edit"
                      className="text-black font-medium block ml-1 text-sm flex items-center justify-start "
                    >
                      <Icon name="settings" size={22} />
                    </Link>
                  </>
                ) : authUser?.following?.find(
                    (el) => el.uid === userData.uid
                  ) ? (
                  <>
                    <a
                      onClick={() => {
                        checkChatExist(authUser, userData, navigate);
                      }}
                      className="text-black border border-[#dbdbdb] font-semibold  px-2 py-1 rounded  text-sm cursor-pointer "
                      type="button"
                    >
                      Message
                    </a>

                    <a
                      onClick={async () => {
                        await setUnfollowModal(true);
                      }}
                      className="text-black border border-[#dbdbdb] font-semibold  px-6 py-1 rounded  text-sm cursor-pointer relative"
                      type="button"
                    >
                      <Icon name="follow" size={20} />
                      {loading && (
                        <img
                          className="h-6 w-6 m-auto absolute inset-0"
                          src="/img/loading-gray.svg"
                          alt=""
                        />
                      )}
                    </a>
                    <BiDotsHorizontalRounded className="w-8 h-8 cursor-pointer" />
                  </>
                ) : (
                  <>
                    <Button type="submit">
                      <div
                        onClick={async () => {
                          setLoading(true);
                          await follow(authUser, userData);
                          setLoading(false);
                        }}
                        className="py-1.5 px-7 w-[93px] h-[30px] relative "
                      >
                        {!loading ? (
                          "Follow"
                        ) : (
                          <img
                            className="h-6 w-6 m-auto absolute inset-0"
                            src="/img/loading.svg"
                            alt=""
                          />
                        )}
                      </div>
                    </Button>

                    <BiDotsHorizontalRounded className="w-8 h-8 cursor-pointer" />
                  </>
                )}
              </div>
            </div>
            <nav className="flex gap-x-10 items-center">
              <div>
                <span className="font-semibold">{userData?.posts?.length}</span>{" "}
                posts
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setFollowersModal(true);
                }}
              >
                <span className="font-semibold">
                  {userData?.followers?.length}
                </span>{" "}
                followers
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setFollowingModal(true);
                }}
              >
                <span className="font-semibold">
                  {userData?.following?.length}
                </span>{" "}
                following
              </div>
            </nav>
            <div>
              <span className="text-md font-bold">{userData.displayName}</span>
              <p>{userData?.bio}</p>
              {userData?.website && (
                <a
                  className="text-brand"
                  href={`//${
                    /^((http[s]?|ftp):\/\/)?\/?([^\/\.]+\.)*?([^\/\.]+\.[^:\/\s\.]{1,10}(\.[^:\/\s\.]{1,2})?(:\d+)?)($|\/)([^#?\s]+)?(.*?)?(#[\w\-]+)?$/.exec(
                      userData?.website
                    )[4]
                  }`}
                  target="_blank"
                >
                  {userData?.website}
                </a>
              )}
            </div>
          </div>
        </header>
        <nav className="border-t flex gap-x-16 justify-center items-center">
          <NavLink
            to={`/${userData.username}`}
            end={true}
            className={({ isActive }) =>
              classNames({
                "text-xs flex py-5 border-t tracking-widest -mt-px items-center gap-x-1.5 font-semibold": true,
                "text-[#8e8e8e] border-transparent": !isActive,
                "text-black border-black": isActive,
              })
            }
          >
            <Icon name="post" size={12} />
            POSTS
          </NavLink>
          {userData.uid === authUser.uid && (
            <NavLink
              to={`/${userData.username}/saved`}
              end={true}
              className={({ isActive }) =>
                classNames({
                  "text-xs flex py-5 border-t tracking-widest -mt-px items-center gap-x-1.5 font-semibold": true,
                  "text-[#8e8e8e] border-transparent": !isActive,
                  "text-black border-black": isActive,
                })
              }
            >
              <Icon name="saved" size={12} />
              SAVED
            </NavLink>
          )}
        </nav>
        <Outlet context={[userData]} />
        {unfollowModal && (
          <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
            <div
              ref={modalRef}
              className="relative w-[400px] max-w-2xl px-4  m-auto "
            >
              <div className="bg-white rounded-lg shadow relative ">
                <div className="flex flex-col items-center justify-center p-5 border-b rounded-t space-y-6">
                  <img
                    src={userData.photoURL || "/img/no-avatar.jpeg"}
                    alt=""
                    className="w-[90px] h-[90px] rounded-full"
                  />
                  <p className="text-gray-900 text-sm text-center">
                    If you change your mind, you'll have to request to follow @
                    {userData.username} again.
                  </p>
                </div>

                <div
                  onClick={async () => {
                    setUnfollowModal(false);
                    setLoading(true);
                    unfollow(authUser, userData);
                    setLoading(false);
                  }}
                  className="p-3 space-y-6 border-b  text-center cursor-pointer"
                >
                  <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                    Unfollow
                  </span>
                </div>
                <div
                  className="p-3 space-y-6   text-center cursor-pointer"
                  onClick={() => {
                    setUnfollowModal(false);
                  }}
                >
                  <span className="text-black text-sm font-normal leading-relaxed">
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {followingModal && (
          <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
            <div
              ref={modalRef}
              className="relative w-[400px]  h-[400px]  max-w-2xl px-4  m-auto "
            >
              <div className="bg-white rounded-lg shadow relative ">
                <div className="p-3  border-b  text-center  flex justify-between items-center">
                  <div></div>
                  <span className="  font-semibold leading-relaxed">
                    Following
                  </span>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setFollowingModal(false);
                    }}
                  >
                    <Icon name="close" size={18} />
                  </div>
                </div>

                <ul className=" text-center min-h-[250px] max-h-[350px] overflow-auto relative ">
                  {userData.following.map((user) => (
                    <Following
                      key={user.uid}
                      uid={user.uid}
                      loading={loading}
                      setLoading={setLoading}
                      authUser={authUser}
                      setFollowingModal={setFollowingModal}
                      userData={userData}
                      type={
                        authUser.following.find(
                          (follower) => follower.uid === user.uid
                        )
                          ? null
                          : "follow"
                      }
                    />
                  ))}
                  {userData?.following?.length === 0 && (
                    <NoPeople
                      title="People you follow"
                      desc="Once you follow people, you'll see them here."
                    />
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
        {followersModal && (
          <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
            <div
              ref={modalRef}
              className="relative w-[400px]  h-[400px]  max-w-2xl px-4  m-auto "
            >
              <div className="bg-white rounded-lg shadow relative ">
                <div className="p-3  border-b  text-center  flex justify-between items-center">
                  <div></div>
                  <span className="  font-semibold leading-relaxed">
                    Followers
                  </span>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setFollowersModal(false);
                    }}
                  >
                    <Icon name="close" size={18} />
                  </div>
                </div>
                <ul className=" text-center min-h-[250px] max-h-[350px] overflow-auto relative ">
                  {userData.followers.map((user) => (
                    <Follower
                      key={user.uid}
                      uid={user.uid}
                      loading={loading}
                      setLoading={setLoading}
                      authUser={authUser}
                      setFollowersModal={setFollowersModal}
                      userData={userData}
                    />
                  ))}
                  {userData?.followers?.length === 0 && (
                    <NoPeople
                      title="Followers"
                      desc="You'll see all the people who follow you here."
                    />
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    )
  );
}

export default Profile;

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
import { addComment, addLikes, removeLikes } from "firebaseConfig";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Comment from "./Comment";
import TimeAgo from "react-timeago";
import Following from "./Following";
import Likes from "./Likes";

function ExactPost({
  post,
  userData,
  comments,
  authUser,
  force = null,
  setForce = null,
  setPostModal,
}) {
  const modalRef = useRef(null);
  const likesRef = useRef(null);
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const [likesModal, setLikesModal] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPostModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (likesRef.current && !likesRef.current.contains(event.target)) {
        setLikesModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [likesRef]);

  return (
    <div
      ref={modalRef}
      className="relative  max-w-[1219px]  max-h-[513px] px-4  m-auto w-full"
    >
      <div className="bg-white rounded-lg shadow relative  ">
        <div className="min-h-[513px] h-[513px] flex items-center justify-between">
          <>
            <div className="w-full h-full bg-black relative flex justify-center items-center">
              {post.file.type.includes("image") && (
                <img
                  src={post.file.url}
                  className="h-full object-scale-down"
                  alt={post.alt}
                />
              )}
              {post.file.type.includes("video") && (
                <video
                  disablePictureInPicture
                  controls
                  controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar "
                >
                  <source src={post.file.url} type="video/mp4" />
                </video>
              )}
            </div>
            <div className="w-full h-full">
              <div className="items-start justify-start space-x-5 w-full  border-b">
                <div className=" flex justify-between items-center ">
                  <div className="w-full flex justify-start items-center space-x-3 p-4">
                    <img
                      src={userData.photoURL}
                      className="rounded-full h-7 w-7"
                      alt=""
                    />
                    <div className="flex flex-col justify-between items-start">
                      <p className="font-semibold">{userData.username}</p>
                      {post.location && (
                        <p className="text-xs">{post.location}</p>
                      )}
                    </div>
                  </div>

                  <BiDotsHorizontalRounded className="w-8 h-8 cursor-pointer m-4 text-[#8e8e8e]" />
                </div>
              </div>
              <div className="items-start justify-start space-x-5 w-full  border-b">
                <div className=" flex flex-col justify-center items-center  h-72">
                  {post.title || comments ? (
                    <ul className="w-full h-full max-h-full overflow-auto p-4 flex flex-col space-y-3">
                      {post.title && (
                        <li className="flex justify-start items-center space-x-4">
                          <img
                            src={userData.photoURL}
                            className="rounded-full h-7 w-7"
                            alt=""
                          />
                          <div className="flex flex-col justify-start items-start">
                            <div className="flex justify-start items-center space-x-1">
                              <Link
                                className="font-semibold cursor-pointer text-sm"
                                href={`/${userData.username}`}
                              >
                                {userData.username}
                              </Link>
                              <p className="text-sm">{post.title}</p>
                            </div>
                            <p className="text-xs text-[#8e8e8e]">
                              <TimeAgo date={post.date} />
                            </p>
                          </div>
                        </li>
                      )}

                      {comments.map((comment) => (
                        <Comment key={comment.uid} comment={comment} />
                      ))}
                    </ul>
                  ) : (
                    <>
                      <h2 className="text-[22px] font-semibold">
                        No comments yet.
                      </h2>
                      <p className="text-sm font-light">
                        Start the conversation.
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="items-start justify-start space-x-5 w-full  border-b">
                <div className="px-5 py-2">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-4">
                      {post.likes.find((like) => like.uid === authUser.uid) ? (
                        <Icon
                          className="cursor-pointer hover:opacity-50"
                          name="redHeart"
                          size={24}
                          onClick={() => {
                            removeLikes(userData, post, authUser);
                          }}
                        />
                      ) : (
                        <Icon
                          className="cursor-pointer hover:opacity-50"
                          name="heart"
                          size={24}
                          onClick={() => {
                            addLikes(userData, post, authUser);
                          }}
                        />
                      )}

                      <Icon
                        className="cursor-pointer hover:opacity-50"
                        name="comment"
                        size={24}
                        onClick={() => {
                          commentRef.current.focus();
                        }}
                      />
                      <Icon
                        className="cursor-pointer hover:opacity-50"
                        name="share"
                        size={24}
                      />
                    </div>
                    <Icon
                      className="cursor-pointer hover:opacity-50"
                      name="bookmark"
                      size={24}
                    />
                  </div>
                  {post?.likes?.length === 0 ? (
                    <span>
                      Be the first to
                      <span
                        onClick={() => {
                          addLikes(userData, post, authUser);
                        }}
                        className=" font-semibold cursor-pointer"
                      >
                        {" "}
                        like this
                      </span>
                    </span>
                  ) : post?.likes?.length === 1 ? (
                    <span
                      onClick={() => {
                        setLikesModal(true);
                      }}
                      className="text-sm font-semibold cursor-pointer"
                    >
                      {post.likes.length} like
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        setLikesModal(true);
                      }}
                      className="text-sm font-semibold cursor-pointer"
                    >
                      {post.likes.length} likes{" "}
                    </span>
                  )}

                  <p className="text-xs text-[#8e8e8e]">
                    <TimeAgo date={post.date} />
                  </p>
                </div>
              </div>
              <div className="col-span-5 w-full flex justify-between items-center p-3">
                <Icon className="mr-2" name="emoji" fill="black" size={23} />

                <input
                  ref={commentRef}
                  className="w-full border-[1px] border-none  focus:outline-none p-2 resize-none"
                  type="text"
                  placeholder="Add a comment..."
                  name="comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  disabled={!comment}
                  className=" text-brand disabled:opacity-60 "
                  onClick={async () => {
                    await addComment(comment, userData, post, authUser);
                    setComment("");
                    setForce(!force);
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </>
        </div>
      </div>
      {likesModal && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={likesRef}
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
                    setLikesModal(false);
                  }}
                >
                  <Icon name="close" size={18} />
                </div>
              </div>

              <ul className=" text-center min-h-[250px] max-h-[350px] overflow-auto relative ">
                {post?.likes?.map((user) => (
                  <Likes
                    uid={user.uid}
                    authUser={authUser}
                    setLikesModal={setLikesModal}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExactPost;

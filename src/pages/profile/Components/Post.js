import { useRef, useState, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Icon from "components/Icon";
import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";
import TimeAgo from "react-timeago";
import { addComment } from "firebaseConfig";
import Comment from "./Comment";
import { useSelector } from "react-redux";
function Post({ post, user }) {
  const authUser = useSelector((state) => state.auth.user);

  const [postModal, setPostModal] = useState(false);
  const [comment, setComment] = useState("");
  const modalRef = useRef(null);
  const [comments, setComments] = useState([...post.comments]);
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
    setComments([...post.comments].sort((b, a) => a.date - b.date));
    console.log("post");
  }, [post.comments]);

  return (
    <>
      <div
        onClick={() => {
          setPostModal(true);
        }}
        className="w-72 h-72 relative col-span-1 group cursor-pointer"
      >
        <img
          className="object-cover w-full h-full	"
          src={post.file.url}
          alt={post.alt}
        />
        <div className="absolute hidden group-hover:flex justify-center items-center space-x-2 inset-0 w-full h-full bg-black/40 ">
          <FaComment className="text-white w-5 h-5" />
          <span className="text-white font-semibold">0</span>
        </div>
      </div>
      {postModal && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
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
                            src={user.photoURL}
                            className="rounded-full h-7 w-7"
                            alt=""
                          />
                          <div className="flex flex-col justify-between items-start">
                            <p className="font-semibold">{user.username}</p>
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
                                  src={user.photoURL}
                                  className="rounded-full h-7 w-7"
                                  alt=""
                                />
                                <div className="flex flex-col justify-start items-start">
                                  <div className="flex justify-start items-center space-x-2">
                                    <Link
                                      className="font-semibold cursor-pointer text-sm"
                                      href={`/${user.username}`}
                                    >
                                      {user.username}
                                    </Link>
                                    <p className="text-sm">{post.title}</p>
                                  </div>
                                  <p className="text-xs text-[#8e8e8e]">4m</p>
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
                            <Icon
                              className="cursor-pointer hover:opacity-50"
                              name="heart"
                              size={24}
                            />
                            <Icon
                              className="cursor-pointer hover:opacity-50"
                              name="message"
                              size={24}
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
                        <span>
                          Be the first to
                          <span className=" font-semibold"> like this</span>
                        </span>
                        <p className="text-xs text-[#8e8e8e]">
                          <TimeAgo date={post.date} />
                        </p>
                      </div>
                    </div>
                    <div className="col-span-5 w-full flex justify-between items-center p-3">
                      <Icon
                        className="mr-2"
                        name="emoji"
                        fill="black"
                        size={23}
                      />

                      <input
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
                        onClick={() => {
                          addComment(comment, user, post, authUser);
                          setComment("");
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;

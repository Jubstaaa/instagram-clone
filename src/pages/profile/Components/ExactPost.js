import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "components/Icon";
import {
  addComment,
  addLikes,
  removeLikes,
  deletePost,
  savePost,
  unsavePost,
} from "firebaseConfig";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Comment from "./Comment";
import TimeAgo from "react-timeago";
import { Helmet } from "react-helmet";
import Likes from "./Likes";
import useClipboard from "react-use-clipboard";
import { toast } from "react-hot-toast";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import AddPost from "components/AddPost";
import EmojiPicker from "emoji-picker-react";
import Search from "components/Search";

function ExactPost({
  post,
  userData,
  comments,
  authUser,
  force = null,
  setForce = null,
  setPostModal = null,
}) {
  const modalRef = useRef(null);
  const likesRef = useRef(null);
  const optionRef = useRef(null);
  const deleteRef = useRef(null);
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const [likesModal, setLikesModal] = useState(false);
  const [optionModal, setOptionModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [shareToModal, setShareToModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [copyLink, setCopyLink] = useClipboard(
    `${window.location.origin}/${userData.username}/${post.uid}`
  );
  const [emojiPicker, setEmojiPicker] = useState(false);
  const emojiRef = useRef(null);
  const [directModal, setDirectModal] = useState(false);
  const directModalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        directModalRef.current &&
        !directModalRef.current.contains(event.target)
      ) {
        setDirectModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [directModalRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPostModal && setPostModal(false);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setOptionModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionRef]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (deleteRef.current && !deleteRef.current.contains(event.target)) {
        setDeleteModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteRef]);

  return (
    <>
      <div
        ref={modalRef}
        className="relative max-w-[1219px]  max-h-[513px] px-4  m-auto w-full"
      >
        <div className="bg-white rounded-lg  m-auto shadow relative  ">
          <div className="flex-col sm:flex-row sm:min-h-[513px] sm:h-[513px] flex items-center justify-between relative">
            <>
              <div className="hidden w-full h-full bg-black relative sm:flex justify-center items-center">
                {post.file.type.includes("image") && (
                  <img
                    src={post.file.url}
                    className="h-full object-scale-down"
                    alt={post.alt}
                  />
                )}
                {post.file.type.includes("video") && (
                  <video
                    autoPlay
                    controls
                    controlsList=" nodownload noremoteplayback  foobar "
                    className="w-full h-full"
                  >
                    <source src={post.file.url} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="w-full h-full">
                <div className="items-start justify-start space-x-5 w-full  border-b">
                  <div className=" flex justify-between items-center ">
                    <div className="w-full flex justify-start items-center space-x-3 p-4">
                      <Link to={`/${userData.username}`}>
                        <img
                          src={userData.photoURL}
                          className="rounded-full h-7 w-7"
                          alt=""
                        />
                      </Link>

                      <div className="flex flex-col justify-between items-start">
                        <Link to={`/${userData.username}`}>
                          <p className="font-semibold">{userData.username}</p>
                        </Link>
                        {post.location && (
                          <p className="text-xs">{post.location}</p>
                        )}
                      </div>
                    </div>

                    <BiDotsHorizontalRounded
                      onClick={() => {
                        setOptionModal(true);
                      }}
                      className="w-6 h-6 cursor-pointer m-4 text-secondaryLink"
                    />
                  </div>
                </div>
                <div className="flex w-full h-full bg-black relative sm:hidden justify-center items-center">
                  {post.file.type.includes("image") && (
                    <img
                      src={post.file.url}
                      className="h-full object-scale-down"
                      alt={post.alt}
                    />
                  )}
                  {post.file.type.includes("video") && (
                    <video
                      autoPlay
                      controls
                      controlsList=" nodownload noremoteplayback  foobar "
                      className="w-full h-full"
                    >
                      <source src={post.file.url} type="video/mp4" />
                    </video>
                  )}
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
                                  to={`/${userData.username}`}
                                >
                                  {userData.username}
                                </Link>
                                <p className="text-sm">{post.title}</p>
                              </div>
                              <p className="text-xs text-secondaryLink">
                                <TimeAgo date={post.date} />
                              </p>
                            </div>
                          </li>
                        )}

                        {comments.map((comment) => (
                          <Comment
                            key={comment.uid}
                            comment={comment}
                            post={post}
                            authUser={authUser}
                            userData={userData}
                            force={force}
                            setForce={setForce}
                          />
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
                        {post.likes.find(
                          (like) => like.uid === authUser.uid
                        ) ? (
                          <Icon
                            className="cursor-pointer hover:opacity-50"
                            name="redHeart"
                            size={24}
                            onClick={async () => {
                              await removeLikes(userData, post, authUser);
                              setForce && setForce(!force);
                            }}
                          />
                        ) : (
                          <Icon
                            className="cursor-pointer hover:opacity-50"
                            name="heart"
                            size={24}
                            onClick={async () => {
                              await addLikes(userData, post, authUser);
                              setForce && setForce(!force);
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
                          onClick={() => {
                            setDirectModal(true);
                          }}
                          className="cursor-pointer hover:opacity-50"
                          name="share"
                          size={24}
                        />
                      </div>
                      {authUser?.saved?.find(
                        (save) => save?.postUid === post?.uid
                      ) ? (
                        <Icon
                          onClick={() => {
                            unsavePost(authUser, userData.uid, post.uid);
                          }}
                          className="cursor-pointer hover:opacity-50 "
                          name="bookmarkBlack"
                          size={24}
                        />
                      ) : (
                        <Icon
                          onClick={() => {
                            savePost(authUser, userData.uid, post.uid);
                          }}
                          className="cursor-pointer hover:opacity-50 "
                          name="bookmark"
                          size={24}
                        />
                      )}
                    </div>
                    {post?.likes?.length === 0 ? (
                      <span>
                        Be the first to
                        <span
                          onClick={() => {
                            addLikes(userData, post, authUser);
                            setForce && setForce(!force);
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

                    <p className="text-xs text-secondaryLink">
                      <TimeAgo date={post.date} />
                    </p>
                  </div>
                </div>
                <div className="col-span-5 w-full flex justify-between items-center p-3 relative">
                  <Icon
                    onClick={() => {
                      setEmojiPicker(true);
                    }}
                    className="mr-2 cursor-pointer"
                    name="emoji"
                    fill="black"
                    size={23}
                  />
                  {emojiPicker && (
                    <div ref={emojiRef} className="absolute bottom-full left-0">
                      <EmojiPicker
                        onEmojiClick={(emojiData, event) => {
                          setComment(comment + emojiData.emoji);
                        }}
                        height={400}
                        autoFocusSearch={true}
                        previewConfig={{
                          showPreview: false,
                        }}
                      />
                    </div>
                  )}
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
                      setForce && setForce(!force);
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
          <div className="darkModal">
            <div ref={likesRef} className="usersModal">
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
                      key={user.uid}
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
        {optionModal && (
          <div className="darkModal">
            <div
              ref={optionRef}
              className="relative w-[400px] max-w-2xl px-4  m-auto "
            >
              <div className="bg-white rounded-lg shadow relative ">
                {userData.uid === authUser.uid && (
                  <>
                    <div
                      onClick={async () => {
                        setOptionModal(false);
                        setDeleteModal(true);
                      }}
                      className="p-3 space-y-6 border-b  text-center cursor-pointer"
                    >
                      <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                        Delete
                      </span>
                    </div>
                    <div
                      className="p-3 space-y-6  border-b   text-center cursor-pointer"
                      onClick={() => {
                        setOptionModal(false);
                        setEditModal(true);
                      }}
                    >
                      <span className="text-black text-sm font-normal leading-relaxed">
                        Edit
                      </span>
                    </div>
                  </>
                )}

                <Link
                  className="p-3 space-y-6   border-b  text-center cursor-pointer block"
                  to={`/${userData.username}/${post.uid}`}
                  onClick={() => {
                    setOptionModal(false);
                  }}
                >
                  <span className="text-black text-sm font-normal leading-relaxed">
                    Go to post
                  </span>
                </Link>
                <div
                  className="p-3 space-y-6   border-b  text-center cursor-pointer"
                  onClick={() => {
                    setOptionModal(false);
                    setShareToModal(true);
                  }}
                >
                  <span className="text-black text-sm font-normal leading-relaxed">
                    Share to...
                  </span>
                </div>
                <div
                  className="p-3 space-y-6   border-b  text-center cursor-pointer"
                  onClick={(e) => {
                    setCopyLink(e);
                    setOptionModal(false);
                    toast.success("Link copied to clipboard.");
                  }}
                >
                  <span className="text-black text-sm font-normal leading-relaxed">
                    Copy link
                  </span>
                </div>
                <div
                  className="p-3 space-y-6   text-center cursor-pointer"
                  onClick={() => {
                    setOptionModal(false);
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
        {deleteModal && (
          <div className="darkModal">
            <div
              ref={deleteRef}
              className="relative w-[400px] max-w-2xl px-4  m-auto "
            >
              <div className="bg-white rounded-lg shadow relative ">
                <div className="flex flex-col items-center justify-center p-5 border-b rounded-t ">
                  <h3 className="text-gray-900 text-lg font-semibold ">
                    Delete post?
                  </h3>
                  <p className="text-sm text-secondaryLink">
                    Are you sure you want to delete this post?
                  </p>
                </div>

                <div
                  onClick={() => {
                    deletePost(userData, post, authUser);
                  }}
                  className="p-3 space-y-6 border-b  text-center cursor-pointer"
                >
                  <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                    Delete
                  </span>
                </div>
                <div
                  className="p-3 space-y-6   text-center cursor-pointer"
                  onClick={() => {
                    setDeleteModal(false);
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
        {shareToModal && (
          <div className="darkModal">
            <div
              ref={deleteRef}
              className="relative w-[400px] h-[400px] max-h-[400px] max-w-2xl px-4  m-auto "
            >
              <div className="bg-white rounded-lg shadow relative ">
                <div className="p-3  border-b  text-center  flex justify-between items-center">
                  <div></div>
                  <span className="  font-semibold leading-relaxed">
                    Share to...
                  </span>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setShareToModal(false);
                    }}
                  >
                    <Icon name="close" size={18} />
                  </div>
                </div>

                <div
                  onClick={() => {
                    setDirectModal(true);
                  }}
                  className="flex justify-start items-center p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
                >
                  <Icon name="share" size={24} />
                  <span className="text-black text-sm font-semibold leading-relaxed">
                    Share to Direct
                  </span>
                </div>
                <FacebookShareButton
                  url={`${window.location.origin}/${userData.username}/${post.uid}/`}
                  resetButtonStyle={false}
                  className="flex justify-start items-center w-full p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
                >
                  <Icon name="facebook" size={24} />
                  <span className="text-black text-sm font-semibold leading-relaxed">
                    Share to Facebook
                  </span>
                </FacebookShareButton>
                <FacebookMessengerShareButton
                  url={`${window.location.origin}/${userData.username}/${post.uid}/`}
                  resetButtonStyle={false}
                  appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                  className="flex justify-start items-center w-full p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50 a"
                >
                  <Icon name="direct" size={24} />
                  <span className="text-black text-sm font-semibold leading-relaxed">
                    Share to Messenger
                  </span>
                </FacebookMessengerShareButton>
                <TwitterShareButton
                  url={`${window.location.origin}/${userData.username}/${post.uid}/`}
                  resetButtonStyle={false}
                  title={`See this Instagram Clone photo by @${userData.username}`}
                  hashtags={["winniesoft", "instagramclone", "reactjs"]}
                  className="flex justify-start items-center w-full p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
                >
                  <Icon name="twitter" size={24} />
                  <span className="text-black text-sm font-semibold leading-relaxed">
                    Share to Twitter
                  </span>
                </TwitterShareButton>
                <EmailShareButton
                  url={`${window.location.origin}/${userData.username}/${post.uid}/`}
                  resetButtonStyle={false}
                  subject={`See this Instagram Clone photo by @${userData.username}`}
                  body={`See this Instagram Clone photo by @${userData.username}`}
                  className="flex justify-start items-center w-full p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
                >
                  <Icon name="mail" size={24} />
                  <span className="text-black text-sm font-semibold leading-relaxed">
                    Share via Email
                  </span>
                </EmailShareButton>
                <div
                  onClick={(e) => {
                    setCopyLink(e);
                    setShareToModal(false);
                    toast.success("Link copied to clipboard.");
                  }}
                  className="flex justify-start items-center p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
                >
                  <Icon name="link" size={24} />
                  <span className="text-black text-sm font-semibold leading-relaxed">
                    Copy link
                  </span>
                </div>
                <div
                  onClick={() => {
                    setShareToModal(false);
                  }}
                  className="flex justify-start items-center p-3 space-x-3 text-center cursor-pointer rounded-lg hover:bg-zinc-50"
                >
                  <div className="w-6 h-6"></div>
                  <span className="text-black text-sm font-semibold leading-relaxed">
                    Cancel
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {editModal && (
          <AddPost
            type="edit"
            fileRef={post.file}
            post={post}
            user={userData}
            setModal={setEditModal}
            force={force}
            setForce={setForce}
          />
        )}
        {directModal && (
          <div className="darkModal">
            <div
              ref={directModalRef}
              className="relative w-[400px] h-[400px] max-h-[400px] max-w-2xl px-4  m-auto "
            >
              <div className="bg-white rounded-lg shadow relative ">
                <div className="p-3 text-center  flex justify-between items-center">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setDirectModal(false);
                    }}
                  >
                    <Icon name="close" size={18} />
                  </div>

                  <span className="  font-semibold leading-relaxed">
                    New message
                  </span>
                  <button
                    //   disabled={!comment}
                    className=" text-brand disabled:opacity-60 "
                    //   onClick={async () => {
                    //     await addComment(, userData, post, authUser);
                    //     setComment("");
                    //     setForce(!force);
                    //   }}
                  >
                    Next
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <Search
                    className="w-full"
                    type="direct"
                    setMessageModal={setDirectModal}
                    post={post}
                    userData={userData}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ExactPost;

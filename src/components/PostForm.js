import { Formik, Form } from "formik";
import Icon from "./Icon";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { addPost, editPost } from "firebaseConfig";
import EmojiPicker from "emoji-picker-react";
import { json } from "react-router-dom";

function PostForm({
  user,
  file,
  setModal,
  type,
  post,
  force = null,
  setForce = null,
}) {
  const [accesibility, setAccesibility] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const emojiRef = useRef(null);

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

  return (
    <Formik
      initialValues={{
        title: type === "edit" ? post.title : "",
        location: type === "edit" ? post.location : "",
        alt: type === "edit" ? post.alt : "",
        file: type === "edit" ? post.file : file,
        user: user,
        post,
      }}
      onSubmit={async (values) => {
        type === "edit" ? await editPost(values) : await addPost(values);
        setModal(false);
        setForce && setForce(!force);
      }}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start items-center w-full max-h-full  overflow-y-auto"
        >
          <div className="items-start justify-start space-x-5 w-full">
            <div className="col-span-5 w-full flex justify-start items-center space-x-3 p-4">
              <img
                src={user.photoURL}
                className="rounded-full h-7 w-7"
                alt=""
              />
              <p className="font-semibold">{user.username}</p>
            </div>
          </div>
          <div className="items-start justify-start w-full border-b">
            <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
              <textarea
                className="w-full border-[1px] h-32 border-none  focus:outline-none p-2 resize-none"
                type="text"
                placeholder="Write a caption..."
                name="title"
                maxLength={2200}
                onChange={handleChange}
                value={values.title}
              />
            </div>
            <div className="flex justify-between items-center p-2 relative">
              <Icon
                className="cursor-pointer"
                onClick={() => {
                  setEmojiPicker(true);
                }}
                name="emoji"
                size={20}
                fill="#8e8e8e"
              />
              {emojiPicker && (
                <div ref={emojiRef} className="absolute inset-0 top-full">
                  <EmojiPicker
                    onEmojiClick={(emojiData, event) => {
                      setFieldValue("title", values.title + emojiData.emoji);
                    }}
                    height="20rem"
                    width="100%"
                    autoFocusSearch={true}
                    previewConfig={{
                      showPreview: false,
                    }}
                  />
                </div>
              )}
              <p className="text-sm text-[#8e8e8e]">
                {values.title.length}/2,200
              </p>
            </div>
          </div>
          <div className="items-start justify-start w-full border-b">
            <div className="col-span-5 w-full flex justify-between items-center">
              <input
                className="w-full border-[1px] border-none  focus:outline-none p-2 resize-none"
                type="text"
                placeholder="Add location"
                name="location"
                onChange={handleChange}
                value={values.location}
              />
              <Icon className="mr-2" name="location" fill="black" />
            </div>
          </div>
          <div className="items-start justify-start w-full border-b">
            <div
              onClick={() => {
                setAccesibility(!accesibility);
              }}
              className="col-span-5 w-full flex justify-between items-center p-2 cursor-pointer"
            >
              <p>Accesibility</p>
              {accesibility ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            {accesibility && (
              <div className="p-4">
                <p className="text-xs text-[#8e8e8e]">
                  Alt text describes your photos for people with visual
                  impairments. Alt text will be automatically created for your
                  photos or you can choose to write your own.
                </p>
                <input
                  className="w-full border-[1px] rounded-md focus:outline-1 p-2 resize-none placeholder:text-sm"
                  type="text"
                  placeholder="Write alt text..."
                  name="alt"
                  onChange={handleChange}
                  value={values.alt}
                />
              </div>
            )}
          </div>
          <button type="submit" className="absolute top-3 right-4 text-brand ">
            {type === "edit" ? "Done" : "Share"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default PostForm;

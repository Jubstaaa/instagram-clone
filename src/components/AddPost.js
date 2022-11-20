import Icon from "./Icon";
import { useState, useRef, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { uploadPhoto } from "firebaseConfig";
import classNames from "classnames";
import PostForm from "./PostForm";
import { BsArrowLeft } from "react-icons/bs";
function AddPost({
  setModal,
  user,
  type = null,
  fileRef = null,
  post = null,
  force = null,
  setForce = null,
}) {
  const modalRef = useRef(null);
  const discardModal = useRef(null);
  const [discard, setDiscard] = useState(false);
  const fileTypes = ["JPG", "JPEG", "PNG", "GIF", "MP4"];
  const [file, setFile] = useState(null);
  const [disable, setDisable] = useState(false);
  const handleChange = async (file) => {
    await uploadPhoto(file, setFile, setDisable);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (file) {
          setDiscard(true);
        } else {
          setModal(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, file]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        discardModal.current &&
        !discardModal.current.contains(event.target)
      ) {
        setDiscard(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [discardModal]);

  useEffect(() => {
    if (type === "edit") {
      setFile(fileRef);
    }
  }, []);

  return (
    <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
      <div
        ref={modalRef}
        className={classNames({
          "relative  max-w-[700px] px-4  m-auto  ": true,
          "w-full": file,
          "w-[400px]": !file,
        })}
      >
        <div className="bg-white rounded-lg shadow relative  ">
          <div className="p-3 border-b  text-center  flex justify-between items-center">
            {file && type === "edit" ? (
              <span
                className="cursor-pointer"
                onClick={() => {
                  setDiscard(true);
                }}
              >
                Cancel
              </span>
            ) : (
              <BsArrowLeft
                onClick={() => {
                  setDiscard(true);
                }}
                className="h-7 w-7 cursor-pointer"
              />
            )}

            <span className="w-full text-normal font-semibold leading-relaxed">
              {type === "edit" ? "Edit info " : "Create new post"}
            </span>
          </div>
          <div
            className={classNames({
              "min-h-[356px] h-[356px] flex items-center justify-between  ": true,
              relative: !file,
            })}
          >
            {!file && (
              <FileUploader
                disabled={disable}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                classes="flex flex-col items-center justify-center p-5 rounded-t space-y-2 !absolute inset-0 w-100 h-100 "
              >
                <Icon name="newPost" size={96} />

                <h2 className="text-gray-900 text-[22px] text-center font-light ">
                  Drag photos and videos here
                </h2>
                <button
                  className="h-[30px] mt-1 w-40 flex items-center justify-center gap-x-2 rounded-md bg-brand font-semibold text-sm text-white disabled:opacity-60 "
                  type="submit"
                >
                  <div>Select from computer</div>
                </button>
              </FileUploader>
            )}
            {file && (
              <>
                <div className="w-full h-full bg-zinc-50 relative flex justify-center items-center">
                  {file.type.includes("image") && (
                    <img
                      src={file.url}
                      className="h-full object-scale-down"
                      alt=""
                    />
                  )}
                  {file.type.includes("video") && (
                    <video
                      disablePictureInPicture
                      controls
                      controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar "
                      className="w-full h-full"
                    >
                      <source src={file.url} type="video/mp4" />
                    </video>
                  )}
                </div>
                <div className="w-full h-full">
                  <PostForm
                    user={user}
                    file={file}
                    setModal={setModal}
                    type={type}
                    post={post}
                    force={force}
                    setForce={setForce}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {discard && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={discardModal}
            className="relative w-[400px] max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              <div className="flex flex-col items-center justify-center p-5 border-b rounded-t ">
                <h3 className="text-gray-900 text-lg font-semibold ">
                  Discard post?
                </h3>
                <p className="text-[#8e8e8e]">
                  If you leave, your edits won't be saved.
                </p>
              </div>

              <div
                onClick={() => {
                  setModal(false);
                }}
                className="p-3 space-y-6 border-b  text-center cursor-pointer"
              >
                <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                  Discard
                </span>
              </div>
              <div
                onClick={() => {
                  setDiscard(false);
                }}
                className="p-3 space-y-6   text-center cursor-pointer"
              >
                <span className="text-black text-sm font-normal leading-relaxed">
                  Cancel
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPost;

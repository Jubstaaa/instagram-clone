import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { useState } from "react";
import {
  removeUser,
  removePhoto,
  updatePhoto,
  updateEditProfile,
} from "firebaseConfig";
import { toast } from "react-hot-toast";
import { EditSchema } from "validation";
function EditForm() {
  const inputFile = useRef(null);
  const userData = useSelector((state) => state.auth.user);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const modalRef = useRef(null);

  const addImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    } else if (!file.type.includes("image")) {
      return toast.error("Unsupported file type");
    } else {
      await updatePhoto(userData, file);
      setOpenModal(false);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModal(false);
        setDeleteModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="relative col-span-3 border-[1px] border-gray-300  ">
      <div className="flex flex-col items-start justify-center pl-16 pr-40 pt-8 space-y-5">
        <div className="grid grid-cols-7 items-center justify-start space-x-6 w-full">
          <img
            onClick={() => {
              setOpenModal(true);
            }}
            className="h-10 w-10 cursor-pointer col-span-2 justify-self-end rounded-full object-cover"
            src={userData.photoURL || "/img/no-avatar.jpeg"}
            alt=""
          />
          <div className="col-span-5">
            <h1>{userData.username}</h1>
            <a
              onClick={() => {
                setOpenModal(true);
              }}
              className="text-sm  font-semibold text-brand text-center cursor-pointer "
            >
              Change profile photo
            </a>
            <input
              className="hidden w-0 h-0 absolute"
              type="file"
              ref={inputFile}
              onChangeCapture={addImage}
            />
          </div>
        </div>
        <div className="flex items-center justify-start space-x-6 w-full">
          <Formik
            validationSchema={EditSchema}
            initialValues={{
              displayName: userData?.displayName,
              username: userData?.username,
              website: userData?.website,
              bio: userData?.bio,
              email: userData?.email,
            }}
            onSubmit={(initialValues) => {
              updateEditProfile(initialValues, userData);
            }}
          >
            {({
              isSubmitting,
              values,
              dirty,
              isValid,
              handleSubmit,
              handleChange,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col justify-start items-center w-full space-y-5"
              >
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end">
                    Name
                  </label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
                    <input
                      className="w-full border-[1px] border-[#dbdbdb] p-1"
                      type="text"
                      placeholder="Name"
                      name="displayName"
                      onChange={handleChange}
                      value={values.displayName}
                    />
                    <p className="text-xs text-[#8e8e8e]">
                      Help people discover your account by using the name you're
                      known by: either your full name, nickname, or business
                      name.
                    </p>
                    <p className="text-xs text-[#8e8e8e]">
                      You can only change your name twice within 14 days.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end">
                    Username
                  </label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
                    <input
                      className="w-full border-[1px] border-[#dbdbdb] p-1"
                      type="text"
                      placeholder="Username"
                      name="username"
                      onChange={handleChange}
                      value={values.username}
                    />
                    <p className="text-xs text-[#8e8e8e]">
                      In most cases, you'll be able to change your username back
                      to {userData.username} for another 14 days.{" "}
                      <a href="#" className="text-brand">
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end">
                    Website
                  </label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
                    <input
                      className="w-full border-[1px] border-[#dbdbdb] p-1"
                      type="text"
                      placeholder="Website"
                      name="website"
                      onChange={handleChange}
                      value={values.website}
                    />
                    <p className="text-xs text-[#8e8e8e]">
                      Editing your links is only available on mobile. Visit the
                      Instagram app and edit your profile to change the websites
                      in your bio.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end">
                    Bio
                  </label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
                    <textarea
                      className="w-full border-[1px] border-[#dbdbdb] p-1 resize-none	"
                      type="text"
                      name="bio"
                      maxLength="150"
                      onChange={handleChange}
                      value={values.bio}
                    />
                    <p className="text-xs text-[#8e8e8e]">
                      {values.bio.length} / 150
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end"></label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-1">
                    <h2 className="text-[#8e8e8e] text-sm font-semibold">
                      Personal information
                    </h2>
                    <p className="text-xs text-[#8e8e8e]">
                      Provide your personal information, even if the account is
                      used for a business, a pet or something else. This won't
                      be a part of your public profile.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end">
                    Email
                  </label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
                    <input
                      className="w-full border-[1px] border-[#dbdbdb] p-1"
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end">
                    Phone number
                  </label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
                    <input
                      className="w-full border-[1px] border-[#dbdbdb] p-1"
                      type="tel"
                      disabled
                      placeholder="Phone number"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end">
                    Gender
                  </label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
                    <input
                      className="w-full border-[1px] border-[#dbdbdb] p-1"
                      type="text"
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end ">
                    Similar account suggestions
                  </label>
                  <div className="col-span-5 w-full flex justify-start items-center space-y-3">
                    <input
                      className=" border-[1px] border-[#dbdbdb]"
                      type="checkbox"
                      disabled
                    />
                    <p className="w-[250px] ml-2 text-sm font-semibold leading-4	">
                      Include your account when recommending similar accounts
                      people might want to follow.{" "}
                      <a className="text-brand hover:underline" href="#">
                        [?]
                      </a>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end "></label>
                  <div className="col-span-5 w-full flex justify-between items-center space-y-3">
                    <button
                      disabled={!isValid || !dirty}
                      className="h-[30px] mt-1 w-20 flex items-center justify-center gap-x-2 rounded-md bg-brand font-semibold text-sm text-white disabled:opacity-60 "
                      type="submit"
                    >
                      <div> Submit</div>
                    </button>
                    <a
                      onClick={() => {
                        setDeleteModal(true);
                      }}
                      className="text-brand text-sm font-semibold cursor-pointer"
                    >
                      Temporarily deactivate my account
                    </a>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {openModal && (
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={modalRef}
            className="relative w-[400px] max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              <div className="flex items-start justify-center p-5 border-b rounded-t ">
                <h3 className="text-gray-900 text-lg font-semibold ">
                  Change Profile Photo
                </h3>
              </div>
              <div
                onClick={() => {
                  inputFile?.current?.click();
                }}
                className="p-3 space-y-6 border-b text-center cursor-pointer"
              >
                <span className="text-brand text-sm font-bold leading-relaxed ">
                  Upload Photo
                </span>
              </div>
              <div
                onClick={async () => {
                  await removePhoto(userData);
                  setOpenModal(false);
                }}
                className="p-3 space-y-6 border-b  text-center cursor-pointer"
              >
                <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                  Remove Current Photo
                </span>
              </div>
              <div
                className="p-3 space-y-6   text-center cursor-pointer"
                onClick={() => {
                  setOpenModal(false);
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
        <div className="flex bg-black/60 overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
          <div
            ref={modalRef}
            className="relative w-[400px] max-w-2xl px-4  m-auto "
          >
            <div className="bg-white rounded-lg shadow relative ">
              <div className="flex items-start justify-center p-5 border-b rounded-t ">
                <h3 className="text-gray-900 text-lg font-semibold ">
                  Your account will be deleted
                </h3>
              </div>

              <div
                onClick={() => {
                  removeUser(userData);
                }}
                className="p-3 space-y-6 border-b  text-center cursor-pointer"
              >
                <span className="text-[#ed4956] text-sm font-bold leading-relaxed">
                  Delete My Account
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
    </div>
  );
}

export default EditForm;

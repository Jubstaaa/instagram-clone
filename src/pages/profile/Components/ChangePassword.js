import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { changePassword, forgotPassword } from "firebaseConfig";
import { PasswordSchema } from "validation";
function ChangePassword() {
  const userData = useSelector((state) => state.auth.user);
  return (
    <div className="relative col-span-3 border-[1px] border-gray-300  ">
      <div className="flex flex-col items-start justify-center pl-16 pr-40 pt-8 space-y-5">
        <div className="grid grid-cols-7 items-center justify-start space-x-6 w-full">
          <img
            className="h-10 w-10 col-span-2 justify-self-end rounded-full"
            src={userData.photoURL || "/img/no-avatar.jpeg"}
            alt=""
          />
          <div className="col-span-5">
            <h1 className="text-2xl ">{userData.username}</h1>
          </div>
        </div>
        <div className="flex items-center justify-start space-x-6 w-full">
          <Formik
            validationSchema={PasswordSchema}
            initialValues={{
              oldPassword: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={async ({ password }, { resetForm }) => {
              await changePassword(password);
              resetForm();
            }}
          >
            {({ values, dirty, isValid, handleSubmit, handleChange }) => (
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col justify-start items-center w-full space-y-5"
              >
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end">
                    Old password
                  </label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
                    <input
                      className="w-full border-[1px] border-[#dbdbdb] p-1"
                      type="password"
                      name="oldPassword"
                      onChange={handleChange}
                      value={values.oldPassword}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end">
                    New password
                  </label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
                    <input
                      className="w-full border-[1px] border-[#dbdbdb] p-1"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end">
                    Confirm new password
                  </label>
                  <div className="col-span-5 w-full flex flex-col justify-center items-start space-y-3">
                    <input
                      className="w-full border-[1px] border-[#dbdbdb] p-1"
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={values.confirmPassword}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end "></label>
                  <div className="col-span-5 w-full flex justify-between items-center space-y-3">
                    <button
                      disabled={!isValid || !dirty}
                      className="h-[30px] mt-1 w-32 flex items-center justify-center gap-x-2 rounded-md bg-brand font-semibold text-sm text-white disabled:opacity-60 "
                      type="submit"
                    >
                      <div> Change password</div>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 items-start justify-start space-x-5 w-full">
                  <label className="col-span-2 font-semibold pt-1 text-end "></label>
                  <div className="col-span-5 w-full flex justify-between items-center space-y-3">
                    <a
                      onClick={() => {
                        forgotPassword(userData.email);
                      }}
                      className="text-brand text-sm font-semibold cursor-pointer"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;

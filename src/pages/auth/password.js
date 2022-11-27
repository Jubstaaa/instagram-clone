import React from "react";
import Button from "components/Button";
import { Link } from "react-router-dom";
import { forgotPassword } from "firebaseConfig";
import Icon from "components/Icon";
import { Formik, Form } from "formik";
import Separator from "components/Separator";
import Footer from "components/Footer";
import { Helmet } from "react-helmet";

function Password() {
  return (
    <>
      <Helmet>
        <title>Reset Password • Instagram</title>
      </Helmet>
      <div className="h-full pt-12 w-full flex flex-wrap overflow-auto gap-x-8 items-center justify-center ">
        <div className="w-[350px] grid ">
          <div className="bg-zinc-50 sm:bg-white sm:border p-[40px] pt-10 pb-0 flex flex-col justify-center space-y-2 ">
            <Icon className="m-auto " name="lock" size={96} />

            <h4 className="text-base font-semibold text-center">
              Trouble logging in?
            </h4>
            <p className="text-xs text-[#8e8e8e] py-2 text-center">
              Enter your email, phone, or username and we'll send you a link to
              get back into your account.
            </p>
            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={({ email }, { resetForm }) => {
                forgotPassword(email);
                resetForm();
              }}
            >
              {({ values, handleSubmit, handleChange }) => (
                <Form onSubmit={handleSubmit} className="grid gap-y-1.5">
                  <input
                    className="w-full border-[1px] border-[#dbdbdb] p-1"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={values.email}
                  />

                  <Button disabled={!values.email} type="submit">
                    <div> Send login link</div>
                  </Button>
                </Form>
              )}
            </Formik>
            <a
              className="cursor-pointer text-brand text-center text-xs pb-5"
              href="#"
            >
              Can't reset your password?
            </a>

            <Separator />
            <Link
              className="font-semibold text-sm text-center"
              to="/auth/register"
            >
              Create new account
            </Link>
            <div className="h-12"></div>
          </div>
          <Link
            to="/auth/login"
            className="bg-zinc-50 sm:border p-4 text-sm text-center"
          >
            <span className=" mx-1 font-semibold text-black">
              Back to login
            </span>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Password;

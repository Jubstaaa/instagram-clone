import React from "react";
import Input from "components/Input";
import Button from "components/Button";
import { useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { register } from "firebaseConfig";

import { Formik, Form } from "formik";
import { RegisterSchema } from "validation";
import Separator from "components/Separator";
import Footer from "components/Footer";
function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    const response = await register(values);
    if (response) {
      navigate(location.state?.return_url || "/", {
        replace: true,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="h-full py-12 w-full flex flex-wrap overflow-auto gap-x-8 items-center justify-center ">
        <div className="w-[350px] grid gap-y-3">
          <div className="bg-zinc-50 sm:bg-white sm:border p-[40px] pt-10 pb-6 ">
            <a href="/" className="flex justify-center mb-4">
              <img className="h-[51px]" src="/img/instagram.png" alt="" />
            </a>
            <p className="text-[17px] font-semibold text-[#8e8e8e] text-center mb-6">
              Sign up to see photos and videos from your friends.
            </p>
            <Button>
              <AiFillFacebook size={20} />
              Log in with Facebook
            </Button>
            <Separator />

            <Formik
              validationSchema={RegisterSchema}
              initialValues={{
                email: "",
                fullName: "",
                username: "",
                password: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, dirty, isValid, handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid gap-y-1.5">
                  <Input name="email" label="Email" />
                  <Input name="fullName" label="Full Name" />
                  <Input name="username" label="Username" />
                  <Input type="password" name="password" label="Password" />
                  <p className="text-xs text-[#8e8e8e] py-2 text-center">
                    People who use our service may have uploaded your contact
                    information to Instagram.{" "}
                    <a href="#" className="font-semibold">
                      Learn More
                    </a>
                    <br />
                    <br />
                    By signing up, you agree to our{" "}
                    <a href="#" className="font-semibold">
                      Terms
                    </a>
                    ,{" "}
                    <a href="#" className="font-semibold">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="font-semibold">
                      Cookies Policy
                    </a>{" "}
                    .
                  </p>

                  <Button disabled={!isValid || !dirty} type="submit">
                    {!loading ? (
                      <div> Sign up</div>
                    ) : (
                      <img
                        className="h-6 w-6 m-auto"
                        src="/img/loading.svg"
                        alt=""
                      />
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="bg-zinc-50 sm:bg-white sm:border p-4 text-sm text-center">
            Have an account?
            <Link to="/auth/login" className=" mx-1 font-semibold text-brand">
              Log in
            </Link>
          </div>
          <div className="text-center">Get the app.</div>
          <div className="flex justify-center items-center space-x-1.5">
            <a href="https://apps.apple.com/tr/app/instagram/id389801252">
              <img className="h-[40px]" src="/img/appstore.png" alt="" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.instagram.android&hl=tr&gl=US">
              <img className="h-[40px]" src="/img/googleplay.png" alt="" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;

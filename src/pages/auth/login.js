import React from "react";
import Input from "components/Input";
import Button from "components/Button";
import { useRef, useEffect, useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { setUser } from "store/auth";
import { useLocation, Link, Navigate } from "react-router-dom";
import { login } from "firebaseConfig";
import { Formik, Form } from "formik";
import { LoginSchema } from "validation";
import Separator from "components/Separator";
import { useSelector } from "react-redux";
import { forgotPassword } from "firebaseConfig";
import Footer from "components/Footer";
function Login() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let images = ref.current.querySelectorAll("img"),
      total = images.length,
      current = 0;
    const imageSlider = () => {
      images[(current > 0 ? current : total) - 1].classList.add("opacity-0");
      images[current].classList.remove("opacity-0");
      current = current === total - 1 ? 0 : current + 1;
    };
    imageSlider();
    const interval = setInterval(imageSlider, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const images = [
    "/img/screenshot1.png",
    "/img/screenshot2.png",
    "/img/screenshot3.png",
    "/img/screenshot4.png",
  ];

  if (user) {
    return <Navigate to={location.state?.return_url || "/"} replace={true} />;
  }

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    await login(values.username, values.password);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="h-full py-12 w-full flex flex-wrap overflow-auto gap-x-8 items-center justify-center ">
        <div className="hidden md:block w-[380px] h-[581px] bg-phone bg-[length:468.32px_634.15px] bg-[-46px_0] relative">
          <div
            className="w-[250px] h-[538px] absolute top-[27px] right-[18px]"
            ref={ref}
          >
            {images.map((img, i) => (
              <img
                key={i}
                className="w-[250x] h-[538px] absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-in"
                src={img}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="w-[350px] grid gap-y-3">
          <div className="bg-zinc-50 sm:bg-white sm:border p-[40px] pt-10 pb-6 ">
            <a href="/" className="flex justify-center mb-8">
              <img className="h-[51px]" src="/img/instagram.png" alt="" />
            </a>
            <Formik
              validationSchema={LoginSchema}
              initialValues={{ username: "", password: "" }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, dirty, isValid, handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="grid gap-y-1.5">
                  <Input name="username" label="Email" />
                  <Input type="password" name="password" label="Password" />

                  <Button disabled={!isValid || !dirty} type="submit">
                    {!loading ? (
                      <div> Log In</div>
                    ) : (
                      <img
                        className="h-6 w-6 m-auto"
                        src="/img/loading.svg"
                        alt=""
                      />
                    )}
                  </Button>
                  <Separator />
                  <div>
                    <a
                      href="/"
                      className="flex mb-2.5 justify-center items-center gap-x-2 text-sm font-semibold text-facebook"
                    >
                      <AiFillFacebook size={20} />
                      Log in with Facebook
                    </a>
                    <Link
                      to="/auth/password"
                      className="text-xs flex items-center justify-center text-link"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="bg-zinc-50 sm:bg-white sm:border p-4 text-sm text-center">
            Don't have an account?
            <Link
              to="/auth/register"
              className=" mx-1 font-semibold text-brand"
            >
              Sign up
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
    </div>
  );
}

export default Login;

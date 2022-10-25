import Input from "components/Input";
import { useRef, useEffect, useState } from "react";
import { AiFillFacebook } from "react-icons/ai";

function App() {
  const ref = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const enable = username && password;
  useEffect(() => {
    let images = ref.current.querySelectorAll("img"),
      total = images.length,
      current = 0;
    const imageSlider = () => {
      if (current > 0) {
        images[current - 1].classList.add("opacity-0");
      } else {
        images[total - 1].classList.add("opacity-0");
      }
      images[current].classList.remove("opacity-0");
      if (current === total - 1) {
        current = 0;
      } else {
        current++;
      }
    };
    imageSlider();
    const interval = setInterval(imageSlider, 4000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="h-full py-12 w-full flex flex-wrap overflow-auto gap-x-8 items-center justify-center ">
        <div className="hidden md:block w-[380px] h-[581px] bg-phone bg-[length:468.32px_634.15px] bg-[-46px_0] relative">
          <div
            className="w-[250px] h-[538px] absolute top-[27px] right-[18px]"
            ref={ref}
          >
            <img
              className="w-[250x] h-[538px] absolute top-0 left-0 opacity-1 transition-opacity duration-1000 ease-in"
              src="/img/screenshot1.png"
              alt=""
            />
            <img
              className="w-[250x] h-[538px] absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-in"
              src="/img/screenshot2.png"
              alt=""
            />
            <img
              className="w-[250x] h-[538px] absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-in"
              src="/img/screenshot3.png"
              alt=""
            />
            <img
              className="w-[250x] h-[538px] absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-in"
              src="/img/screenshot4.png"
              alt=""
            />
          </div>
        </div>
        <div className="w-[350px] grid gap-y-3">
          <div className="bg-zinc-50 sm:bg-white sm:border p-[40px] pt-10 pb-6 ">
            <a href="/" className="flex justify-center mb-8">
              <img className="h-[51px]" src="/img/instagram.png" alt="" />
            </a>

            <form className="grid gap-y-1.5">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Phone number username or email"
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
              />

              <button
                type="submit"
                disabled={!enable}
                className="h-[30px] mt-1 rounded-md bg-brand font-semibold text-sm text-white disabled:opacity-30"
              >
                {!loading ? (
                  <div> Log In</div>
                ) : (
                  <img
                    className="h-6 w-6 m-auto"
                    src="/img/loading.svg"
                    alt=""
                  />
                )}
              </button>

              <div className="flex items-center my-2.5 mb-3.5">
                <div className="h-px bg-gray-300 flex-1"></div>
                <span className="px-4 text-[13px] text-gray-500 font-semibold">
                  OR
                </span>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              <div>
                <a
                  href="/"
                  className="flex mb-2.5 justify-center items-center gap-x-2 text-sm font-semibold text-facebook"
                >
                  <AiFillFacebook size={20} />
                  Log in with Facebook
                </a>
                <a
                  href="/"
                  className="text-xs flex items-center justify-center text-link"
                >
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
          <div className="bg-zinc-50 sm:bg-white sm:border p-4 text-sm text-center">
            Don't have an account?
            <a href="/" className=" mx-1 font-semibold text-brand">
              Sign up
            </a>
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
      {/* Footer */}
      <div className="flex flex-col space-y-4 p-10 md:p-16">
        <ul
          className="flex gap-3 items-center justify-center flex-wrap wrap;
"
        >
          <li className="text-secondaryLink text-xs hover:underline">
            <a href="/">Meta</a>
          </li>
          <li className="text-secondaryLink text-xs hover:underline">
            <a href="/">About</a>
          </li>
          <li className="text-secondaryLink text-xs hover:underline">
            <a href="/">Blog</a>
          </li>
          <li className="text-secondaryLink text-xs hover:underline">
            <a href="/">Jobs</a>
          </li>
          <li className="text-secondaryLink text-xs hover:underline">
            <a href="/">Help</a>
          </li>
          <li className="text-secondaryLink text-xs hover:underline">
            <a href="/">API</a>
          </li>
          <li className="text-secondaryLink text-xs ">
            <a href="/">Privacy</a>
          </li>
          <li className="text-secondaryLink text-xs ">
            <a href="/">Terms</a>
          </li>
          <li className="text-secondaryLink text-xs ">
            <a href="/">Top Accounts</a>
          </li>
          <li className="text-secondaryLink text-xs ">
            <a href="/">Hashtags</a>
          </li>
          <li className="text-secondaryLink text-xs ">
            <a href="/">Locations</a>
          </li>
          <li className="text-secondaryLink text-xs ">
            <a href="/">Instagram Lite</a>
          </li>
          <li className="text-secondaryLink text-xs ">
            <a href="/">Contact Uploading & Non-Users</a>
          </li>
        </ul>

        <ul
          className="flex space-x-4 items-center justify-center flex-wrap: wrap;
"
        >
          <li className="text-secondaryLink text-xs ">
            <select className="w-16 bg-transparent">
              <option value="af">Afrikaans</option>
              <option value="cs">Čeština</option>
              <option value="da">Dansk</option>
              <option value="de">Deutsch</option>
              <option value="el">Ελληνικά</option>
              <option value="en" selected>
                English
              </option>
              <option value="en-gb">English (UK)</option>
              <option value="es">Español (España)</option>
              <option value="es-la">Español</option>
              <option value="fi">Suomi</option>
              <option value="fr">Français</option>
              <option value="id">Bahasa Indonesia</option>
              <option value="it">Italiano</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="ms">Bahasa Melayu</option>
              <option value="nb">Norsk</option>
              <option value="nl">Nederlands</option>
              <option value="pl">Polski</option>
              <option value="pt-br">Português (Brasil)</option>
              <option value="pt">Português (Portugal)</option>
              <option value="ru">Русский</option>
              <option value="sv">Svenska</option>
              <option value="th">ภาษาไทย</option>
              <option value="tl">Filipino</option>
              <option value="tr">Türkçe</option>
              <option value="zh-cn">中文(简体)</option>
              <option value="zh-tw">中文(台灣)</option>
              <option value="bn">বাংলা</option>
              <option value="gu">ગુજરાતી</option>
              <option value="hi">हिन्दी</option>
              <option value="hr">Hrvatski</option>
              <option value="hu">Magyar</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="ml">മലയാളം</option>
              <option value="mr">मराठी</option>
              <option value="ne">नेपाली</option>
              <option value="pa">ਪੰਜਾਬੀ</option>
              <option value="si">සිංහල</option>
              <option value="sk">Slovenčina</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
              <option value="vi">Tiếng Việt</option>
              <option value="zh-hk">中文(香港)</option>
              <option value="bg">Български</option>
              <option value="fr-ca">Français (Canada)</option>
              <option value="ro">Română</option>
              <option value="sr">Српски</option>
              <option value="uk">Українська</option>
            </select>
          </li>
          <li className="text-secondaryLink text-xs ">
            © 2022 Instagram from Meta
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;

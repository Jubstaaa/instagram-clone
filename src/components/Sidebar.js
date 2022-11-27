import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Suggestion from "./Suggestion";
function Sidebar() {
  const user = useSelector((state) => state.auth.user);
  const getDifference = (array1, array2) => {
    return array1?.filter((object1) => {
      return !array2?.some((object2) => {
        return object1?.uid === object2?.uid;
      });
    });
  };

  const suggestionUsers = getDifference(user.followers, user.following);

  return (
    <section className="w-[22rem] hidden lg:block lg:fixed ml-[32rem] space-y-4 pt-4 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full overflow-hidden w-16 h-16 cursor-pointer ">
            <Link to={`/${user.username}`}>
              <img
                className="w-full h-full object-cover"
                src={user.photoURL || "/img/no-avatar.jpeg"}
                alt=""
              />
            </Link>
          </div>
          <div>
            <Link to={`/${user.username}`}>
              <h2 className="font-semibold text-md">{user.username}</h2>
            </Link>
            <h3 className="opacity-50">{user.displayName}</h3>
          </div>
        </div>
        <button className={"sidebarButton"}>Switch</button>
      </div>
      {suggestionUsers?.length > 0 && (
        <div className="flex items-center justify-between">
          <h1 className="font-semibold opacity-50">Suggestions For You</h1>
          <button className={"sidebarButton !text-black"}>See All</button>
        </div>
      )}

      <div className="space-y-4">
        {suggestionUsers?.map((item) => (
          <Suggestion key={item.uid} uid={item.uid} authUser={user} />
        ))}
      </div>
      <div className="flex text-[#c7c7c7] flex-col space-y-4 ">
        <ul
          className="flex gap-1 items-center justify-start flex-wrap wrap;
"
        >
          <li className=" text-xs hover:underline">
            <a href="/">About</a>
          </li>
          <li>·</li>
          <li className=" text-xs hover:underline">
            <a href="/">Help</a>
          </li>
          <li>·</li>
          <li className=" text-xs hover:underline">
            <a href="/">Press</a>
          </li>
          <li>·</li>
          <li className=" text-xs hover:underline">
            <a href="/">API</a>
          </li>
          <li>·</li>
          <li className=" text-xs hover:underline">
            <a href="/">Jobs</a>
          </li>
          <li>·</li>
          <li className=" text-xs hover:underline">
            <a href="/">Privacy</a>
          </li>
          <li>·</li>
          <li className=" text-xs hover:underline">
            <a href="/">Terms</a>
          </li>
          <li>·</li>
          <li className=" text-xs hover:underline">
            <a href="/">Locations</a>
          </li>
          <li>·</li>
          <li className=" text-xs ">
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
        </ul>
        <ul>
          <li className=" text-xs ">© 2022 INSTAGRAM FROM META</li>
        </ul>
      </div>
    </section>
  );
}

export default Sidebar;

function Footer() {
  return (
    <div className="flex flex-col space-y-4 p-10 md:p-16">
      <ul
        className="flex gap-3 items-center justify-center flex-wrap wrap;
"
      >
        <li className="footerItemUnderline">
          <a href="/">Meta</a>
        </li>
        <li className="footerItemUnderline">
          <a href="/">About</a>
        </li>
        <li className="footerItemUnderline">
          <a href="/">Blog</a>
        </li>
        <li className="footerItemUnderline">
          <a href="/">Jobs</a>
        </li>
        <li className="footerItemUnderline">
          <a href="/">Help</a>
        </li>
        <li className="footerItemUnderline">
          <a href="/">API</a>
        </li>
        <li className="footerItem ">
          <a href="/">Privacy</a>
        </li>
        <li className="footerItem ">
          <a href="/">Terms</a>
        </li>
        <li className="footerItem ">
          <a href="/">Top Accounts</a>
        </li>
        <li className="footerItem ">
          <a href="/">Hashtags</a>
        </li>
        <li className="footerItem ">
          <a href="/">Locations</a>
        </li>
        <li className="footerItem ">
          <a href="/">Instagram Lite</a>
        </li>
        <li className="footerItem ">
          <a href="/">Contact Uploading & Non-Users</a>
        </li>
      </ul>

      <ul
        className="flex space-x-4 items-center justify-center flex-wrap: wrap;
"
      >
        <li className="footerItem ">
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
        <li className="footerItem ">© 2022 Instagram from Meta</li>
      </ul>
    </div>
  );
}

export default Footer;

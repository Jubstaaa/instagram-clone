import Icon from "components/Icon";
import { Link } from "react-router-dom";

export default function Header({ user }) {
  return (
    <header className="h-[60px] border-b border-gray-300 flex items-center justify-between px-6">
      <button className="flex items-center gap-x-4">
        <Link to={`/${user.username}`}>
          <img
            src={user.photoURL}
            className="w-6 h-6 rounded-full object-cover"
          />
        </Link>
        <Link className="text-base font-semibold" to={`/${user.username}`}>
          {user.username}
        </Link>
      </button>
      <button>
        <Icon name="info" size={24} />
      </button>
    </header>
  );
}

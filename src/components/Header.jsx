import { Link, useLocation } from "react-router";

export const Header = () => {
  const location = useLocation();
  const isActive = path => location.pathname === path;

  return (
    <header className="flex flex-col items-center py-6">
      <Link to="/">
        <h1 className="text-4xl font-bold tracking-wide text-black hover:opacity-80 transition-opacity">
          METRIJKS
        </h1>
      </Link>

      <nav className="mt-4">
        <ul className="flex space-x-6 text-sm font-medium uppercase tracking-wider text-gray-700">
          <li>
            <Link
              to="/"
              className={`hover:text-black transition-colors ${
                isActive("/") ? "underline underline-offset-4" : ""
              }`}
            >
              Search APIs
            </Link>
          </li>
          <li>
            <Link
              to="/exhibition"
              className={`hover:text-black transition-colors ${
                isActive("/exhibition") ? "underline underline-offset-4" : ""
              }`}
            >
              View Exhibition
            </Link>
          </li>
        </ul>
      </nav>

      <hr className="mt-6 w-full border-t border-gray-300" />
    </header>
  );
};

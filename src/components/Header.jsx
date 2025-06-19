import { Link, useLocation } from "react-router";
import { useSearchContext } from "../context/SearchContext";

export const Header = () => {
  const location = useLocation();
  const isActive = path => location.pathname === path;
  const containsPath = path => location.pathname.includes(path);
  const { setSearchTerm } = useSearchContext();

  return (
    <header className="flex flex-col items-center py-6">
      <Link
        to="/"
        onClick={() => {
          setSearchTerm("");
        }}
      >
        <h1 className="text-4xl font-bold tracking-wide text-black relative group">
          METRIJKS
          <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
        </h1>
      </Link>

      <nav className="mt-4">
        <ul className="flex space-x-6 text-sm font-medium uppercase tracking-wider text-gray-700">
          <li>
            <Link
              to="/"
              className={`hover:text-black transition-colors ${
                isActive("/") || containsPath("/artworks/")
                  ? "underline underline-offset-4"
                  : ""
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

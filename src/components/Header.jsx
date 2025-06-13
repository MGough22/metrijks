import { Link } from "react-router";
export const Header = () => {
  return (
    <>
      <Link to="/">
        <h1 className="main-title">METRIJKS</h1>
      </Link>
      <nav>
        <ul className="links-list">
          <li>
            <Link to="/">Search APIs</Link>
          </li>
          <li>
            <Link to="/exhibition">View & Search your Exhibition</Link>
          </li>
        </ul>
      </nav>
      <hr></hr>
    </>
  );
};

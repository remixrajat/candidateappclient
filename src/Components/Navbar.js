import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Candidates</Link>
          </li>
          <li>
            <Link to="/candidates">Add</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

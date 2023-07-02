import { Link } from "react-router-dom";
import { Admin } from "../Login/Login";
import { useHistory } from "react-router-dom";

const Header = (CartItem: any) => {
  const history = useHistory();
  const isAdmin = Admin();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <>
      <nav
        className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
        arial-label="Furni navigation bar"
      >
        <div className="container">
          <div className="navbar-brand">
            Furni<span>.</span>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsFurni"
            aria-controls="navbarsFurni"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item ">
                {isAdmin ? (
                  <Link to="/home" className="nav-link">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/home" className="nav-link ">
                    Home
                  </Link>
                )}
              </li>
              <li>
                {isAdmin ? (
                  <Link to="/adminProducts" className="nav-link">
                    Products
                  </Link>
                ) : (
                  <Link to="/products" className="nav-link">
                    Shop
                  </Link>
                )}
              </li>

              <li>
                {isAdmin ? (
                  <Link to="/customers" className="nav-link">
                    Customers
                  </Link>
                ) : (
                  <Link to="/contactUs" className="nav-link">
                    Deliver your Note
                  </Link>
                )}
              </li>
              <li>
                {isAdmin ? (
                  <Link to="/admin-feedback" className="nav-link">
                    Feed Back
                  </Link>
                ) : (
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                )}
              </li>
              <li>
                <Link className="nav-link" to="/home" onClick={handleLogout}>
                  Log Out
                </Link>
              </li>
            </ul>
            {isAdmin ? (
              ""
            ) : (
              <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                <li>
                  <div className="nav-link" >
                    <img src="assets/images/user.svg" alt=""/>
                  </div>
                </li>
                <Link to="/cart" className="nav-link">
                  <img src="assets/images/cart.svg" alt=""/>
                  <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;

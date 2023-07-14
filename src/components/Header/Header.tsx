import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import "./header.css";
import { cartItem } from "../../utils/utils";
import { userContext } from "../context/useContext";

const Header = () => {
  const history = useHistory();
  const isAdmin = localStorage.getItem("userRole") === "ADMIN";
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const userId = useContext(userContext);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const extractedUsername = userEmail ? userEmail.split("@")[0] : "";
    setUsername(extractedUsername);
  }, []);

  useEffect(() => {
    fetch(cartItem)
      .then((response) => response.json())
      .then((data) => {
        setOrderData(data);
      })
      .catch((error) => {
        console.error("Error fetching order summary:", error);
      });
  }, []);
  //orderData

  const getCartCount = () => {
    if (userId) {
      const userCartData = orderData.filter((item) => item.userId === userId);
      return userCartData.length;
    }
    return null;
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };

  const handleUserIconClick = () => {
    setShowOrderSummary(!showOrderSummary);
  };

  return (
    <>
      <nav
        className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
        arial-label="Furni navigation bar"
      >
        <div className="container">
          <div className="navbar-brand">Furni</div>

          <Button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsFurni"
            aria-controls="navbarsFurni"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>

          <div className="collapse navbar-collapse" id="navbarsFurni">
            <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  {isAdmin ? "Dashboard" : "Home"}
                </Link>
              </li>
              <li>
                <Link
                  to={isAdmin ? "/adminProducts" : "/products"}
                  className="nav-link"
                >
                  {isAdmin ? "Products" : "Shop"}
                </Link>
              </li>
              <li>
                <Link
                  to={isAdmin ? "/customers" : "/contactUs"}
                  className="nav-link"
                >
                  {isAdmin ? "Customers" : "Deliver your Note"}
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/orderView" className="nav-link">
                    Order Summary
                  </Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link to="/admin-feedback" className="nav-link">
                    Feed Back
                  </Link>
                </li>
              )}
              {(isAdmin && (
                <>
                  <li>
                    <Link
                      className="nav-link"
                      to="/home"
                      onClick={handleLogout}
                    >
                      Log Out
                    </Link>
                  </li>
                </>
              )) ||
                (!isAdmin && (
                  <li>
                    {userId ? (
                      <Link
                        className="nav-link"
                        to="/home"
                        onClick={handleLogout}
                      >
                        Log Out
                      </Link>
                    ) : (
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    )}
                  </li>
                ))}
              {!isAdmin && (
                <li>
                  <Link className="nav-link" to="/orderSummary">
                    My Order
                  </Link>
                </li>
              )}
            </ul>
            {!isAdmin && (
              <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                <li>
                  <div className="nav-link">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div className="order-summary">
                        {username ? (
                          <Typography>{username}</Typography>
                        ) : (
                          <img src="assets/images/user.svg" alt="" />
                        )}
                      </div>
                    </div>
                  </div>
                </li>
                <Link
                  to="/cart"
                  className="nav-link"
                  onClick={handleUserIconClick}
                >
                  <img src="assets/images/cart.svg" alt="" />
                  <span className="cart-icon">
                    <span>{getCartCount()}</span>
                  </span>
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

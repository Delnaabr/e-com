import {useState ,useContext} from "react";
import "./checkout.css";
import { Box, Typography } from "@mui/material";
import ConfirmationDialog from "../DialogConfirmation";
import { useHistory, useLocation } from "react-router-dom";
import { orderSummary } from "../../utils/utils";
import { userContext } from "../context/useContext";

interface Product {
  id: string;
  product_img: string;
  product_name: string;
  product_price: number;
}

const Checkout = () => {
  const [credit, setCredit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsOderSummary] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [formData] = useState({});
  const history = useHistory();
  const location = useLocation();
  const newProduct: Product = location.state as Product;
  const { product_img, product_name, product_price } = newProduct;
  const userId = useContext(userContext);

  const handleCheckout = (event: any) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    const orderData = {
      product_name: newProduct.product_name,
      product_price: newProduct.product_price,
      product_img: newProduct.product_img,
      id: newProduct.id,
      firstName,
      email,
      address,
      country,
      state,
      zip,
      userId: userId,
    };
  
    setIsOderSummary(true);
    setIsOpen(false);
  
    fetch(orderSummary, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order summary data:", data);
      })
      .catch((error) => {
        console.error("Error sending order summary:", error);
      });
  
    history.push({
      pathname: "/orderSummary",
      state: { formData, newProduct, userId },
    });
  };

  return (
    <Box className="container">
      <Box className="py-5 text-center">
        <h2>Checkout form</h2>
      </Box>
      <Box>
        <h2>Product Details</h2>
        <Box className='product-box'>
          <Box>
            <img
              src={product_img}
              className="card-img-top"
              style={{ height: "100px", width: "auto" }}
              alt={product_name}
            />
          </Box>
          <Box className='product-name-price'>
          <Typography className="typography-class"> {product_name}</Typography>
          <Typography className="typography-class"> Rs {product_price}</Typography>
          </Box>
        </Box>
      </Box>
      <Box className="row">
        <Box className="order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation">
            <Box className="row">
              <Box className="col-md-6 mb-3">
                <Typography>First name</Typography>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
              </Box>
              <Box className="col-md-6 mb-3">
                <Typography>Last name</Typography>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </Box>
              <Box className="mb-3">
                <Typography>Username</Typography>
                <Box className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    // required
                  />
                </Box>
              </Box>
              <Box className="mb-3">
                <Typography>Email</Typography>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Box>
              <Box className="mb-3">
                <Typography>Address</Typography>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  required
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </Box>
              <Box className="row">
                <Box className="col-md-4 mb-3">
                  <Typography>Country</Typography>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    required
                  />
                </Box>
                <Box className="col-md-4 mb-3">
                  <Typography>State</Typography>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    required
                  />
                </Box>
                <Box className="col-md-4 mb-3">
                  <Typography>Zip</Typography>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                    required
                  />
                </Box>
              </Box>
              <h4 className="mb-3">Payment</h4>
              <Box className="radio-button-box d-block my-3">
                <Box className="custom-control custom-radio">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    onClick={() => setCredit(true)}
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label">Credit card</label>
                </Box>
                <Box className="custom-control custom-radio">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    onClick={() => setCredit(false)}
                    required
                  />
                  <label className="custom-control-label">
                    Cash on delivery
                  </label>
                </Box>
              </Box>
              {credit ? (
                <>
                  <Box className="row">
                    <Box className="col-md-6 mb-3">
                      <Typography>Name on card</Typography>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        value={cardName}
                        onChange={(event) => setCardName(event.target.value)}
                        required
                      />
                    </Box>
                    <Box className="col-md-6 mb-3">
                      <Typography>Credit card number</Typography>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)}
                        required
                      />
                    </Box>
                  </Box>
                  <Box className="credit-card-cvv">
                    <Box className="col-md-3 mb-3">
                      <Typography>Expiration</Typography>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        value={expiration}
                        onChange={(event) => setExpiration(event.target.value)}
                        required
                      />
                    </Box>
                    <Box className="col-md-3 mb-3">
                      <Typography>CVV</Typography>
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        value={cvv}
                        onChange={(event) => setCvv(event.target.value)}
                        required
                      />
                    </Box>
                  </Box>
                </>
              ) : (
                ""
              )}
              <Box className="button-checkout">
                <button
                  className="btn btn-primary btn-lg btn-block mb-4"
                  onClick={handleCheckout}
                  disabled={
                    !firstName ||
                    !lastName ||
                    !email ||
                    !address ||
                    !country ||
                    !state ||
                    !zip
                  }
                >
                  Continue to checkout
                </button>
              </Box>
              {isOpen ? (
                <ConfirmationDialog
                  open={isOpen}
                  confirmationMessage="Are you sure you want to confirm this order ?"
                  onClose={handleClose}
                  onConfirm={handleConfirm}
                />
              ) : (
                ""
              )}
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
export default Checkout;

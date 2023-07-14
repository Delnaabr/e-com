import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../components/Checkout/checkout.css";
import { Box, Button, Typography } from "@mui/material";
import { orderSummary } from "../utils/utils";
import { userContext } from "../components/context/useContext";

const OrderSummary = () => {
  const history = useHistory();
  const shippingStatus = "Order Accepted";
  const [orderData, setOrderData] = useState(null);
  const userId = useContext(userContext);

  const handleShopping = () => {
    history.push("/products");
  };

  useEffect(() => {
    fetch(orderSummary)
      .then((response) => response.json())
      .then((data) => {
        console.log("Order summary data:", data);
        if (userId) {
          const userOrderData = data.filter(
            (item: any) => item.userId === userId
          );
          setOrderData(userOrderData[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching order summary:", error);
      });
  }, [userId]);

  if (!orderData) {
    return (
      <Typography align="center" className="text-no-order">
        There is no order to display.
      </Typography>
    );
  }
  const {
    product_img,
    product_name,
    product_price,
    firstName,
    email,
    address,
    country,
    state,
    zip,
    credit,
  } = orderData;

  return (
    <>
      <Box className="order-summary-box">
        <h4> Your Order Confirmed, Thank you for Ordering!!</h4>
        <Box>
          <Box className="product-box">
            <Box>
              <img
                src={product_img}
                className="card-img-top"
                style={{ height: "100px", width: "auto" }}
                alt={product_name}
              />
            </Box>
            <Box className="product-name-price">
              <Typography className="typography-class">
                {product_name}
              </Typography>
              <Typography className="typography-class">
                Rs {product_price}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography className="typo-class">
          <b>Shipping Status: {shippingStatus}</b>
        </Typography>
        <Typography className="typo-class">{firstName}</Typography>
        <Typography className="typo-class"> {email}</Typography>
        <Typography className="typo-class"> {address}</Typography>
        <Typography className="typo-class">
          {state}, {zip}
        </Typography>
        <Typography className="typo-class"> {country}</Typography>
        {credit ? (
          <Typography className="typo-class">Payment Mode: Online</Typography>
        ) : (
          <Typography className="typo-class">
            Payment Mode: Cash on delivery
          </Typography>
        )}
      </Box>
      <Box className="button-box">
        <Button
          variant="contained"
          onClick={handleShopping}
          className="button-shop"
        >
          Continue shopping
        </Button>
      </Box>
    </>
  );
};

export default OrderSummary;

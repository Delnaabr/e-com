import "./cart.css";
import { cartItem } from "../../utils/utils";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Cart = (props: any) => {
  const [cartData, setCartData] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(cartItem)
      .then((response) => response.json())
      .then((data) => {
        setCartData(data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    if (userId) {
      const userCartData = cartData.filter((item) => item.userId === userId);
      userCartData.forEach((item) => {
        const quantity = getProductQuantity(item.product_name);
        const price = parseFloat(item.product_price);
        totalPrice += quantity > 1 ? price * quantity : price;
      });
    }
    setTotalPrice(totalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData, userId]);

  const getProductQuantity = (product: string) => {
    const items = cartData.filter(
      (item) => item.product_name === product && item.userId === userId
    );
    return items.length;
  };

  const getProductPrice = (product: string) => {
    const item = cartData.find(
      (item) => item.product_name === product && item.userId === userId
    );
    return item ? item.product_price : "";
  };

  const productDetails = cartData.reduce((result, item) => {
    if (item.userId === userId && !result.includes(item.product_name)) {
      result.push(item.product_name);
    }
    return result;
  }, []);
  

  const handleBuyNow = (products: any[]) => {
    history.push({
      pathname: "/checkout",
      state: { products },
    });
  };

  const handleShopping = () => {
    history.push("/products");
  };

  return (
    <>
      <Box className="cart-box">
        {productDetails?.map((product:any) => {
          const quantity = getProductQuantity(product);
          const price = parseFloat(getProductPrice(product));

          return (
            <div key={product} className="product-box">
              <div className="img-box">
                <img
                  src={
                    cartData.find(
                      (item) =>
                        item.product_name === product && item.userId === userId
                    )?.product_img
                  }
                  className="card-img-top"
                  style={{ height: "100px", width: "auto" }}
                  alt={product}
                />
              </div>
              <div className="product-name-price">
                <Typography className="typography-class">{product}</Typography>
                {quantity > 1 ? (
                  <Typography className="typography-class">
                    Price: Rs {price * quantity}
                  </Typography>
                ) : (
                  <Typography className="typography-class">
                    Price: Rs {price}
                  </Typography>
                )}
                <Typography className="typography-class">
                  Quantity: {quantity}
                </Typography>
              </div>
            </div>
          );
        })}
        {productDetails.length > 0 ? (
          <>
            <div className="total-price">
              <Typography className="typography-class">
                Total Price: Rs {totalPrice}
              </Typography>
            </div>
            <div className="total-price">
              <button
                className="btn btn-outline-dark"
                onClick={() => handleBuyNow(productDetails)}
              >
                Buy Now
              </button>
            </div>
          </>
        ) : (
          <Typography align="center">Your Cart is empty</Typography>
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

export default Cart;

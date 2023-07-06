import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { cartItem, getProducts } from "../../utils/utils";
import { Box, Button } from "@mui/material";
import { userContext } from "../context/useContext";

interface Product {
  id: string;
  product_img: string;
  product_name: string;
  product_price: string;
  category: string;
}

export default function Products() {
  const [data, setData] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Product[]>([]);
  const history = useHistory();
  const userId = useContext(userContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(getProducts);
        const products = await response.json();
        setData(products);
        setFilter(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const filterProduct = (cata: string) => {
    const updatedList = data.filter((x) => x.category === cata);
    setFilter(updatedList);
  };

  const handleCart = (product: any) => {
    if (userId) {
      const newProduct = {
        product_img: product.product_img,
        product_name: product.product_name,
        product_price: product.product_price,
        userId: userId,
      };
      fetch(cartItem, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then((data) => {})
        .catch((error) => {
          alert("Error adding product");
        });
    } else {
      history.push("/login");
    }
  };

  const handleBuyNow = (product: any) => {
    const newProduct = {
      product_img: product.product_img,
      product_name: product.product_name,
      product_price: product.product_price,
      category: product.category,
      product_stock: parseInt(product.product_stock),
    };

    fetch(cartItem, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        // alert("Product added Successfully");
      })
      .catch((error) => {
        alert("Error adding product");
      });
    if (userId) {
      history.push({
        pathname: "/checkout",
        state: newProduct,
      });
    } else {
      history.push("/login");
    }
  };

  const ShowProducts = () => {
    return (
      <>
        <Box className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("Chairs")}
          >
            Chairs
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("Couch")}
          >
            Couch
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("Sofas")}
          >
            Sofas
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("Tables")}
          >
            Tables
          </button>
        </Box>

        {filter.map((product) => {
          return (
            <Box className="col-md-3 mb-4" key={product.id}>
              <Box className="card h-100 text-center p-4">
                <img
                  src={product.product_img}
                  className="card-img-top"
                  height="200px"
                  alt={product.product_name}
                />
                <Box className="card-body">
                  <h5 className="card-title mb-0">{product.product_name}</h5>
                  <p className="card-text lead fw-bold">
                    Rs {product.product_price}
                  </p>
                  <p className="card-text lead">Free Delivery</p>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </button>
                  <Button
                    className="btn btn-outline-dark mt-2"
                    onClick={() => handleCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <Box>
      <Box className="container my-5 py-5">
        <Box className="row">
          <Box className="col-12 mb-5">
            <h1
              className="display-6 fw-bolder text-center"
              style={{ color: "#3b5d50" }}
            >
              Latest Products
            </h1>
            <hr />
          </Box>
        </Box>
        <Box className="row justify-content-center">
          <ShowProducts />
        </Box>
      </Box>
    </Box>
  );
}
export const CartItem = () => CartItem;

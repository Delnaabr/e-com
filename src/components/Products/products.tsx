import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getProducts } from "../../utils/utils";
import { Box, Button } from "@mui/material";

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
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(getProducts);
        const products = await response.json();
        setData(products);
        setFilter(products);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProduct = (cata: string) => {
    const updatedList = data.filter((x) => x.category === cata);
    setFilter(updatedList);
  };

console.log("count",cartCount)
  const Loading = () => {
    return <>Loading...</>;
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
            onClick={() => filterProduct("Sofa")}
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
                  <NavLink to={"/checkout"} className="btn btn-outline-dark">
                    Buy Now
                  </NavLink>
                  <Button
                    className="btn btn-outline-light mt-2"
                    onClick={() => setCartCount(cartCount + 1)} >
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
          {loading ? <Loading /> : <ShowProducts />}
        </Box>
      </Box>
    </Box>
  );
}
export const CartItem = () => CartItem;

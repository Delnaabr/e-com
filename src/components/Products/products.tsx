import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { cartItem } from "../../utils/utils";
import { FetchProductList, addToCart, buyNow } from "../../redux/Action.js";
import { connect } from "react-redux";

interface Product {
  id: string;
  product_img: string;
  product_name: string;
  product_price: string;
  category: string;
}

interface ProductsProps {
  products: Product[];
  fetchProductList: () => void;
  addToCart: any;
  buyNow: any;
}

const Products = ({
  products,
  fetchProductList,
  addToCart,
  buyNow,
}: ProductsProps) => {
  const history = useHistory();
  const [filter, setFilter] = useState<Product[]>(products);

  useEffect(() => {
    fetchProductList();
  }, [fetchProductList]);

  useEffect(() => {
    setFilter(products);
  }, [products]);

  const filterProduct = (category: string) => {
    if (category === "All") {
      setFilter(products);
    } else {
      const updatedList = products.filter(
        (product) => product.category === category
      );
      setFilter(updatedList);
    }
  };

  const handleCart = (product: any) => {
    const newProduct = {
      product_img: product.product_img,
      product_name: product.product_name,
      product_price: product.product_price,
      userId: "userId",
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
        addToCart(newProduct);
        // window.location.reload();
      })
      .catch((error) => {
        alert("Error adding product");
      });
  };

  const handleBuyNow = (product: any) => {
    const newProduct = {
      product_img: product.product_img,
      product_name: product.product_name,
      product_price: product.product_price,
      category: product.category,
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
        buyNow(data);
      })
      .catch((error) => {
        alert("Error adding product");
      });

    history.push({
      pathname: "/checkout",
      state: newProduct,
    });
  };

  const ShowProducts = () => {
    return (
      <>
        <Box className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("All")}
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
};

const mapStateToProps = (state: any) => {
  return {
    products: state.products.productList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductList: () => dispatch(FetchProductList()),
    addToCart: (item: any) => dispatch(addToCart(item)),
    buyNow: (item: any) => dispatch(buyNow(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);

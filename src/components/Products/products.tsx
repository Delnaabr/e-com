// import { Box, Button, IconButton } from "@mui/material";
// import { useState, useEffect } from "react";
// import { Redirect, useHistory } from "react-router-dom"; // import useHistory hook from react-router-dom
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import "./products.css";

// interface Product {
//   id: string;
//   product_img: string;
//   product_name: string;
//   product_price: string;
// }

// const Products = () => {
//   const [data, setData] = useState<Product[]>([]);
//   const [favorites, setFavorites] = useState<string[]>([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(true); // add a state variable for tracking login status
//   const history = useHistory(); // initialize useHistory hook

//   useEffect(() => {
//     fetch("https://640999c16ecd4f9e18b55aaf.mockapi.io/api/e-com/products")
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error("Error fetching data", error));
//   }, []);

//   const isFavorite = (productId: string) => {
//     return favorites.includes(productId);
//   };

//   const toggleFavorite = (productId: string) => {
//     if (isFavorite(productId)) {
//       setFavorites(favorites.filter((id) => id !== productId));
//     } else {
//       setFavorites([...favorites, productId]);
//     }
//   };


//   const handleBuyNow = () => {
//     history.push('./checkout'); 
//  };

//   return (
//     <>
//       {!isLoggedIn && <Redirect to="/login" />}{" "}
//       {/* Redirect to login page if not logged in */}
//       <Box className="box-outer">
//         {data.map((product) => (
//           <Box
//             key={product.id}
//             sx={{ width: { xs: "100%", md: "33%", lg: "25%" }, p: 2 }}
//             className="product-box"
//           >
//             <img
//               src={product.product_img}
//               className="img-fluid product-thumbnail"
//             />
//             <Box display={"flex"}>
//               <IconButton
//                 aria-label="wishlist"
//                 onClick={() => toggleFavorite(product.id)}
//               >
//                 <FavoriteIcon
//                   style={{
//                     color: isFavorite(product.id)
//                       ? "#da1919"
//                       : "floralwhite",
//                   }}
//                 />
//               </IconButton>
//             </Box>
//             <h3 className="product-title ">{product.product_name}</h3>
//             <strong className="product-price">{product.product_price}</strong>
//             <h6 className="product-title">Free Delivery</h6>
//             <Button
//               variant="contained"
//               className="button-style "
//               style={{ background: "#3b5d50" }}
//               onClick={() => handleBuyNow()}
//             >
//               Buy Now
//             </Button>
//           </Box>
//         ))}
//       </Box>
//     </>
//   );
// };
// export default Products;
import { useState, useEffect,useRef } from "react";
import { NavLink } from "react-router-dom";
// import {NavLink} from "react-router-dom"

interface product{
    id: string;
  product_img: string;
  product_name: string;
  product_price: string;
  category:string
}
export default function Products() {
  const [data, setData] = useState<product[]>([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true);
  
  useEffect(() => {
    try {
      const getProducts = async () => {
        setLoading(true);
        const response = await fetch("https://640999c16ecd4f9e18b55aaf.mockapi.io/api/e-com/products");
        if (componentMounted) {
          setData(await response.clone().json());
          setFilter(await response.json());
          setLoading(false);
          // console.log(filter);
        }
        return () => {
          componentMounted.current = false;
        };
      };
      getProducts();
    } catch (error) {
      console.error(error);
    }
  }, []);
  

  const Loading = () => {
    return <>Loading...</>;
  };

  const filterProduct =(cata:any) =>{
    const updatedList =data.filter((x)=>x.category === cata);
    setFilter(updatedList);

  }
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
          <button className="btn btn-outline-dark me-2"  onClick={()=>filterProduct("category 1")}>Dining Set</button>
          <button className="btn btn-outline-dark me-2"  onClick={()=>filterProduct("category 2")}>
           Tables
          </button>
          <button className="btn btn-outline-dark me-2"  onClick={()=>filterProduct("category 3")}>Bedroom sets</button>
          <button className="btn btn-outline-dark me-2"  onClick={()=>filterProduct("category 4")}>Chairs</button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={product.id}>
                  <img src={product. product_img} className="card-img-top"  height="200px"/>
                  <div className="card-body">
                    <h5 className="card-title mb-0">{product.product_name}</h5>
                    <p className="card-text lead fw-bold">
                     Rs {product.product_price}
                    </p>
                    <p className="card-text lead">
                     Free Delivery
                    </p>
                    <NavLink to={'/checkout'} className="btn btn-outline-dark">
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
          <h1 className="display-6 fw-bolder text-center" style={{color: "#3b5d50"}}>Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}


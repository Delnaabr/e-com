import { useEffect, useState } from "react";
import { userDetail } from "../../utils/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import "./customers.css";
import { productDetail } from "../../utils/utils";

interface adminProduct {
  id: string;
  product_img: string;
  product_name: string;
  product_price: string;
  product_stock: string;
}

const AdminProducts = () => {
  const [productsDetails, setProductsDetails] = useState<adminProduct[]>([]);

  useEffect(() => {
    fetch(productDetail)
      .then((response) => response.json())
      .then((data: adminProduct[]) => setProductsDetails(data))
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <TableContainer className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Product Name</TableCell>
            <TableCell align="center">Product Price</TableCell>
            <TableCell align="center">Stock</TableCell>
            <TableCell align="center">Add Product</TableCell>
            <TableCell align="center">Remove Product</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsDetails?.map((products) => (
            <TableRow key={products.id}>
              <TableCell component="th" scope="row" align="center">
                <img
                  src={products.product_img}
                  className="product-image"
                  alt={products.product_name}
                />
              </TableCell>
              <TableCell align="center">{products.product_name}</TableCell>
              <TableCell align="center">{products.product_price}</TableCell>
              <TableCell align="center">{products.product_stock}</TableCell>
              <TableCell align="center">
                <Button className="delete-btn">Add/Edit</Button>
              </TableCell>
              <TableCell align="center">
                <Button className="delete-btn">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminProducts;

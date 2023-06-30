import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import "./customers.css";
import { getProducts } from "../../utils/utils";
import AddProductForm from "./addProduct";

interface adminProduct {
  id: string;
  product_img: string;
  product_name: string;
  product_price: string;
  product_stock: string;
}

const AdminProducts = () => {
  const [productsDetails, setProductsDetails] = useState<adminProduct[]>([]);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    fetch(getProducts)
      .then((response) => response.json())
      .then((data: adminProduct[]) => setProductsDetails(data))
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenForm(false)
  };

  const addProducts = () => {
    setOpenForm(true);
  };

  const handleDeleteProduct = (productId: string) => {
    const index = productsDetails.findIndex(
      (product) => product.id === productId
    );
    if (index !== -1) {
      const updatedProducts = [...productsDetails];
      updatedProducts.splice(index, 1);
      setProductsDetails(updatedProducts);
      setOpen(false);
    }
  };

  return openForm ? (
    <AddProductForm handleClose={handleClose} open={openForm}/>
  ) : (
    <>
      <></>
      <TableContainer className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Product Price</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Update Product</TableCell>
              <TableCell align="center">Remove Product</TableCell>
            </TableRow>
          </TableHead>
          <TableCell colSpan={6}>
            <Box className="buttons d-flex justify-content-center mb-3 pb-3">
              <Button
                className="btn btn-outline-dark me-2"
                onClick={() => addProducts()}
              >
                Add Products
              </Button>
            </Box>
          </TableCell>
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
                  <Button className="delete-btn">Edit</Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    className="delete-btn"
                    onClick={() => {
                      setSelectedProductId(products.id);
                      setOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                      {"Are you sure you want to delete the product?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button
                        onClick={() => handleDeleteProduct(selectedProductId)}
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default AdminProducts;

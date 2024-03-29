import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box
} from "@mui/material";
import "./customers.css";
import { getProducts } from "../../utils/utils";
import AddProductForm from "./addProduct";
import ConfirmationDialog from "../DialogConfirmation";
import { connect } from "react-redux";
import { FetchProductList ,deleteProduct} from "../../redux/Action";

interface adminProduct {
  id: string;
  product_img: string;
  product_name: string;
  product_price: string;
  product_stock: string;
  category: string;
}
interface AdminProductsProps {
  products: adminProduct[];
  fetchProductList: () => void;
}

const AdminProducts = ({ products, fetchProductList }: AdminProductsProps) => {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    fetchProductList(); 
  }, [fetchProductList]);

  const handleClose = () => {
    setOpen(false);
    setOpenForm(false);
  };

  const addProducts = () => {
    setOpenForm(true);
  };

  const handleDeleteProduct = (productId: string) => {
    fetch(`${getProducts}/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        deleteProduct(productId);
        setOpen(false);
        alert("Product deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  
  return openForm ? (
    <AddProductForm handleClose={handleClose} open={openForm} />
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
              <TableCell align="center">Catagory</TableCell>
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
            {products?.map((products) => (
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
                <TableCell align="center">{products.category}</TableCell>
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
                  <ConfirmationDialog
                    open={open}
                    confirmationMessage="Are you sure you want to delete this product ?"
                    onClose={handleClose}
                    onConfirm={() => handleDeleteProduct(selectedProductId)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);

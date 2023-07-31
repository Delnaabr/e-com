import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getProducts } from "../../utils/utils";
import { addNewProduct } from "../../redux/Action";
import { connect } from "react-redux";

const AddProductForm = (props: any) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(getProducts)
      .then((response) => response.json())
      .then((data) => {
        const uniqueCategories = Array.from(
          new Set(data.map((product: any) => product.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching product categories:", error);
      });
  }, []);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleAddProduct = () => {
    if (!selectedImage) {
      return;
    }
    const imageName = selectedImage.name;
    const newProduct = {
      product_img: `/assets/images/${imageName}`,
      product_name: productName,
      product_price: productPrice,
      category: productCategory,
      product_stock: parseInt(productQuantity),
    };

    props.addNewProduct(newProduct);
    alert("Product Added successfully");
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <Box className="checkout-outer-box">
        <Box className="textfield-box">
          <Typography className="typography-text-admin">
            Product Name
          </Typography>
          <TextField
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
        </Box>
        <Box className="textfield-box">
          <Typography className="typography-text-admin">
            Product Price
          </Typography>
          <TextField
            type="number"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
          />
        </Box>
        <Box className="textfield-box">
          <Typography className="typography-text-admin">Category</Typography>
          <Select
            className="select-menu-item"
            value={productCategory}
            onChange={(event: any) => setProductCategory(event.target.value)}
          >
            {categories.map((category: string) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box className="textfield-box">
          <Typography className="typography-text-admin">Quantity</Typography>
          <TextField
            type="number"
            value={productQuantity}
            onChange={(event) => setProductQuantity(event.target.value)}
          />
        </Box>

        <Box className="textfield-box">
          <Typography className="typography-text-admin">
            Product Image
          </Typography>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Box>
        <Box className="button-box">
          <Button
            onClick={handleAddProduct}
            variant="contained"
            className="button"
          >
            ADD PRODUCT
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

const mapStateToProps = (state: any) => {
  return {
    product: state.product,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewProduct: (productData: any) => dispatch(addNewProduct(productData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);

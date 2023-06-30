import { useState } from "react";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { getProducts } from "../../utils/utils";

const AddProductForm = (props: any) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

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

    fetch(getProducts, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Product added Successfully");
      })
      .catch((error) => {
        alert("Error adding product");
      });

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
          <TextField
            value={productCategory}
            onChange={(event) => setProductCategory(event.target.value)}
          />
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

export default AddProductForm;
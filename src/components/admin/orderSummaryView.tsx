import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { orderSummary } from "../../utils/utils";
import "./customers.css";

interface OrderView {
  id: string;
  firstName: string;
  email: string;
  address: string;
  product_img: string;
  product_name: string;
  product_price: number;
}

const OrderSummaryView = () => {
  const [orderData, setOrderData] = useState<OrderView[]>([]);

  useEffect(() => {
    fetch(orderSummary)
      .then((response) => response.json())
      .then((data) => {
        setOrderData(data);
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  }, []);

  return (
    <TableContainer className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Price</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData.length > 0 ? (
            orderData.map((feedback, index) => (
              <TableRow key={index}>
                <TableCell>
                  {" "}
                  <img
                    src={feedback.product_img}
                    className="card-img-top"
                    style={{ height: "100px", width: "auto" }}
                    alt={feedback.product_name}
                  />
                </TableCell>
                <TableCell>{feedback.product_name}</TableCell>
                <TableCell>{feedback.product_price}</TableCell>
                <TableCell>{feedback.firstName}</TableCell>
                <TableCell>{feedback.email}</TableCell>
                <TableCell>{feedback.address}</TableCell>
                <TableCell className="status-cell">
                  Ready for shipping
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell colSpan={7} align="center">No Orders to Display</TableCell>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderSummaryView;

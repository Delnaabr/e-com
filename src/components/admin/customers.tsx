import { useEffect, useState } from "react";
import { RegisteredUserDetail } from "../../utils/utils";
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

interface Customer {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  confirmPassword: string;
  phone: string;
  blocked?: boolean; 
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch(RegisteredUserDetail)
      .then((response) => response.json())
      .then((data: Customer[]) => setCustomers(data))
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const handleBlock = (customerId: string) => {
    const updatedCustomers = customers.map((customer) => {
      if (customer.id === customerId) {
        return { ...customer, blocked: true };
      }
      return customer;
    });
    setCustomers(updatedCustomers);
  };

  return (
    <TableContainer className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Remove User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers?.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell component="th" scope="row">
                {customer.email}
              </TableCell>
              <TableCell align="right">{customer.firstname}</TableCell>
              <TableCell align="right">{customer.lastname}</TableCell>
              <TableCell align="right">{customer.phone}</TableCell>
              <TableCell align="right">
                {!customer.blocked ? (
                  <Button
                    className="delete-btn"
                    color="error"
                    onClick={() => handleBlock(customer.id)}
                  >
                    Block
                  </Button>
                ) : (
                  "Blocked"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Customers;

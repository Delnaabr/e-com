import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getFeedback } from "../../utils/utils";

interface AdminFeedback {
  id: string;
  name: string;
  email: string;
  query: string;
}

const FeedBackView = () => {
  const [feedbackData, setFeedbackData] = useState<AdminFeedback[]>([]);
  
  useEffect(() => {
    fetch(getFeedback)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data);
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
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackData.map((feedback, index) => (
              <TableRow key={index}>
                <TableCell>{feedback.name}</TableCell>
                <TableCell align="center">{feedback.email}</TableCell>
                <TableCell align="center">{feedback.query}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default FeedBackView;

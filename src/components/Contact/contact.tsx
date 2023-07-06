import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import "./contact.css";
import { getFeedback } from "../../utils/utils";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const feedbackData = {
      name: name,
      email: email,
      query: query,
    };

    fetch(getFeedback, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Feedback submitted successfully");
        setName("");
        setEmail("");
        setQuery("");
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };

  return (
    <Box className="box-outer">
      <Box className="product-section">
        <Box className="container">
          <Box className="col-lg-8">
            <Box className="subscription-form">
              <h3 className="d-flex align-items-center">
                <span className="me-1">
                  <img
                    src="assets/images/envelope-outline.svg"
                    alt=""
                    className="img-fluid"
                  />
                </span>
                <span>Deliver Your Queries...</span>
              </h3>

              <form className="row g-3">
                <Box>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Box>
                <Box>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Box>
                <Box>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Query"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    required
                  />
                </Box>
                <Box className="col-auto">
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!name || !email || !query}
                  >
                    <FontAwesomeIcon icon={faTelegramPlane} />
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

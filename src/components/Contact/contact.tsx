import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import './contact.css'

export default function Contact() {
  return (
    <Box className='box-outer'>
      <Box className="product-section">
        <Box className="container">
          <Box className="col-lg-8">
            <Box className="subscription-form">
              <h3 className="d-flex align-items-center">
                <span className="me-1">
                  <img
                    src="assets/images/envelope-outline.svg"
                    alt="Image"
                    className="img-fluid"
                  />
                </span>
                <span>Deliver Your Queries...</span>
              </h3>

              <form action="#" className="row g-3">
                <Box >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </Box>
                <Box >
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </Box>
                <Box >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your Query"
                  />
                </Box>
                <Box className="col-auto">
                  <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faTelegramPlane} />
                  </button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
      </Box>
  );
}

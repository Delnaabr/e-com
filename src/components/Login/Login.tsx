import { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { RegisteredUserDetail } from "../../utils/utils";
import "./login.css";

const Login = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSignUpClick = () => {
    history.push("/register");
  };

  const handleFormSubmit = (event:any) => {
    event.preventDefault();
  
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin";
  
    if (
      userDetails.email === adminEmail &&
      userDetails.password === adminPassword
    ) {
      alert("Admin login successful");
      localStorage.setItem("userRole", "ADMIN");
      history.push("/admin");
      setUserDetails({ email: "", password: "" });
    } else {
      fetch(RegisteredUserDetail)
        .then((response) => response.json())
        .then((data) => {
          const user = data.find(
            (item:any) =>
              item.email === userDetails.email &&
              item.password === userDetails.password
          );
          if (user) {
            alert("Login successful");
            localStorage.setItem("userRole", "USER");
            history.push("/products");
            setUserDetails({ email: "", password: "" });
          } else {
            setLoginStatus("error");
          }
        })
        .catch((error) => {
          console.error("Error fetching data", error);
        });
    }
  };
  
  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Box className="main-box">
        <Typography className="typography-text" gutterBottom variant="h5">
          Login Here...
        </Typography>

        <Grid className="grid-main">
          <TextField
            className="grid-textfield"
            type="text"
            variant="filled"
            required
            label="Email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
          <TextField
            className="grid-textfield"
            type={showPassword ? "text" : "password"}
            variant="filled"
            required
            label="Password"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handlePasswordVisibilityToggle}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            className="grid-textfield-btn"
            sx={{ background: "#3b5d50" }}
            onClick={(e)=>{handleFormSubmit(e)}}
          >
            Login
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ background: "#3b5d50" }}
            className="grid-textfield-btn"
            onClick={handleSignUpClick}
          >
            New User
          </Button>

          {loginStatus === "error" && (
            <Typography color="red">Incorrect username or password.</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};
export const Admin = () => localStorage.getItem("userRole") === "ADMIN";
export default Login;

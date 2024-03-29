import { useEffect, useState } from "react";
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
import { connect } from "react-redux";
import { fetchUserList, userLogin } from "../../redux/Action";


// interface UserDetails {
//   id: string;
//   email: string;
//   password: string;
// }

interface UserListProps {
  fetchUserList: () => void;
  userLogin: (userDetails: any) => void;
}
const Login = ({ fetchUserList, userLogin }: UserListProps) => {
  const [loginStatus, setLoginStatus] = useState("");
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    Id: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  const handleSignUpClick = () => {
    history.push("/register");
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin";

    if (
      userDetails.email === adminEmail &&
      userDetails.password === adminPassword
    ) {
      alert("Admin login successful");
      localStorage.setItem("userRole", "ADMIN");
      history.push("/home");
      window.location.reload();
      setUserDetails({ email: "", password: "", Id: "" });
    } else {
      fetch(RegisteredUserDetail)
        .then((response) => response.json())
        .then((data) => {
          const user = data.find(
            (item: any) =>
              item.email === userDetails.email &&
              item.password === userDetails.password
          );

          if (user) {
            alert("Login successful");
            localStorage.setItem("userRole", "USER");
            localStorage.setItem("userEmail", userDetails.email);
            localStorage.setItem("userId", user.id);
            history.push("/products");
            setUserDetails({ email: "", password: "", Id: "" });
            userLogin(user)
            // window.location.reload();
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
            placeholder="Enter your email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
          <TextField
            className="grid-textfield"
            type={showPassword ? "text" : "password"}
            variant="filled"
            required
            placeholder="Password"
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
            onClick={(e) => {
              handleFormSubmit(e);
            }}
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
const mapStateToProps = (state: any) => {
  return {
   user: state,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUserList: () => dispatch(fetchUserList()),
    userLogin: (userDetails:any) => dispatch(userLogin(userDetails)),
  };
};

export const Admin = () => localStorage.getItem("userRole") === "ADMIN";
export default connect(mapStateToProps, mapDispatchToProps)(Login);

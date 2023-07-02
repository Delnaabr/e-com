import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/content";
import Login from "./components/Login/Login";
import { Switch } from "react-router";
import Register from "./components/Register/Register";
import products from "./components/Products/products";
import Contact from "./components/Contact/contact";
import Customers from "./components/admin/customers";
import AdminProducts from "./components/admin/adminProduct";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import FeedBackView from "./components/admin/feedBackView";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/adminProducts" render={() => <AdminProducts />} />
          <Route path="/customers" render={() => <Customers />} />
          <Route exact path="/home" render={() => <Content />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/register" render={() => <Register />} />
          <Route path="/products" component={products} />
          <Route path="/cart" component={Cart}  />
          <Route path="/checkout" component={Checkout}  />
          <Route path="/contactUs" render={() => <Contact />} />
          <Route path="/admin-feedback" render={() => <FeedBackView/>} />

          {/* <Route path ='/logout' component={} /> */}
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

const Checkout = () => {
  return (
    <div className="container">
      <div className="py-5 text-center">
        <h2>Checkout form</h2>
      </div>
      <div className="row">
        <div className="order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value=""
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value=""
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username">Username</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  Email <span className="text-muted"></span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="zip">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder=""
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="zip">State</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    placeholder=""
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    checked
                    required
                  />
                  <label className="custom-control-label"  style={{fontWeight: "bold"}}>
                    Credit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                  />
                  <label className="custom-control-label"  style={{fontWeight: "bold"}}>
                    Cash on delivery
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-4"
                >
                  Continue to checkout
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Checkout;

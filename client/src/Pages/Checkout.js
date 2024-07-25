import React, { useEffect, useState } from "react";
import AppLayout from "../Compo/AppLayout/AppLayout";
import { useAuth } from "../Context/auth";
import { useCart } from "../Context/cart";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("");
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const { cart, setCart, removeFromCart } = useCart();
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div
        className="col-md-12 cart-summary"
        style={{ textAlign: "center", marginTop: "40px" }}
      >
        <h2>Cart Summary</h2>
        <p>Total | Checkout | Payment</p>
        <hr />
        <h4>Total: {totalPrice()} </h4>
        {auth?.user?.address ? (
          <>
            <div className="mb-3">
              <h4>Current Address</h4>
              <h5>{auth?.user?.address}</h5>
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            </div>
          </>
        ) : (
          <div className="mb-3 " style={{ width: "50%" }}>
            {auth?.token ? (
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            ) : (
              <button
                className="btn btn-outline-warning"
                onClick={() =>
                  navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Please Login to checkout
              </button>
            )}
          </div>
        )}

        <div
          className="mt-2 "
          style={{ textAlign: "center", margin: "0px 30% 0px 36%" }}
        >
          {!clientToken || !auth?.token || !cart?.length ? (
            ""
          ) : (
            <>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />

              <button
                className="btn btn-primary"
                onClick={handlePayment}
                disabled={loading || !instance || !auth?.user?.address}
              >
                {loading ? "Processing ...." : "Make Payment"}
              </button>
            </>
          )}
        </div>
      </div>
      ;
    </AppLayout>
  );
};

export default Checkout;

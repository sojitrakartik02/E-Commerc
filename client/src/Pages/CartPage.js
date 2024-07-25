import React, { useState, useEffect } from "react";
import Layout from "../Compo/AppLayout/AppLayout.js";
import { useCart } from "../Context/cart.js";
import { useAuth } from "../Context/auth.js";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../style/CartStyles.css";
import { Button } from "antd";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const { cart, setCart, removeFromCart } = useCart();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price considering the quantity of each item
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

  // Get payment gateway token

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row conainer">
          <div className="col-md-12 p-0">
            <h1 className="text-center bg-light mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div
            className="row "
            style={{ justifyContent: "center", marginTop: "20px" }}
          >
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div
                  className="row card flex-row"
                  style={{ marginBottom: "20px !important" }}
                  key={p._id}
                >
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p style={{ marginBottom: ".75em" }}>Name:{p.name}</p>
                    <p style={{ marginBottom: ".75em" }}>
                      Description:{p?.description?.substring(0, 30)}
                    </p>
                    <p style={{ marginBottom: ".75em" }}>Price : {p.price}</p>
                    <p style={{ marginBottom: ".75em" }}>
                      Quantity: {p.quantity}
                    </p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-primary "
                      onClick={() => increaseQuantity(p._id)}
                      style={{ fontSize: "15px", padding: "3px 8px" }}
                    >
                      +
                    </button>

                    <button
                      style={{ margin: "0px 10px" }}
                      className="btn btn-danger"
                      onClick={() => removeFromCart(p._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-secondary "
                      onClick={() => decreaseQuantity(p._id)}
                      style={{ fontSize: "15px", padding: "3px 8px" }}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3 className="text-center">Total Price: {totalPrice()}</h3>
          <div
            style={{
              textAlign: "center",
              margin: "20px 0px",
            }}
          >
            <Button onClick={() => navigate("/checkout")} className="button">
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

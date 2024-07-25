import React, { useEffect, useState } from "react";
import AppLayout from "../Compo/AppLayout/AppLayout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/cart";
import toast from "react-hot-toast";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [similerProducts, setSimilerProducts] = useState([]);
  const { cart, setCart, addToCart } = useCart();

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      if (data.success) {
        setProduct(data.product);
        getSimilerProducts(data?.product._id, data?.product.category._id);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log("Error fetching product:", error);
      setError("Error fetching product details");
    }
  };

  const getSimilerProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/similer-product/${pid}/${cid}`
      );
      setSimilerProducts(Array.isArray(data?.products) ? data.products : []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <>
          <div className="row container mt-2">
            <div className="col-md-6">
              {product._id && (
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                  height="300"
                  width={"300px"}
                />
              )}
            </div>
            <div className="col-md-6">
              <h1 className="text-center">Product Details</h1>
              <h6>Name: {product.name || "Loading..."}</h6>
              <h6>Description: {product.description || "Loading..."}</h6>
              <h6>Price: ${product.price || "Loading..."}</h6>
              {product.category && (
                <h6>Category: {product?.category?.name || "Loading..."}</h6>
              )}
              <button
                className="btn btn-secondary ms-1"
                onClick={() => {
                  addToCart(product);
                  toast.success("Item Added to Cart");
                }}
              >
                ADD TO CART
              </button>
            </div>
          </div>
          <hr />
          <div className="row">
            <h5>Similar Products</h5>
            {similerProducts.length < 1 && (
              <p className="text-center">No Similar Products Found</p>
            )}
            <div className="d-flex flex-wrap">
              {similerProducts.length > 0 &&
                similerProducts.map((p) => (
                  <div
                    className="card m-2"
                    style={{ width: "18rem" }}
                    key={p._id}
                  >
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 20)}
                      </p>
                      <p className="card-text">${p.price}</p>
                      <button
                        className="btn btn-secondary ms-1"
                        onClick={() => {
                          addToCart(p);
                          toast.success("Item Added to Cart");
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default ProductDetails;

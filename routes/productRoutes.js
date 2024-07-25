import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlerware.js";
import {
  createProductController,
  braintreePaymentController,
  braintreeTokenController,
  productCategoryController,
  similerProductController,
  searchController,
  productListContro,
  productCountController,
  productFilter,
  deletProduct,
  getProductController,
  updateProductController,
  productPhotoController,
  getSingleProductController,
} from "../Controllers/productController.js";
import fromidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  fromidable(),
  createProductController
);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  fromidable(),
  updateProductController
);

router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deletProduct);

router.post("/product-filter", productFilter);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListContro);

router.get("/search/:keyword", searchController);

router.get("/similer-product/:pid/:cid", similerProductController);

router.get("/product-category/:slug", productCategoryController);

router.get("/braintree/token", braintreeTokenController);

router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;

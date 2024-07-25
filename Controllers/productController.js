import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import mongoose from "mongoose";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
console.log("Braintree Merchant ID:", process.env.BRAINTREE_MERCHANT_ID);
console.log("Braintree Public Key:", process.env.BRAINTREE_PUBLIC_KEY);
console.log("Braintree Private Key:", process.env.BRAINTREE_PRIVATE_KEY);

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, category, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
      case !shipping:
        return res.status(400).send({ error: "Shipping is required" });
    }

    let categoryId;
    if (mongoose.Types.ObjectId.isValid(category)) {
      categoryId = new mongoose.Types.ObjectId(category);
    } else {
      return res.status(400).send({ error: "Invalid category ID" });
    }

    const shippingBoolean = shipping.toLowerCase() === "true";

    const products = new productModel({
      ...req.fields,
      category: categoryId,
      shipping: shippingBoolean,
      slug: slugify(name),
    });

    if (photo) {
      if (photo.size > 1000000) {
        return res
          .status(400)
          .send({ error: "Photo size should be less than 1MB" });
      }
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      success: true,

      message: "Product created successfully",
      products,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in creating product",
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(201).send({
      success: true,
      message: "All Product",
      products,
      countTotal: products.length,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in geting product",
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      success: true,
      message: "All Product",
      product,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in geting Single product",
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    console.log("Request Params:", req.params);

    const { pid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Product ID format",
      });
    }

    console.log("Product ID from request params:", pid);

    const product = await productModel.findById(pid).select("photo");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    if (product.photo && product.photo.data) {
      res.set(
        "Content-Type",
        product.photo.contentType || "application/octet-stream"
      );
      res.send(product.photo.data);
    } else {
      res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in getting photo",
    });
  }
};

export const deletProduct = async (req, res) => {
  try {
    const id = req.params.pid;
    await productModel.findByIdAndDelete(id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Deleted Succesfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in Deleting",
    });
  }
};
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .json({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).json({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

export const productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Products counting",
      error,
    });
  }
};
export const productListContro = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? parseInt(req.params.page) : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Per page Controller",
      error,
    });
  }
};

export const searchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Searching",
      error,
    });
  }
};

export const similerProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Similer Product",
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const product = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in  Product category",
      error,
    });
  }
};
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        console.log("Error generating client token:", err);
        return res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log("Error in token controller:", error);
    res.status(500).send(error);
  }
};
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    console.log("Processing payment for amount:", total.toFixed(2));

    gateway.transaction.sale(
      {
        amount: total.toFixed(2),
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (error) {
          console.log("Error processing transaction:", error);
          return res.status(500).send(error);
        } else {
          try {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
              status: "Paid",
            });
            await order.save();
            res.json({ ok: true });
          } catch (saveError) {
            console.log("Error saving order:", saveError);
            res.status(500).send(saveError);
          }
        }
      }
    );
  } catch (error) {
    console.log("Error in payment controller:", error);
    res.status(500).send(error);
  }
};

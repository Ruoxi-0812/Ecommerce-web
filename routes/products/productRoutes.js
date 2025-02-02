const express = require("express");
const userAuth = require("../../middleware/auth/Auth.js");
const {
  createProduct,
  fetchAllProducts,
  fetchFreeProd,
  fetchPaidProd,
  fetchTiktokProd,
  fetchGoogleProd,
  fetchFacebookProd,
  fetchSingleProd,
  fetchSingleProdFree,
  updateProduct,
  deleteProductSingle,
  deleteAllProducts,
} = require("../../controllers/Products/productsController.js");
const upload = require("../../middleware/multer/multer.js");
const uploadMultipleCloudinary = require("../../middleware/upload/uploadMultiple.js");

const route = express.Router();
//routes

route.post(
  "/createProduct",
  userAuth,
  upload.array("images"),
  uploadMultipleCloudinary,
  createProduct
);
route.get("/fetchAllProducts", userAuth, fetchAllProducts);
route.get("/fetchFreeProducts", fetchFreeProd);
route.get("/fetchPaidProducts", userAuth, fetchPaidProd);
route.get("/fetchTiktokProducts", userAuth, fetchTiktokProd);
route.get("/fetchGoogleProducts", userAuth, fetchGoogleProd);
route.get("/fetchFacebookProducts", userAuth, fetchFacebookProd);
route.get("/fetchSingleProduct/:id", userAuth, fetchSingleProd);
route.get("/fetchSingleProductFree/:id",  fetchSingleProdFree);
route.put("/updateProduct/:id", userAuth, updateProduct);
route.delete("/deleteProduct/:id", userAuth, deleteProductSingle);
route.delete("/deleteAllProducts", userAuth, deleteAllProducts);
module.exports = route;
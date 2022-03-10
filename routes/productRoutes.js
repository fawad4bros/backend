const express = require("express");
const router = express.Router();
const {
  allproduct,
  product,
  addproduct,
  updateproduct,
  deleteproduct,
  getProductCategories,
  getProductsInCategory,
} = require("../controllers/productControllers");
router.get("/products", allproduct);
router.get("/product/:id", product);
router.post("/add", addproduct);
router.put("/update/:id", updateproduct);
router.delete("/delete/:id", deleteproduct);
router.get("/category/:category", getProductsInCategory);
router.get("/categories", getProductCategories);
module.exports = router;

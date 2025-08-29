import mongoose from "mongoose";
import { Product } from "../models/Products";
import productsJson from "../data/productsJson.json";

const connectDataBase = async () => {
  try {
    await mongoose.connect(
      process.env.URL_MONGO || "mongodb://localhost:27017/products"
    );
    await Product.deleteMany({});
    await Product.insertMany(productsJson);
    console.log("data base online");
  } catch (error) {
    console.error(error);
    throw new Error("Error conect data base");
  }
};

export default connectDataBase

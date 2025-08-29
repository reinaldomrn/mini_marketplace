
import { Schema, model } from "mongoose";
import schemaProduct from "../interface/schemaProduct.interface";

const productSchema = new Schema <schemaProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

export const Product = model("Product", productSchema);
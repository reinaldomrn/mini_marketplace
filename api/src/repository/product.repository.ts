import QueryParams from "../interface/QueryParams.interface";
import { Product } from "../models/Products";

class ProductRepository {
  private productModel;

  constructor() {
    this.productModel = Product;
  }

  async search(params: QueryParams) {
    try {
      const {
        search,
        sort = "id",
        order = "asc",
        page,
        limit,
        available,
      } = params;

      const objectFilter = { $regex: search, $options: "i" };
      const searchObject = {
        $or: [
          { name: objectFilter },
          ...(Number.isFinite(Number(search))
            ? [{ price: Number(search) }]
            : []),
        ],
      };
      const availableObject = { isAvailable: available };

      let filters = {};
      if (search && available) {
        filters = { $and: [{ ...availableObject }, { ...searchObject }] };
      } else {
        if (search && !available) {
          filters = { ...searchObject };
        }
        if (!search && available) {
          filters = { ...availableObject };
        }
      }
      const orderObject = {
        [sort]: order,
      };
      const totalRows = await this.productModel.countDocuments(filters)
      const numPage = page ?? 1;
      const maxRow = limit ?? 3
      const totalPage = Math.ceil(totalRows / maxRow);
      const query = await this.productModel
        .find(filters)
        .sort(orderObject)
        .skip((numPage - 1) * maxRow)
        .limit(maxRow);
      return { products: [...query], page: numPage, limit: maxRow, totalPage };
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  async getById(idProduct: string) {
    try {
      return await this.productModel.find({id: idProduct})
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  }

}

export default new ProductRepository();
interface QueryParams {
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
  available?: boolean;
}

export default QueryParams

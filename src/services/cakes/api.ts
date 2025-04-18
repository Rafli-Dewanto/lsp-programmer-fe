import { apiResolver, MetaData, Response } from "@/utils/api";
import axios from "../axios";
import { Cake, CakesQueryParams } from "./types";

export function getCakes(params: CakesQueryParams) {
  return apiResolver<Response<Cake[], MetaData>>(() =>
    axios.get("/cakes", {
      params: {
        page: params.page || 1,
        title: params.title,
        price: params.price,
        category: params.category,
      },
    })
  );
}

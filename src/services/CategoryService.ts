import type { ApiResponse } from "@/models/ApiResponse";
import request from "./index";
import type { AxiosResponse } from "axios";
import type { CategoryResponseModel } from "@/models/response/CategoryResponseModel";

const path = "/category";

class GetCategoryService {
  async getCategories(idUser: number): Promise<AxiosResponse<ApiResponse<CategoryResponseModel[]>>> {
    return await request<CategoryResponseModel[]>("GET", path + `/getCategories?idUser=${idUser}`);
  }
}

export default { GetCategoryService };

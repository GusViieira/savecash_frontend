import type { ApiResponse } from "@/models/ApiResponse";
import request from "./index";
import type AccountResponseModel from "@/models/response/AccountResponseModel";
import type { AxiosResponse } from "axios";

const path = "/account";

class AccountService {
  async getAccounts(idUser: number): Promise<AxiosResponse<ApiResponse<AccountResponseModel[]>>> {
    return await request<AccountResponseModel[]>("GET", `${path}/accounts?idUser=${idUser}`);
  }
}

export default { AccountService }

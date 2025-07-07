import type { ApiResponse } from "@/models/ApiResponse"
import request from './index'
import type { AxiosResponse } from "axios"
import type { TransactionResponseModel } from "@/models/response/TransactionResponseModel"

const path = '/transactions'

class Transactions {
  async createTransaction<T extends object>(transaction: T): Promise<AxiosResponse<ApiResponse<string>>> {
    return await request<string>('POST', path + '/create', transaction)
  }

  async getTransaction(id: number, aba: number): Promise<AxiosResponse<ApiResponse<TransactionResponseModel[]>>> {
    return await request<TransactionResponseModel[]>('GET', path + `/get-transactions?idUser=${id}&month=${aba}`)
  }

  /*async updateTransaction<T extends object>(
    transaction: T,
  ): Promise<AxiosResponse<ApiResponse<TransactionResponseModel>>> {
    return await request<TransactionResponseModel>('PUT', path + '/update', transaction)
  }

  async deleteTransaction(id: number): Promise<AxiosResponse<ApiResponse<string>>> {
    return await request<string>('DELETE', path + `/delete?idTransaction=${id}`)
  }*/
}

export default { Transactions }

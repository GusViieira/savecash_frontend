import type { ApiResponse } from "@/models/ApiResponse"
import request from './index'
import type { AxiosResponse } from "axios"
import type { TransactionResponseModel } from "@/models/response/TransactionResponseModel"
import type { UpdateTransactionRequestModel } from "@/models/request/UpdateTransactionRequestModel"

const path = '/transactions'

class Transactions {
  async createTransaction<T extends object>(transaction: T): Promise<AxiosResponse<ApiResponse<string>>> {
    return await request<string>('POST', path + '/create', transaction)
  }

  async getTransaction(id: number, idAccount: number, aba: number, page: number, size: number): Promise<AxiosResponse<ApiResponse<TransactionResponseModel>>> {
    return await request<TransactionResponseModel>('GET', path + `/transactions?idAccount=${idAccount}&month=${aba}&page=${page}&size=${size}`)
  }

  async updateTransaction<T extends object>(
    transaction: T,
  ): Promise<AxiosResponse<ApiResponse<UpdateTransactionRequestModel>>> {
    return await request<UpdateTransactionRequestModel>('PUT', path + '/update', transaction)
  }

  async deleteTransaction(id: number): Promise<AxiosResponse<ApiResponse<string>>> {
    return await request<string>('DELETE', path + `/delete?idTransaction=${id}`)
  }
}

export default { Transactions }

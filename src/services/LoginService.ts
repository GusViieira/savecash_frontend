import request from './index'
import type { AxiosResponse } from 'axios'
import type { LoginResponseModel } from '../models/response/LoginResponseModel'

interface ApiResponse<T> {
  content?: T | null
  errors?: { message: string }[] | null
}

export default class LoginService {
  async login<T extends object>(login: T): Promise<AxiosResponse<ApiResponse<LoginResponseModel>>> {
    return await request<LoginResponseModel>('POST', '/login', login)
  }
}

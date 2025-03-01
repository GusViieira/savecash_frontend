import type { ApiResponse } from '@/models/ApiResponse'
import request from './index'
import type { AxiosResponse } from 'axios'

const path = '/user'

export default class RegisterUserService {
  async register<T extends object>(user: T): Promise<AxiosResponse<ApiResponse<string>>> {
    return await request<string>('POST', path + '/register', user)
  }
}

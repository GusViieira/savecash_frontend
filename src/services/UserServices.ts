import type { ApiResponse } from '@/models/ApiResponse'
import request from './index'
import type { AxiosResponse } from 'axios'
import type { UserResponseModel } from '@/models/response/UserResponseModel'

const path = '/user'

class RegisterUserService {
  async registerUser<T extends object>(user: T): Promise<AxiosResponse<ApiResponse<string>>> {
    return await request<string>('POST', path + '/register', user)
  }
}

class GetUserService {
  async getUser(id: number): Promise<AxiosResponse<ApiResponse<UserResponseModel>>> {
    return await request<UserResponseModel>('GET', path + `/getUser?idUser=${id}`)
  }
}

class UpdateUserService {
  async updateUser<T extends object>(
    user: T,
  ): Promise<AxiosResponse<ApiResponse<UserResponseModel>>> {
    return await request<UserResponseModel>('PUT', path + '/update', user)
  }
}

export default { RegisterUserService, GetUserService, UpdateUserService }

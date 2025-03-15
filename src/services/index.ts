import { AxiosError, type AxiosResponse } from 'axios'
import api from '@/utils/request'
import type { ApiResponse } from '@/models/ApiResponse'

async function request<T>(
  method: string,
  url: string,
  data?: object,
): Promise<AxiosResponse<ApiResponse<T>>> {
  try {
    return await api.request<ApiResponse<T>>({
      method,
      url,
      data,
    })
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return error.response // ✅ Retorna o erro da API corretamente
    }

    throw new Error('Ocorreu um erro inesperado. Tente novamente mais tarde.')
  }
}

export default request

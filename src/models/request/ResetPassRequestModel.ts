export interface ResetPassRequestModel {
  idUser: number
  email: string
  code: number
  password: string
}

export interface ResetPassModel {
  email: string
  password: string
}

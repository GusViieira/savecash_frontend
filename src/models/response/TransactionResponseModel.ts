export interface TransactionResponseModel {
  expense: number
  finalBalance: number
  revenue: number
  page: number
  size: number
  totalPage: number
  transactionDTO: TransactionDTO[]
}


export interface TransactionDTO {
  id: number
  type: number
  description: string
  idCategory: number
  categoryDescription: string
  date: string
  value: number
  anotation: string
  status: string
  note: string
  idUser: number
  isRecurrent: string
  loading?: boolean
}

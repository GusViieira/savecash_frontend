export interface TransactionResponseModel {
  expense: number
  revenue: number
  expensePaid: number
  revenuePaid: number
  finalBalance: number
  atualBalance: number
  predictedBalance: number
  page: number
  size: number
  totalPage: number
  transactions: Transactions[]
}


export interface Transactions {
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
  idAccount: number
}

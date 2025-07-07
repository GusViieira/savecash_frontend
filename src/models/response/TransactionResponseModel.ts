export interface TransactionResponseModel {
  expense: number
  finalBalance: number
  revenue: number
  transactionDTO: TransactionDTO[]
}

interface TransactionDTO {
  type: string
  description: string
  category: string
  date: string
  value: number
  anotation: string
  status: string
  note: string
}

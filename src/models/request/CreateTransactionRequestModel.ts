export interface CreateTransactionRequestModel {
    type: number
    value: number
    description: string
    date: string
    idUser: number
    idCategory: number
    status: string
    isRecurrent: string
    note?: string
    idAccount: number
}

export interface UpdateTransactionRequestModel {
    id: number
    type: number
    value: number
    description: string
    date: string
    idUser: number
    idCategory: number
    categoryDescription: string
    status: string
    isRecurrent: string
    note?: string
}

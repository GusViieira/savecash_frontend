export interface ApiResponse<T> {
  content: T // Deixar opcional, caso a API retorne direto os dados
  errors?: { message: string }[]
}

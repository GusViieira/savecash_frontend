export interface ApiResponse<T> {
  content?: T | null
  errors?: { message: string }[] | null
}

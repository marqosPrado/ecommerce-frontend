export type ApiResponse<T> = {
  success: boolean,
  message: string,
  data: T,
  error?: ErrorDetails,
  timestamp: string
}

type ErrorDetails = {
  code: string,
  details: Map<string, string>
}

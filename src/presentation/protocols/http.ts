export interface HttpResponse{
  statusCode: number
  body: any
}

export interface HttpRequest{
  body?: any // interrogação é para deixar opcional
}

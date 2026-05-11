export class AppError extends Error {
  public readonly statusCode: number

  constructor(message:string, statuCode = 400){
    super(message)
    this.statusCode = statuCode
    this.name = 'AppError'
  }
}
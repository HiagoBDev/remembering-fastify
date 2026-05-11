import bcrypt from 'bcryptjs'
import { createUser, getUserByEmail } from "../repositories/auth-repository";
import { LoginDTO, RegisterDTO } from "../schemas/auth-schema";
import { AppError } from "../utils/app-error";
import { FastifyInstance } from 'fastify';


export async function registerService(data: RegisterDTO) {
  const existingUser = await getUserByEmail(data.email)

  if(existingUser){
    throw new AppError("Email já cadastrado", 409)
  }

  const hashedPassword = await bcrypt.hash(data.password, 8)

  const user = await createUser({...data, password: hashedPassword})

  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}

export async function loginService(data:LoginDTO, app: FastifyInstance) {
  const user = await getUserByEmail(data.email)

  if(!user) {
    throw new AppError("Credenciais inválidas", 401)
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password)

  if (!passwordMatch) {
    throw new AppError("Credenciais inválidas", 401)
  }

  const token = app.jwt.sign(
    { sub: user.id },
    { expiresIn: '7d' }
  )
  return { token }
}
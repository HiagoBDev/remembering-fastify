import 'dotenv/config'
import { env } from './lib/env'
import { app } from './app'

app.listen({
  port: env.PORT,
  host: '0.0.0.0',
}).then(() => {
  console.log(`🚀 Server rodando na porta ${env.PORT}`)
})
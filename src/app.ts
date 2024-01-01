import dotenv from 'dotenv'
dotenv.config()
import FirebaseDatabase from './database/firebase'
import firebaseConfig from './database/firebaseConfig'
import RouterInitializer from './route/index'

const main = async () => {
  try {
    // === Conexão com o banco de dados (firebase) ===
    const db = FirebaseDatabase.getDatabaseConnection(firebaseConfig)

    // === Start API Server ===
    const server = RouterInitializer.initializeRoutes(db)
    server.listen(3000, () => console.log('Example app listening on port 3000!'))
  } catch (e) {
    console.error(e)
  }
}

main()

import dotenv from 'dotenv'
import FirebaseDatabase from './database/firebase'
import firebaseConfig from './database/firebaseConfig'
import RouterInitializer from './route/index'
dotenv.config()

const main = async () => {
  try {
    // === Conexão com o banco de dados (firebase) ===
    const firebaseDatabase = new FirebaseDatabase()
    const db = firebaseDatabase.getDatabaseConnection(firebaseConfig)

    // === Start API Server ===
    const route = new RouterInitializer()
    const server = route.initializeRoutes(db)
    server.listen(3000, () => console.log('Example app listening on port 3000!'))
  } catch (e) {
    console.error(e)
  }
}

main()

require('dotenv').config()
const FirebaseDatabase = require('./src/database/firebase')
const firebaseConfig = require('./src/database/firebaseConfig')
const Router = require('./src/route')

const main = async () => {
  try {
    // === Conexão com o banco de dados (firebase) ===
    const firebaseDatabase = new FirebaseDatabase()
    const db = firebaseDatabase.getDatabaseConnection(firebaseConfig)

    // === Start API Server ===
    const route = new Router()
    const server = route.initializeRoutes(db)
    server.listen(3000, () => console.log('Example app listening on port 3000!'))
  } catch (e) {
    console.error(e)
  }
}

main()

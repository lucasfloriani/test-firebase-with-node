import { ErrorHandler } from '../middleware/error'
import { UserFilter } from '../dto/user'
import User from '../models/user'

class UserDAO {
  private db: firebase.firestore.CollectionReference<User>

  constructor(db: firebase.firestore.Firestore) {
    this.db = db.collection('users').withConverter(this.converter())
  }

  converter() {
    return {
      toFirestore: (user: User): firebase.firestore.DocumentData => ({
        id: user.id,
        name: user.name,
        address: user.address,
        password: user.password,
        email: user.email,
      }),
      fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): User {
        const data = snapshot.data(options)!
        const user = new User({
          name: data.name,
          address: data.address,
          password: data.password,
          email: data.email,
        })
        user.id = snapshot.id
        return user
      }
    }
  }

  async getUsers(filter: UserFilter) {
    const snapshot = await this.db.limit(filter.limit || 10).get()
    const usersData = snapshot.docs.map(doc => doc.data())
    return usersData
  }

  async getUser(id: string) {
    const snapshot = await this.db.doc(id).get()
    if (!snapshot.exists) throw new ErrorHandler(401, 'Usuário não foi encontrado')
    const userData = snapshot.data()!
    return userData
  }

  async createUser(user: User) {
    // TODO: Confirm if i need to use 2 action to the database to get the full user info
    const userReference = await this.db.add(user)
    return this.getUser(userReference.id)
  }

  async updateUser(user: User) {
    await this.db.doc(user.id).update(user)
    return user
  }

  async deleteUser(user: User) {
    await this.db.doc(user.id).delete()
    return user
  }
}

export default UserDAO

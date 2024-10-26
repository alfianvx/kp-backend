export default interface UserType {
  id: string
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'USER'
  created_at: Date
  updated_at: Date
}

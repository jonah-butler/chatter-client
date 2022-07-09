interface User {
  chatRooms: Array<string>,
  createdAt: string,
  email: string,
  isVerified: boolean,
  password: string,
  tokens: Array<Record<string, string>>,
  updatedAt: string,
  username: string,
  _id: string,
}

export default User;
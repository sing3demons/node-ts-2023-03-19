import { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserInput {
  email: string
  name: string
  password: string
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
)

userSchema.pre('save', async function (next) {
  let user = this as UserDocument

  if (!user.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)

  const hash = await bcrypt.hashSync(user.password, salt)

  user.password = hash

  return next()
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const UserModel = model<UserDocument>('User', userSchema)

export default UserModel

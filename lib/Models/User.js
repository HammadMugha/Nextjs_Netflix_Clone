
import mongoose, { Schema } from "mongoose"

const AccountShema = new Schema({
    uid: String,
    name: String,
    pin: String
})

const Account = mongoose.models.Account || mongoose.model("Account",AccountShema)
export default Account
import {Schema,model,models} from 'mongoose';


const UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
},{timestamps: true})

const Users = models.Users || model("Users", UserSchema)

export default Users
import { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
    names: {type: String, required: true},
    email: {type: String, required: true},
    subject : {type: String, required: true},
    message: {type: String, required: true}
},{timestamps: true})

const Contacts = models.Contacts || model('Contacts',ContactSchema)

export default Contacts
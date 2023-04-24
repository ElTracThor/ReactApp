import { RandomUUIDOptions } from "crypto";
import { Schema , Model , model } from "mongoose";

interface IUser {
    _id: string;
    email : string;
    name : string;
}; 

const UserSchema  = new Schema<IUser>({
    _id: {
        type: String,
        required: true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    name : {
        type : String
    }
});

const User : Model<IUser> = model('User',UserSchema);

export {User, IUser}
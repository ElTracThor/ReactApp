import { Schema , Model , model } from "mongoose";

interface ITask {
    _id: string;
    titre : string;
    description : string;
    CreationDate : Date;
    endDate : Date;
    category: string;
    //UserId : number;
}; 

const TaskSchema  = new Schema<ITask>({
    _id: {
        type: String,
        required: true
    },
    titre : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    CreationDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date
    },
    category: {
        type : String
    }
    /*UserId : {
        type : Number
    }*/
});

const Task : Model<ITask> = model('Task',TaskSchema);

export {Task, ITask}
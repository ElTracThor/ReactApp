import express, { Application, Request, Response } from 'express';
import  { connect } from 'mongoose';
import { getAllUsers, getUserById, addUser,deleteUser, editUser } from './handlers/User';
import { getAllTasks, getTaskById, addTask, deleteTask } from './handlers/Task';
import cors from 'cors';

const port: number = 8080;

const app: Application = express();
app.use(express.json());
app.use(cors());

// Routes pour users
app.get('/user/:id', getUserById);
app.get('/users', getAllUsers );
app.post('/users', addUser);
app.delete('/deleteuser/:id', deleteUser);
app.put('/edituser/:id', editUser);

// Routes pour tasks
app.get('/tasks', getAllTasks);
app.get('/tasks/:id', getTaskById);
app.post('/addTask', addTask);
app.delete('/deleteTask/:id', deleteTask);

/**
 * /tasks -> addTask(post) -> getAlltask (get)o
 * 
 * /tasks/:id 
 * /users/:id/tasks
 * /tasks/:id -> delete
 * 
 */

const dbConnect = async (): Promise<void> => {

    const uri: string = "mongodb+srv://Timur:Timur42@projectreact.ohkptzi.mongodb.net/TaskProject?retryWrites=true&w=majority";
    try {
        const cnx = await connect(uri);
        console.log('mongo connecté ');
    } catch (error) {
        console.log(error);
    }
}

// start server
app.listen(port, async () => {

    // database connection
    await dbConnect();
    
    console.log('Server listening on port ', port);
    
});



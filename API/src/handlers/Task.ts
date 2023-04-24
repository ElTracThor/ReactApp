import e, { Request, Response } from "express";
import { Task,ITask } from "../models/Task";
import { request } from "http";

//Create new Task
const addTask = async (request: Request, response: Response): Promise<void> => {
    
    const task = new Task(request.body);
    try {
        await task.save();
        response.json(task);
    } catch (e) {
        response.status(500).json({error : e});
    }
}

//Get all tasks
const getAllTasks = async (request: Request, response: Response): Promise<void> => {
    try {
        const tasks:ITask[] = await Task.find();
        tasks ? response.json(tasks) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    } catch (e) {
        response.status(500).json({error : e});
    }
}

//Get task by id
const getTaskById = async (request: Request, response: Response): Promise<void> => {
    const id = request.params.id;
    try {
        const task = await Task.findById(id);
        task ? response.json(task) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    } catch (e) {
        response.status(500).json({error : e});
    }
}

//Delete tesk by id
const deleteTask = async (request: Request, response: Response): Promise<void> => {
    const id = request.params.id;
    try {
        const task = await Task.findById(id);
        task?.deleteOne({id});
        task ? response.json(task) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    }catch (error) {
        response.status(500).json({error : error});
    }
}

export{ addTask, getAllTasks,getTaskById, deleteTask };
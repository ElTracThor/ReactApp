import e, { Request, Response } from "express";
import { User, IUser } from "../models/User";

// create user 
const addUser = async (request: Request, response: Response): Promise<void> => {
    
    const user = new User(request.body);
    try {
        await user.save();
        response.json(user);
    } catch (e) {
        response.status(500).json({error : e});
    }
}

// getUserByID
const getUserById = async (request: Request, response: Response): Promise<void> => {
    const id = request.params.id;
    try {
        const user = await User.findById(id);
        user ? response.json(user) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    } catch (e) {
        response.status(500).json({error : e});
    }
}

// getAllUsers 
const getAllUsers = async (request: Request, response: Response): Promise<void> => {
    try {
        const users:IUser[] = await User.find();
        users ? response.json(users) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    } catch (e) {
        response.status(500).json({error : e});
    }
}

const deleteUser = async (request: Request, response: Response): Promise<void> => {

    const id = request.params.id;
    try {
        const user = await User.findById(id);
        user?.deleteOne({id});
        user ? response.json(user) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    }catch (error) {
        response.status(500).json({error : error});
    }

}

const editUser = async (request: Request, response: Response): Promise<void> => {
    const id = request.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, request.body, {new: true});
        user ? response.json(user) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    } catch (e) {
        response.status(500).json({error : e});
    }
}


export { addUser, getUserById, getAllUsers, deleteUser,editUser };





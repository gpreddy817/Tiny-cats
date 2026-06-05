import { Document } from "mongoose";


export default interface ICat extends Document{
    name: string;
    lifespan: number;
    breed: string;
    description: string;
    kidsfriendly: boolean;
    appartmentfriendly:boolean;
    energylevel:string;
    image:string;
    color:string;

}
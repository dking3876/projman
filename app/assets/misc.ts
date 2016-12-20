import { comms } from '../classes/comment.interface';

export class misc extends comms{
    id:number;
    name:string;
    constructor(data:Object){
        super();
        for(let k in data){
            this[k] = data[k];
        }
    }
    update(data:Object){
        for(let k in data){
            this[k] = data[k];
        }
        return this;
    }
    save(){
        //save to db
    }
}
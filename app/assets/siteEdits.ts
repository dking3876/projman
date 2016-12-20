import { comms } from '../classes/comment.interface';

export class siteEdits extends comms{
    page:string;
    element:string;
    change:string;
    responsibility:string;
    completed:boolean;
    screenshot:string;

    constructor(data:Object){
        super()
        for(let k in data){
            
            this[k] = data[k];
        }
    }
}
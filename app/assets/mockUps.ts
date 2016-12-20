import { comms } from '../classes/comment.interface';
import * as Globals from '../defs/definitions';
export class mockUps extends comms{
    id:number;
    fileName:string;
    url:string;
    constructor(data:Object){
        super();
        console.log("here is the mockup data ", data);
        for(let k in data){
            console.log(data[k]);
            this[k] = data[k];
        }
    }
    downloadMockUp(){ //mabye

    }
}
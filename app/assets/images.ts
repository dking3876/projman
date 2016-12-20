import { comms } from '../classes/comment.interface'; //adds communications to the asset
import * as Globals from '../defs/definitions';

export class image extends comms{
    id:number; //Index of Assets.images array
    name:string; //Name of this asset
    url:string; //url of this asset stored in s3 bucket
    constructor(data:Object){
        super();
        for(let k in data){
            this[k] = data[k];
        }
    }
    downloadImage(){ //Downloads this image

    }
}
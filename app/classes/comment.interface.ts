
import { comment } from './comment';
import {Globals} from '../defs/required';
/*
 *  Adds communications to another object.
 * */
export class comms {
    _id:Object;
    comms:Array<comment>;
    dependancyInjection(deps:Object){
        for(let dep in deps){
            this[dep] = deps[dep];
        }
        return this;
    }
    addCom(userName:string, newComment:string){
        this.comms.push(new comment({
            user: userName,
            date: {
                '$date': ""
            },
            modifiedDate: {
                '$date': ""
            },
            comment: newComment,
            type: typeof this,
            parentId: this._id

        }).save());
        //refresh all the comms array from db
    }
    editCom(user:Object, updatedComment:string, id:number){
        if(user['userName'] == this.comms[id][user['userName']] || user['permission'] == Globals.SuperUser){
            //same user or super admin they can edit
            this.comms[id].update({
                comment: updatedComment,
                modifiedDate: ""
            }).save();
            //refresh all the coms array from db
        }else{
            //raise error can not edit a comment you did not make
        }
    }
}
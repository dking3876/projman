export class comment{
    id:number;
    user:string;
    userEmail:string;
    comment:string;
    date:Object = {
        '$date': ""
    };
    modifiedDate:Object  = {
        '$date': ""
    };
    type:string; //type of comment root/assetType
    parentId: Object; //root id
    
    constructor(data:Object = {}){
        for(let k in data){
            this[k] = data[k];
        }
    }
    update(comment:Object){
        for(let k in comment){
            this[k] = comment[k];
        }
        return this;
    }
    save():comment{
        // save to db with a push into the comms property
        /*
         * type is how far down we gotta go "document" means project root, asset.{type}
         * */
        return this;
    }
}
//project as asset
/*
this is a reference to another project
*/
export class projectRef{
    public _id:Object = null;

    constructor(data:Object){
        this._id = data['_id'];
        if(this._id === null){
            console.warn("There was an error loading your project")
        }
    }
}
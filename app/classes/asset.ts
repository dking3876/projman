/*
 *
 * Types of assets will include SiteEdits, Mockups, Images, ContentDocument, Misc
 * currently prototyping the properties of the types of assets onto the Asset object...
 * Mabye consider extending each asset type with an "Asset Interface" with the update and save method
 * */
import { AssetTypes } from '../assets/assettypes';
import { comms } from './comment.interface';
export class Asset extends comms{
    name:string;
    id:number;
    parentId:Object;
    constructor(type:string, data:Object = {}, parent:Object){
        super();
        this.parentId = parent;
        let asset = data;
        if(AssetTypes[type]){
            asset = new AssetTypes[type](data);
        }

        Object.keys(asset).forEach(k => {
            this[k] = asset[k];
        });
        
    }
    update(data:Object):Asset{
        for(let k in data){
            this[k] = data[k];
        }
        return this;
    }
    save(){
        //save the individual asset to the db
        
        //determine if new by id being empty indicating we need a push method or if it has value indicating we need the update method
    }
}
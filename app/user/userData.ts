import  {Globals} from '../defs/required';
export class userData{
    constructor(){
      
    }
    loadData(data:Object){
         for(let prop in data){
            this[prop] = data[prop];
        }
        return this;
    }
    update(obj:Object){
        for(let prop in obj){
            this[prop] = obj[prop];
        }
        return this;
    }
    get(prop:string){
        if(prop == 'userIcon'){
            return this[prop]? this[prop]: Globals.defaultIconUrl;
        }
        if(prop == 'projects'){
            return this[prop]? this[prop] : [];
        }
        return this[prop]? this[prop]: null;
    }
}
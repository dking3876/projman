//The contentDocument Object extends the page 
export class contentDocument{
    constructor(data:Object){
        for(let k in data){
            this[k] = data[k]
        }
    }
}
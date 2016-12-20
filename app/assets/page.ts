import { Asset } from '../classes/asset';
import { comms } from '../classes/comment.interface';
export class Page extends comms{
    id:number;
    pageName:string;
    mockUpName:string;
    assetsNeeded:Array<Asset>;
    pageNotes:string;
    pageUrl:string;
    pageTitle:string;
    pageMetaDescription:string;
    pageH1:string;
    pagePurpose:string;
    mainNav:boolean;
    parentPages:Object; //Object of objects for parent pages ie { 1: { 2: { 56: { 74:{} }}}}
    subPages:Array<Page>;
    constructor(data:Object){
        super();
    }
    getParentPages(){

        return this.parentPages;
    }
    addSubpage(data:Object){
        function recursePage( Obj:Object, pageId?:number){

            if(Object.keys(Obj[pageId]).length !== 0 ){
                let key = parseInt(Object.keys(Obj)[0]);
                let freshObj = recursePage(Obj[key],key);
                Obj[key] = freshObj;
                return Obj[key];
            }else{
                let id = {};
                id[this.id] = {}
                return id;
            }
        }
        let key = 1;
        let pPages = recursePage(this.parentPages);
        console.log("sub pages console log");
        console.log(pPages);
        data['parentPages'] = pPages;
        this.subPages.push(
            new Page(data).save()
        )
    }
    save(){ //saving sub pages may pose a problem as the subbpage doesn't know what parent page it belongs to???????
        //save to db

        return this;
    }
}
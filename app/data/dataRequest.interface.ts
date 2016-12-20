export interface dataRequest{
    getProjects(userData:Object, conditions:Object):Promise<any>;
    putProject(documentInfo:Object, operator?:string ):Promise<any>;
    getAssets(project:Object, assetType:Array<string>, index:Array<number>):Promise<any>;
    putAsset(projectId:Object, assetType:string, assetData:Object, operator?:string):Promise<any>;
    getUsers(userData:Object):any;
    putUsers():any;
    getAccounts():any;
    getTickets():any;
    queryGet(url:string):Promise<any>;
    queryPost(url:string,data:Object):Promise<any>;
}
export interface conditions{
    projectTypes?:Array<string>; // ['Website.Designs', 'Integrations']
    projectIds?:Array<Object>; // [{'$oid': 'lksjofjasdofsdk907302'},{'$oid': '90dsu0d90dsf08d0ydas'}]
    offsets?:Object; //{limit: 5, page: 2}
    fields?:Array<string>; //['_id', 'subject', 'assets']
    where?:Object; // {'somefile': 'somecondition'}
    excludeFields?:Array<string>; //['_id', 'subject', 'assets']
    sortBy?:Array<Object>; // [{'field': 'how sorted (ASC, DESC)'},{'field': 'how sorted (ASC, DESC)'} ] In order of how to sort
    groupBy?:Array<string>; // ['fieldName'] In order of how to Group
}
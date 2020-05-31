export class User{
    constructor(
        public id:string,
        public username:string,
        public password:string,
        public firstName:string,
        public lastName:string,
        public isAdmin:boolean,
        public createDate:string,
        public creatorId:string,
        public updateDate:string,
        public updaterId:string
    ){}
}
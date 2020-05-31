export default class Project {
    constructor(
        public id:string,
        public title:string,
        public description:string,
        public createDate:string,
        public updateDate:string,
        public creatorId:string,
        public updaterId:string  
    ) {}
}
import { Status } from "../utilities/enums";

export default class Task {
    constructor(
        public id:string,
        public title:string,
        public description:string,
        public status:string,
        public assigneeId:string,
        public createDate:string,
        public updateDate:string,
        public creatorId:string,
        public updaterId:string  
    ) {}
}
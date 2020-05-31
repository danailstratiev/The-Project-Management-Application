export default class WorkLog{
    constructor(
        public id:string,
        public time:number,
        public date:Date,
        public userId:string, 
    ){}
}
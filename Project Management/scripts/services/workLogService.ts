import BaseService from "./baseService";
import {task_url, worklog_url, base_url} from "../utilities/constants";
import AuthenticationService from "./authenticationService";



class WorkLogService extends BaseService{
    constructor(){
        super(worklog_url);
    }

    public async getAllWorkLogsForTask(taskId:string){
        const response = await fetch(`${base_url}${task_url}/${taskId}${this.url}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            }
        });

        return response.json();
    }
    
    public async getWorkLogById(taskId:string,workLogId:string){
        const response = await fetch(`${base_url}${task_url}/${taskId}${this.url}/${workLogId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            }
        });

        return response.json();
    }

    public async addWorkLog(taskId:string, item:any){
        const response = await fetch(`${base_url}${task_url}/${taskId}${this.url}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)
        });

        return response.json();
    }

    public async editWorkLog(taskId:string, item:any){
        const response = await fetch(`${base_url}${task_url}/${taskId}${this.url}/${item.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)  
        });
    }

    public async deleteWorkLog(taskId:string, workLogId:string){
        await fetch(`${base_url}${task_url}/${taskId}${this.url}/${workLogId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            }
        })
    }
}

export default new WorkLogService();
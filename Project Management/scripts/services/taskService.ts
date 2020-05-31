import BaseService from "./baseService";
import {task_url, projects_url, base_url} from "../utilities/constants";
import AuthenticationService from "./authenticationService";

class TaskService extends BaseService{
    constructor(){
        super(task_url);
    }

    public async getAllTasksInProject(projectId:string){
        const response = await fetch(`${base_url}${projects_url}/${projectId}${this.url}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            }
        });

        return response.json();
    }
    
    public async getTaskById(projectId:string, taskId:string){
        const response = await fetch(`${base_url}${projects_url}/${projectId}${this.url}/${taskId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            }
        });

        return response.json();
    }

// Note: In order to create a task you should provide the task assigneeId as well of the user which is assigned to the task. An unassigned task can't be created.

// Currently the API allows you to pass assigneeId even if the given user doesn't belong to a team which is assigned to this project
    
    public async addTask(projectId:string, item:any){
        const response = await fetch(`${base_url}${projects_url}/${projectId}${this.url}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)
        });

        return response.json();
    }

    public async editTask(projectId:string, item:any){
        const response = await fetch(`${base_url}${projects_url}/${projectId}${this.url}/${item.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)  
        });
    }

    public async deleteTask(projectId:string, taskId:string){
        await fetch(`${base_url}${projects_url}/${projectId}${this.url}/${taskId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            }
        })
    }
}

export default new TaskService();
import workLogs from "../views/pages/workLogs";
import Task from "../models/task";
import { render, modal, createHTMLelement, closeModal } from "../utilities/helpers";
import { work_container } from "../utilities/constants";
import { editTask } from "./taskController";
import taskForm from "../views/components/task/taskForm";
import TaskService from "../services/taskService";
import WorkLog from "../models/workLog";
import WorkLogService from "../services/workLogService";
import workLogForm from "../views/components/workLog/workLogForm";
import AuthenticationService from "../services/authenticationService";
import deleteWorkLogForm from "../views/components/workLog/deleteWorkLogForm";


export async function loadWorkLogs(projectId,taskId:string):Promise<any> {
    render(work_container, workLogs());

    const task:Task = await TaskService.getTaskById(projectId,taskId);

    let currentTaskTitle:HTMLElement = (document.getElementById('currentTaskTitle') as HTMLElement);
    let taskStatus:HTMLElement = (document.getElementById('taskCurrentStatus') as HTMLElement);
    let currentTaskId:HTMLInputElement = (document.getElementById('currentTaskId') as HTMLInputElement);
    let currentProjectId:HTMLInputElement = (document.getElementById('currentTaskProjectId') as HTMLInputElement);
    let description:HTMLElement = (document.getElementById('worklogTaskDesctiption') as HTMLElement);
    
    description.innerHTML = task.description;
    currentTaskId.value = taskId;
    currentProjectId.value = projectId;
    currentTaskTitle.innerHTML = `${task.title} - ${task.assigneeId}`;
    taskStatus.innerHTML = task.status;
    if (task.status == "Pending") {
        taskStatus.style.background = "#F26060";
    }else if (task.status == "In progress") {
        taskStatus.style.background = "#FCC100";        
    }else{
        taskStatus.style.background = "#5FC27E";        
    }

    let workLogCreator:HTMLElement = (document.getElementById('workLogCreator') as HTMLElement);

    const loggedUser = AuthenticationService.getLoggedUser();
    if (loggedUser.id !== task.creatorId ) {
        workLogCreator.style.display = "none";
    }

    const workLogsContainer: HTMLElement = document.getElementById('workLogsContainer') as HTMLElement;
    
    if (loggedUser.id == task.creatorId || loggedUser.id == task.assigneeId) {
        const items: Array<WorkLog> = await WorkLogService.getAllWorkLogsForTask(taskId);
    
        if (!items) {
            return;
        }
    
       
        for (const currentItem of items) {
            workLogsContainer.appendChild(await generateWorkLogCell(currentItem));
        }
    }
}

async function generateWorkLogCell(currentItem:WorkLog):Promise<any> {
    const { id, time, date} = currentItem;
    let cell:HTMLElement = (document.createElement('div') as HTMLElement);
    cell.classList.add("current-item-info");
    
    cell.innerHTML = `
    <div class="task-header">
        <div class="task-status">
            <p>${time}h-${date.toString().substring(0,10)}</p>
        </div>
        <div class="task-btns">
            
        </div>
    </div>
    `;
    
    let currentTaskId:string = (document.getElementById('currentTaskId') as HTMLInputElement).value;
    let currentProjectId:string = (document.getElementById('currentTaskProjectId') as HTMLInputElement).value;

    const loggedUser = AuthenticationService.getLoggedUser();

    let editBtn:HTMLElement = createHTMLelement("button", "editBtn", "",null,null);
    let deleteBtn:HTMLElement = createHTMLelement("button", "deleteBtn", "", null, null);
    let buttons:HTMLElement = cell.querySelector('.task-btns') as HTMLElement;
    let currentTask:Task = await TaskService.getTaskById(currentProjectId, currentTaskId) 

    if (loggedUser.id == currentTask.creatorId) {
        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn); 
        cell.querySelector('.editBtn')
        .addEventListener('click', () => editWorkLog(id));
        cell.querySelector('.deleteBtn')
        .addEventListener('click', () => openDeleteTaskModal(id,currentTaskId, currentProjectId));
    }
    
    return cell;
}

export function createWorkLog() :void{
    modal(workLogForm("Create"));
}

export async function editWorkLog(id: string): Promise<void> {
    modal(workLogForm("Edit"));

    const taskId: string = (document.getElementById('currentTaskId') as HTMLInputElement).value;
    const item: WorkLog = await WorkLogService.getWorkLogById(taskId, id);
    
    (document.getElementById('workLogId') as HTMLInputElement).value = item.id;
    (document.getElementById('workHours') as HTMLInputElement).value = item.time.toString();
}

export async function submitWorkLogForm(): Promise<void> {
    event.preventDefault();

    const id: string = (document.getElementById('workLogId') as HTMLInputElement).value;
    const taskId: string = (document.getElementById('currentTaskId') as HTMLInputElement).value;
    const time: number = +(document.getElementById('workHours') as HTMLInputElement).value;
    const day:number = +(document.getElementById('dayDate') as HTMLSelectElement).value;
    const month:number = +(document.getElementById('monthDate') as HTMLSelectElement).value;
    const year:number = +(document.getElementById('yearDate') as HTMLSelectElement).value;

    const date:Date = new Date(year, month, day);
    const loggedUser = AuthenticationService.getLoggedUser();

    const item: WorkLog = new WorkLog(id, time, date, loggedUser.id);

    if (id === '') {
      await WorkLogService.addWorkLog(taskId, item);
    } else {
      item.id = id;
      await WorkLogService.editWorkLog(taskId, item);
    }
     
    const currentProjectId:string = (document.getElementById('currentTaskProjectId') as HTMLInputElement).value;

    closeModal();
    await loadWorkLogs(currentProjectId,taskId);
}

export function openDeleteTaskModal(id,taskId, projectId){
    modal(deleteWorkLogForm());
   (document.getElementById('deleteWorklogId') as HTMLInputElement).value = id;
   (document.getElementById('deleteWorklogTaskId') as HTMLInputElement).value = taskId;
   (document.getElementById('deleteWorklogProjectId') as HTMLInputElement).value = projectId;
}

export async function deleteWorkLog(): Promise<void> {
    event.preventDefault();

    let id:string = (document.getElementById('deleteWorklogId') as HTMLInputElement).value;
    const taskId: string = (document.getElementById('deleteWorklogTaskId') as HTMLInputElement).value;
    const currentProjectId:string = (document.getElementById('deleteWorklogProjectId') as HTMLInputElement).value;
    
    await WorkLogService.deleteWorkLog(taskId,id);
    closeModal();
    await loadWorkLogs(currentProjectId,taskId);
}

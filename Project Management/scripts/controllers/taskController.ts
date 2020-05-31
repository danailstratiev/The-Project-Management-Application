import Task from "../models/task";
import { render, modal, createHTMLelement, closeModal } from "../utilities/helpers";
import { work_container } from "../utilities/constants";
import TaskService from "../services/taskService";
import tasks from "../views/pages/tasks";
import Project from "../models/project";
import ProjectService from "../services/projectService";
import taskForm from "../views/components/task/taskForm";
import { loadWorkLogs } from "./workLogController";
import AuthenticationService from "../services/authenticationService";
import deleteTaskForm from "../views/components/task/deleteTaskForm";


export async function loadTasks(projectId:string):Promise<any> {
    render(work_container, tasks());

    const project:Project = await ProjectService.getById(projectId);

    let projectTitle:HTMLElement = (document.getElementById('currentProjectTitle') as HTMLElement);
    let projectDescription:HTMLElement = (document.getElementById('currentProjectDescription') as HTMLElement);
    let currentProjectId:HTMLInputElement = (document.getElementById('currentProjectId') as HTMLInputElement);

    currentProjectId.value = projectId;
    projectTitle.innerHTML = project.title;
    projectDescription.innerHTML = project.description;

    let tasksHeader: HTMLElement = (document.getElementById('tasksHeader') as HTMLElement);
    
    const tasksContainer: HTMLElement = (document.getElementById('tasksContainer') as HTMLElement);
    let button:HTMLElement = createHTMLelement("button", "create-btn", "+ CREATE TASK",[{key:"id", value:"taskCreator"}], {name:"click", func:() => createTask()})
    const loggedUser = AuthenticationService.getLoggedUser();
    
    
    if (loggedUser.id == project.creatorId) {
        tasksHeader.appendChild(button);
    }
    
    const items: Array<Task> = await TaskService.getAllTasksInProject(projectId);
    
    if (!items) {
    return;
    }

    for (const currentItem of items) {
        tasksContainer.appendChild(await generateTaskCell(currentItem));
    }
}

async function generateTaskCell(currentItem:Task):Promise<any> {
    const { id, title, description, status, assigneeId} = currentItem;
    let cell:HTMLElement = (document.createElement('div') as HTMLElement);
    cell.classList.add("current-item-info");
    cell.classList.add("task-hover");
    cell.innerHTML = `
    <header class="task-header">
        <div class="task-status">
            <h3>${title} - ${assigneeId}</h3>
            <span class="currentTaskStatus">${status}</span>
        </div>
        <div class="task-btns">
            
        </div>
    </header>
    <section class="task-description">
        <p>${description}</p>
    </section>
    `;

    let taskStatus:HTMLElement = cell.querySelector('.currentTaskStatus') as HTMLElement;
    if (status == "Pending") {
        taskStatus.style.background = "#F26060";
    }else if (status == "In progress") {
        taskStatus.style.background = "#FCC100";        
    }else{
        taskStatus.style.background = "#5FC27E";        
    }


    const currentProjectId:string = (document.getElementById('currentProjectId') as HTMLInputElement).value;
    const currentProject:Project = await ProjectService.getById(currentProjectId);
    const loggedUser = AuthenticationService.getLoggedUser();

    let editBtn:HTMLElement = createHTMLelement("button", "editBtn", "",null,null)
    let deleteBtn:HTMLElement = createHTMLelement("button", "deleteBtn", "", null, null)
    let buttons:HTMLElement = cell.querySelector('.task-btns') as HTMLElement;

    if (loggedUser.id == currentProject.creatorId) {
        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn); 
        cell.querySelector('.editBtn')
        .addEventListener('click', () => editTask(id));
        cell.querySelector('.deleteBtn')
        .addEventListener('click', () => openDeleteTaskModal(id, currentProjectId));
    }

    cell.querySelector('.task-description')
        .addEventListener('click', () => loadWorkLogs(currentProjectId,id));
   
        
    return cell;
}

export function createTask() :void{
    modal(taskForm("Create"));
}

export async function editTask(id: string): Promise<void> {
    modal(taskForm("Edit"));

    const projectId: string = (document.getElementById('currentProjectId') as HTMLInputElement).value;
    const item: Task = await TaskService.getTaskById(projectId, id);
  
    (document.getElementById('taskId') as HTMLInputElement).value = item.id;
    (document.getElementById('taskTitle') as HTMLInputElement).value = item.title;
    (document.getElementById('taskDescription') as HTMLTextAreaElement).value = item.description;
    (document.getElementById('taskStatus') as HTMLSelectElement).value = item.status;
    (document.getElementById('taskAssignee') as HTMLInputElement).value = item.assigneeId;
}

export async function submitTaskForm(): Promise<void> {
    event.preventDefault();

    const id: string = (document.getElementById('taskId') as HTMLInputElement).value;
    const projectId: string = (document.getElementById('currentProjectId') as HTMLInputElement).value;
    const title: string = (document.getElementById('taskTitle') as HTMLInputElement).value;
    const description:string = (document.getElementById('taskDescription') as HTMLTextAreaElement).value;
    const status: string = (document.getElementById('taskStatus') as HTMLSelectElement).value;
    const taskAssignee: string = (document.getElementById('taskAssignee') as HTMLInputElement).value;
    
    
    const item: Task = new Task(id, title, description, status, taskAssignee, "","", "", "")
    
    if (id === '') {
      await TaskService.addTask(projectId,item);
    } else {
      item.id = id;
      await TaskService.editTask(projectId,item);
    }
     
    closeModal();
    await loadTasks(projectId);
}

export function openDeleteTaskModal(id, projectId){
    modal(deleteTaskForm());
   (document.getElementById('deleteFormTaskId') as HTMLInputElement).value = id;
   (document.getElementById('deleteFormTaskProjectId') as HTMLInputElement).value = projectId;
}

export async function deleteTask(): Promise<void> {
    event.preventDefault();
    
    let id:string = (document.getElementById('deleteFormTaskId') as HTMLInputElement).value;
    const projectId: string = (document.getElementById('deleteFormTaskProjectId') as HTMLInputElement).value;
    
    await TaskService.deleteTask(projectId,id);
    closeModal();
    await loadTasks(projectId);
}
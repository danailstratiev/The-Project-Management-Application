import projects from "../views/pages/projects";
import Project from "../models/project";
import ProjectService from "../services/projectService";
import { work_container } from "../utilities/constants";
import { render, modal, createHTMLelement, closeModal } from "../utilities/helpers";
import projectForm from "../views/components/project/projectForm";
import { loadTasks } from "./taskController";
import addTeamToProjectForm from "../views/components/project/assignTeamToProjectForm";
import AuthenticationService from "../services/authenticationService";
import projectTeams from "../views/components/project/projectTeams";
import Team from "../models/team";
import deleteProjectForm from "../views/components/project/deleteProjectForm";
import TaskService from "../services/taskService";
import WorkLogService from "../services/workLogService";
import Task from "../models/task";
import WorkLog from "../models/workLog";

export async function loadProjects():Promise<any> {
    render(work_container, projects());

    const projectsContainer: HTMLElement = document.getElementById('currentProjects') as HTMLElement;
    const items: Array<Project> = await ProjectService.getAll();
    
    const data:{assignedTasks, workLogged, tasksPending} = await calculateProjectStats();
    
    let allProjectsCount: HTMLElement = document.getElementById('allProjectsCount') as HTMLElement;
    let pendingTasksCount: HTMLElement = document.getElementById('pendingTasksCount') as HTMLElement;
    let assignedTasksCount: HTMLElement = document.getElementById('assignedTasksCount') as HTMLElement;
    let workTime: HTMLElement = document.getElementById('workTime') as HTMLElement;

    
    if (!items) {
        return;
    }

    allProjectsCount.innerHTML = items.length.toString();

    pendingTasksCount.innerHTML = data.tasksPending.toString();

    assignedTasksCount.innerHTML = data.assignedTasks.toString();

    workTime.innerHTML = data.workLogged.toString();

    for (const currentItem of items) {
        projectsContainer.appendChild(generateProjectCell(currentItem));
    }
}

function generateProjectCell(currentItem:Project):HTMLElement {
    const { id, title, description,createDate,updateDate, creatorId} = currentItem;
    let cell:HTMLElement = document.createElement("div");
    cell.classList.add("current-project");

    let editBtn:HTMLElement = createHTMLelement("button", "editBtn", "",null,null)
    let deleteBtn:HTMLElement = createHTMLelement("button", "deleteBtn", "", null, null)
  
    cell.innerHTML = `
        <div class="current-project-nav">
            <div>
                <h3>${title}</h3>
            </div>
            <div class="current-project-btns">
                <button class="projectTeamsBtn"></button>
                <button class="assignBtn"></button>
            </div>
        </div>
        <div class="current-project-description">
            <p>${description}</p>
        </div>
    `;
    
    let buttons:HTMLElement = cell.querySelector('.current-project-btns') as HTMLElement;
    const loggedUser = AuthenticationService.getLoggedUser();

    if (loggedUser.id == creatorId) {
        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn); 
        cell.querySelector('.editBtn')
        .addEventListener('click', () => editProject(id));
        cell.querySelector('.deleteBtn')
        .addEventListener('click', () => openDeleteProjectModal(id));
    }

    cell.querySelector('.assignBtn')
        .addEventListener('click', () => assignTeamToProject(id));
        
    cell.querySelector('.projectTeamsBtn')
        .addEventListener('click', () => loadProjectTeams(id));

    cell.querySelector('.current-project-description')
        .addEventListener('click',() => loadTasks(id));
        
    return cell;
}

export function createProject() :void{
    modal(projectForm("Create"));
}

export async function editProject(id: string): Promise<void> {
    modal(projectForm("Edit"));
  
    const item: Project = await ProjectService.getById(id);
  
    (document.getElementById('projectId') as HTMLInputElement).value = item.id;
    (document.getElementById('projectTitle') as HTMLInputElement).value = item.title;
    (document.getElementById('projectDescription') as HTMLTextAreaElement).value = item.description;

}

export async function submitProjectForm(): Promise<void> {
 event.preventDefault();
 
 const id: string = (document.getElementById('projectId') as HTMLInputElement).value;
 const title: string = (document.getElementById('projectTitle') as HTMLInputElement).value;
 const description:string = (document.getElementById('projectDescription') as HTMLTextAreaElement).value;
 
 const item: Project = new Project(id, title,description,'','','','');
 
 if (id === '') {
   await ProjectService.addItem(item);
 } else {
   item.id = id;
   await ProjectService.editItem(item);
 }
  
 closeModal();
 await loadProjects();
 }
 
export function openDeleteProjectModal(id){
    modal(deleteProjectForm());
   (document.getElementById('deleteProjectId') as HTMLInputElement).value = id;
}

export async function deleteProject(): Promise<void> {
  event.preventDefault();
  let id:string = (document.getElementById('deleteProjectId') as HTMLInputElement).value;

  await ProjectService.deleteItem(id);
  closeModal();
  await loadProjects();
}

function assignTeamToProject(id):void{
    modal(addTeamToProjectForm());
    (document.getElementById("targetProjectId") as HTMLInputElement).value = id;
}

export async function submitAssignTeamToProjectForm():Promise<void>{
    event.preventDefault();
    const projectId:string = (document.getElementById("targetProjectId") as HTMLInputElement).value;
    const teamId:string = (document.getElementById("assignTeamId") as HTMLInputElement).value;

    const item:any = {"teamId": teamId}
    
    await ProjectService.assignItem(projectId, item);
    closeModal();
}

async function loadProjectTeams(id):Promise<any>{
    render(work_container, projectTeams());

    const projectTeamsTable: HTMLElement = document.getElementById('projectTeams') as HTMLElement;
    const items: Array<Team> = await ProjectService.getProjectTeams(id);
    
    if (!items) {
    return;
    }

    for (const currentItem of items) {
        projectTeamsTable.appendChild(generateTeamsRow(currentItem));
    }
}

function generateTeamsRow(currentItem: Team):HTMLElement {
    const { id, title, createDate, updateDate} = currentItem;
    const row: HTMLElement = document.createElement('tr');
    let titleTd = title.substring(0,18);
    let createDateTd = createDate.substring(0,10);
    let updateDateTd = updateDate.substring(0,10);

    row.innerHTML = `
      <td class="teamTd">${titleTd}</td>
      <td>${createDateTd}</td>
      <td>${updateDateTd}</td>
  `;

  return row;
}

async function calculateProjectStats():Promise<any>{
    let projects: Array<Project> = await ProjectService.getAll();
    let loggedUser = AuthenticationService.getLoggedUser();
    let tasksCount:number = 0;
    let workLogHours:number = 0;
    let pendingTasks:number = 0;

    for (let i = 0; i < projects.length; i++) {
        let tasks:Array<Task> = await TaskService.getAllTasksInProject(projects[i].id);
        let count:number = tasks.filter(x => x.assigneeId == loggedUser.id).length; 
        let pendingCount:number = tasks.filter(x => x.assigneeId == loggedUser.id && x.status == "Pending").length; 

        let myTasks:Array<Task> = tasks.filter(x => x.creatorId == loggedUser.id);
        tasksCount+=count;       
        pendingTasks+= pendingCount;

        for (let j = 0; j < myTasks.length; j++) {
            let workLog:Array<WorkLog> = await WorkLogService.getAllWorkLogsForTask(myTasks[j].id);

            for (let k = 0; k < workLog.length; k++) {
                workLogHours += workLog[k].time;
            }
        }
    }

    let data = {
        assignedTasks:tasksCount,
        workLogged: workLogHours,
        tasksPending:pendingTasks
    }

    return data;
} 
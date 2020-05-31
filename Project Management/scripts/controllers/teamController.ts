import { render, modal, closeModal } from "../utilities/helpers";
import { work_container } from "../utilities/constants";
//import { TeamItem } from "../utilities/types";
import teams from "../views/pages/teams";
import TeamService from "../services/teamService";
import Team from "../models/team";
import teamForm from "../views/components/team/teamForm";
import AuthenticationService from "../services/authenticationService";
import addTeamMemberForm from "../views/components/team/addTeamMemberForm";
import teamMembers from "../views/components/team/teamMembers";
import { User } from "../models/user";
import deleteTeamForm from "../views/components/team/deleteTeamFrom";
 

export async function loadTeams() :Promise<any>{
    render(work_container, teams());

    const teamsTable: HTMLElement = document.getElementById('teamsTable') as HTMLElement;
    const items: Array<Team> = await TeamService.getAll();
    
    if (!items) {
    return;
    }

    for (const currentItem of items) {
        teamsTable.appendChild(generateTeamsRow(currentItem));
    }
}

function generateTeamsRow(currentItem: Team) {
    const { id, title, createDate, updateDate} = currentItem;
    const row: HTMLElement = document.createElement('tr');
    let titleTd = title.substring(0,18);
    let createDateTd = createDate.substring(0,10);
    let updateDateTd = updateDate.substring(0,10);

    row.innerHTML = `
      <td class="teamTd">${titleTd}</td>
      <td class="disappear">${createDateTd}</td>
      <td class="disappear">${updateDateTd}</td>
      <td class="assignTd"></td>
      <td class="editTd"></td>
      <td class="deleteTd"></td>
  `;


    row.querySelector('.teamTd')
        .addEventListener('click', () => loadTeamMembers(id));
    row.querySelector('.assignTd')
        .addEventListener('click', () => addMember(id));
    row.querySelector('.editTd')
        .addEventListener('click', () => editTeam(id));
    row.querySelector('.deleteTd')
        .addEventListener('click', () => openDeleteModal(id));

  return row;
}

export function createTeam() :void{
  modal(teamForm("Create"));  
}

export async function editTeam(id: string): Promise<void> {
  modal(teamForm("Edit"));

  const item: Team = await TeamService.getById(id);

  (document.getElementById('teamId') as HTMLInputElement).value = item.id;
  (document.getElementById('teamTitle') as HTMLInputElement).value = item.title;
}

export async function submitTeamForm(): Promise<void> {
event.preventDefault();

const id: string = (document.getElementById('teamId') as HTMLInputElement).value;
const title: string = (document.getElementById('teamTitle') as HTMLInputElement).value;

const item: Team = new Team(id, title,'','','','');

if (id === '') {
  await TeamService.addItem(item);
} else {
  item.id = id;
  await TeamService.editItem(item);
}

closeModal();
await loadTeams();
}

export function openDeleteModal(id){
   modal(deleteTeamForm());
  (document.getElementById('deleteTeamId') as HTMLInputElement).value = id;
}

export async function deleteTeam(): Promise<void> {
  event.preventDefault();
  let id:string = (document.getElementById('deleteTeamId') as HTMLInputElement).value;

  await TeamService.deleteItem(id);
  closeModal();
  await loadTeams();
}

export function addMember(id):void {
  modal(addTeamMemberForm());
  (document.getElementById('currentTeamId') as HTMLInputElement).value = id;
}

export async function submitMemberForm() {
  event.preventDefault();
  const teamId:string = (document.getElementById('currentTeamId') as HTMLInputElement).value;
  const userId:string = (document.getElementById('newMemberId') as HTMLInputElement).value;

  const item:any = {"userId": userId};
  
  await TeamService.assignItem(teamId, item);
  closeModal();  
}

export async function loadTeamMembers(id:string):Promise<any> {
  render(work_container, teamMembers());

  const teamsTable: HTMLElement = (document.getElementById('teamMembers') as HTMLElement);
  const items: Array<User> = await TeamService.getTeamMembers(id);
  
  if (!items) {
  return;
  }

  for (const currentItem of items) {
      teamsTable.appendChild(generateTeamsMembersRow(currentItem));
  }

function generateTeamsMembersRow(currentItem: User):HTMLElement {
    const { id, username, firstName, lastName, isAdmin} = currentItem;
    const row: HTMLElement = (document.createElement('tr') as HTMLElement);
    let firstNameFill = firstName.substring(0, 14);
    let lastNameFill = lastName.substring(0, 14);
    let usernameFill = username.substring(0, 14);

    row.innerHTML = `
      <td>${firstNameFill}</td>
      <td>${lastNameFill}</td>
      <td>${usernameFill}</td>
    `;

  
  return row;
}
} 
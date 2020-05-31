import { render, modal, closeModal } from "../utilities/helpers";
import { work_container } from "../utilities/constants";
import users from "../views/pages/users";
import userForm from "../views/components/user/userForm";
import { UserItem } from "../utilities/types";
import UserService from "../services/userService";
import { User } from "../models/user";
import AuthenticationService from "../services/authenticationService";
import deleteUserForm from "../views/components/user/deleteUserForm";



export async function loadUsers():Promise<any> {
    render(work_container, users());

    const usersTable: HTMLElement = document.getElementById('usersTable') as HTMLElement;
    const items: Array<UserItem> = await UserService.getAll();
    
    if (!items) {
    return;
    }

    for (const currentItem of items) {
        usersTable.appendChild(generateUsersRow(currentItem));
    }
}

function generateUsersRow(currentItem: UserItem) {
    const { id, username, password, firstName, lastName, isAdmin } = currentItem;
    const row: HTMLElement = document.createElement('tr');
    let firstNameFill = firstName.substring(0, 14);
    let lastNameFill = lastName.substring(0, 14);
    let usernameFill = username.substring(0, 14);

    row.innerHTML = `
      <td>${firstNameFill}</td>
      <td>${lastNameFill}</td>
      <td>${usernameFill}</td>
      <td class="disappear">${isAdmin}</td>
      <td class="editTd" id="editUser"></td>
      <td class="deleteTd" id="deleteUser"></td>
  `;

    row.querySelector('.editTd')
        .addEventListener('click', () => editUser(id));
    row.querySelector('.deleteTd')
        .addEventListener('click', () => openDeleteUserModal(id));

  return row;
}

export function createUser() :void{
    modal(userForm());
    
}

export async function editUser(id: string): Promise<void> {
    modal(userForm());

    const item: User = await UserService.getById(id);
  
    (document.getElementById('userId') as HTMLInputElement).value = item.id;
    (document.getElementById('usernameInput') as HTMLInputElement).value = item.username;
    (document.getElementById('passwordInput') as HTMLInputElement).value = item.password;
    (document.getElementById('firstNameInput') as HTMLInputElement).value = item.firstName;
    (document.getElementById('lastNameInput') as HTMLInputElement).value = item.lastName;
  }

export async function submitUserForm(): Promise<void> {
  event.preventDefault();

  const id: string = (document.getElementById('userId') as HTMLInputElement).value;
  const username: string = (document.getElementById('usernameInput') as HTMLInputElement).value;
  const password: string = (document.getElementById('passwordInput') as HTMLInputElement).value;
  const firstName: string = (document.getElementById('firstNameInput') as HTMLInputElement).value;
  const lastName: string = (document.getElementById('lastNameInput') as HTMLInputElement).value;
  const isAdmin: boolean = (document.getElementById('isAdmin') as HTMLInputElement).checked ? true : false;
  
  const loggedUser = AuthenticationService.getLoggedUser();
  const item: User = new User(id, username, password, firstName, lastName, isAdmin, loggedUser.id,'','','');

  if (id === '') {
    await UserService.addItem(item);
  } else {
    item.id = id;
    await UserService.editItem(item);
  }

  closeModal();
  await loadUsers();
}

export function openDeleteUserModal(id){
  modal(deleteUserForm());
 (document.getElementById('deleteUserId') as HTMLInputElement).value = id;
}

export async function deleteUser(): Promise<void> {
    event.preventDefault();
    let id:string = (document.getElementById('deleteUserId') as HTMLInputElement).value;

    await UserService.deleteItem(id);
    closeModal();
    await loadUsers();
}
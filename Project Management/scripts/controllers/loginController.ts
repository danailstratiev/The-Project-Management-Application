import AuthenticationService from '../services/authenticationService';   
import { LoggedUser } from '../utilities/types';
import { handleNavigation, render, createHTMLelement, openNav, closeNav } from '../utilities/helpers';
import { main_container,work_container } from '../utilities/constants';
import projects from '../views/pages/projects';
import login from '../views/pages/login';
import { loadProjects } from './projectController';

export async function submitLoginForm(): Promise<void> {
    event.preventDefault();
    
    const username: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    
    try {
        await AuthenticationService.authenticate(username, password);
        const loggedUser: LoggedUser = AuthenticationService.getLoggedUser();
        
        if (!loggedUser) {
            console.log('No user');            
        }else{
            let main = (document.getElementsByClassName(`${main_container}`)[0] as HTMLElement);
            main.innerHTML = '';

            let menu:HTMLElement = createHTMLelement('header', 'project-nav','',[{key:'id', value:'mySidenav'}], null);
           
            let workSection:HTMLElement = createHTMLelement('main', 'project-content', '', null, null);
            
            //let spanBtn:HTMLElement = createHTMLelement('span', 'smallBtn','', null, null ) as HTMLElement;
            //spanBtn.innerHTML = '&#9776 open';
            let spanBtn:HTMLElement = createHTMLelement('span', null,'', [{key:'type', value:'hidden'},
            {key:'id', value:'burgerBtn'}],{name: 'click', func:()=> openNav()} ) as HTMLElement;
            //<span type:hidden style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; open</span>
            //workSection.appendChild(spanBtn);
            let burgerBtnDiv:HTMLElement = createHTMLelement('div', 'burgerBtn-holder','',null,null);
            burgerBtnDiv.appendChild(spanBtn)
            main.appendChild(menu);
            main.appendChild(burgerBtnDiv);
            main.appendChild(workSection);

            handleNavigation();
            loadProjects();            
        }

    } catch (error) {
        console.log('Error:' + error);        
    }
}

export function logout(): void {
    AuthenticationService.logout();
    render('.' +main_container,login());
  }

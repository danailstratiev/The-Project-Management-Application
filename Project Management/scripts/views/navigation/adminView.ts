import { render, closeNav } from "../../utilities/helpers";
import { work_container } from "../../utilities/constants";
import users from "../pages/users";
import {logout} from '../../controllers/loginController';
import {loadUsers} from '../../controllers/userController';
import { loadTeams } from "../../controllers/teamController";
import { loadProjects } from "../../controllers/projectController";

export default function adminView():any {
    return{
        template: `        
        <div class="menu-logo">
            <div class="appLogo-div">
                <span class="appLogo"></span>
                <h3>AppStack</h3>
            </div>

            <i class="fas fa-times" id="closeMenuBtn"></i>
        </div>
        <nav>
            <ul>
                <li id="projectsLink"><span class="house"></span>Projects</li>
                <li id="usersLink"><span class="friends"></span>Users</li>
                <li id="teamsLink"><span class="fellows"></span>Teams</li>
                <li id="logoutLink"><span class="out"></span>Sign Out</li>
            </ul>
        </nav>
        `,
        listeners:[  
            {
                targetId: 'closeMenuBtn',
                eventType: 'click',
                callback: closeNav
            },   
            {
                targetId: 'usersLink',
                eventType: 'click',
                callback: loadUsers
            },       
            {
                targetId: 'teamsLink',
                eventType: 'click',
                callback: loadTeams
            },
            {
                targetId: 'projectsLink',
                eventType: 'click',
                callback: loadProjects
            },  
            {
                targetId: 'logoutLink',
                eventType: 'click',
                callback: logout
            }            
        ]
    };
}
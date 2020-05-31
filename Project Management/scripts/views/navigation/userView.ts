import { loadProjects } from "../../controllers/projectController";
import { logout } from "../../controllers/loginController";
import { closeNav } from "../../utilities/helpers";


export default function userView():any {
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
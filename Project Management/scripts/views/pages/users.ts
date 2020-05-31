import { render } from "../../utilities/helpers";
import { work_container } from "../../utilities/constants";
import projects from "./projects";
import { createUser } from "../../controllers/userController";


export default function users():any {
    return {
        template: `
    <header class="page-header">
        <h2>Users</h2>
        <button class="create-btn" id="userCreator">+ CREATE USER</button>
    </header>
    <table cellpadding="10" class="page-table users-table">
        <thead>
            <tr>
                <td>First name</td>
                <td>Last name</td>
                <td>Username</td>
                <td class="disappear">IsAdmin</td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody id="usersTable">
            
        </tbody>
    </table>
    `,
    listeners:[
        {
            targetId: 'userCreator',
            eventType: 'click',
            callback: createUser
        }        
    ]
    };
}

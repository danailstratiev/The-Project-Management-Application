import { createTeam } from "../../controllers/teamController";


export default function teams():any {
    return {
        template: `
    <header class="page-header">
        <h2>Teams</h2>
        <button class="create-btn" id="teamCreator">+ CREATE TEAM</button>
    </header>
    <table cellpadding="10" class="page-table">
        <thead>
            <tr>
                <td>Title</td>
                <td class="disappear">Date of creation</td>
                <td class="disappear">Date of last change</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody id="teamsTable">
           
        </tbody>
    </table>
    `,
    listeners:[
        {
            targetId: 'teamCreator',
            eventType: 'click',
            callback: createTeam
        }        
    ]
    };
}

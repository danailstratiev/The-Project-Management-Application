import { submitAssignTeamToProjectForm } from "../../../controllers/projectController";


export default function addTeamToProjectForm():any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3>Assign Team To Project</h3>
        </header>
        <form>
            <input type="text" id="assignTeamId" placeholder="ID">
            <input type="hidden" id="targetProjectId">
            <div class="form-button">
                <button class="form-btn" id="projectTeamAssigner">Assign Team</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'projectTeamAssigner',
                eventType: 'click',
                callback: submitAssignTeamToProjectForm
            }   
        ]
    };
}
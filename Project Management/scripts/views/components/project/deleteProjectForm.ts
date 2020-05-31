import { closeModal } from "../../../utilities/helpers";
import { deleteProject } from "../../../controllers/projectController";

export default function deleteProjectForm():any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3 class="deleteMessage">Do you want to delete this item?</h3>
        </header>
        <form>
            <input type="hidden" id="deleteProjectId">

            <div class="delete-form-button">
                <button class="delete-form-btn no-btn" id="projectSaver">No</button>
                <button class="delete-form-btn yes-btn" id="projectDeletor">Yes</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'projectSaver',
                eventType: 'click',
                callback: closeModal
            },
            {
                targetId: 'projectDeletor',
                eventType: 'click',
                callback: deleteProject
            }     
        ]
    };
}
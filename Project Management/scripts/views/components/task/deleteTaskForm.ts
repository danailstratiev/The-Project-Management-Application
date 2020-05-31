import { closeModal } from "../../../utilities/helpers";
import { deleteTask } from "../../../controllers/taskController";

export default function deleteTaskForm():any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3 class="deleteMessage">Do you want to delete this item?</h3>
        </header>
        <form>
            <input type="hidden" id="deleteFormTaskId">
            <input type="hidden" id="deleteFormTaskProjectId">

            <div class="delete-form-button">
                <button class="delete-form-btn no-btn" id="taskSaver">No</button>
                <button class="delete-form-btn yes-btn" id="taskDeletor">Yes</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'taskSaver',
                eventType: 'click',
                callback: closeModal
            },
            {
                targetId: 'taskDeletor',
                eventType: 'click',
                callback: deleteTask
            }     
        ]
    };
}
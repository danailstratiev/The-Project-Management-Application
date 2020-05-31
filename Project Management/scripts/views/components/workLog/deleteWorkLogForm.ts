import { closeModal } from "../../../utilities/helpers";
import { deleteWorkLog } from "../../../controllers/workLogController";

export default function deleteWorkLogForm():any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3 class="deleteMessage">Do you want to delete this item?</h3>
        </header>
        <form>
            <input type="hidden" id="deleteWorklogId">
            <input type="hidden" id="deleteWorklogTaskId">
            <input type="hidden" id="deleteWorklogProjectId">

            <div class="delete-form-button">
                <button class="delete-form-btn no-btn" id="worklogSaver">No</button>
                <button class="delete-form-btn yes-btn" id="worklogDeletor">Yes</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'worklogSaver',
                eventType: 'click',
                callback: closeModal
            },
            {
                targetId: 'worklogDeletor',
                eventType: 'click',
                callback: deleteWorkLog
            }     
        ]
    };
}
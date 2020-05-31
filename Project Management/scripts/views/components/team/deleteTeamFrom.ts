import { deleteTeam } from "../../../controllers/teamController";
import { closeModal } from "../../../utilities/helpers";

export default function deleteTeamForm():any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3 class="deleteMessage">Do you want to delete this item?</h3>
        </header>
        <form>
            <input type="hidden" id="deleteTeamId">

            <div class="delete-form-button">
                <button class="delete-form-btn no-btn" id="teamSaver">No</button>
                <button class="delete-form-btn yes-btn" id="teamDeletor">Yes</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'teamSaver',
                eventType: 'click',
                callback: closeModal
            },
            {
                targetId: 'teamDeletor',
                eventType: 'click',
                callback: deleteTeam
            }     
        ]
    };
}
import { submitTeamForm, deleteTeam } from "../../../controllers/teamController";
import { closeModal } from "../../../utilities/helpers";
import { deleteUser } from "../../../controllers/userController";

export default function deleteUserForm():any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3 class="deleteMessage">Do you want to delete this item?</h3>
        </header>
        <form>
            <input type="hidden" id="deleteUserId">

            <div class="delete-form-button">
                <button class="delete-form-btn no-btn" id="userSaver">No</button>
                <button class="delete-form-btn yes-btn" id="userDeletor">Yes</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'userSaver',
                eventType: 'click',
                callback: closeModal
            },
            {
                targetId: 'userDeletor',
                eventType: 'click',
                callback: deleteUser
            }     
        ]
    };
}
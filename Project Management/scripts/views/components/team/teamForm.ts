import { submitTeamForm } from "../../../controllers/teamController";

export default function teamForm(action):any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3>${action} Team</h3>
        </header>
        <form>
            <input type="text" id="teamTitle" placeholder="First name">
            <input type="hidden" id="teamId">

            <div class="form-button">
                <button class="form-btn" id="teamEditor">${action} Team</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'teamEditor',
                eventType: 'click',
                callback: submitTeamForm
            }   
        ]
    };
}
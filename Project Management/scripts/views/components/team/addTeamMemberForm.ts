import { submitMemberForm } from "../../../controllers/teamController";


export default function addTeamMemberForm():any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3>Assign User to Team</h3>
        </header>
        <form>
            <input type="text" id="newMemberId" placeholder="ID">
            <input type="hidden" id="currentTeamId">
            <div class="form-button">
                <button class="form-btn" id="teamAssigner">Assign User</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'teamAssigner',
                eventType: 'click',
                callback: submitMemberForm
            }   
        ]
    };
}
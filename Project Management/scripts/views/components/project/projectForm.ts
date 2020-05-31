import { submitProjectForm } from "../../../controllers/projectController";

export default function projectForm(action):any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3>${action} Project</h3>
        </header>
        <form>
            <input type="text" id="projectTitle" placeholder="First name">
            <input type="hidden" id="projectId">
            <textarea name="projectDescription" id="projectDescription" ></textarea>
            <div class="form-button">
            <button class="form-btn" id="projectEditor">${action} Project</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'projectEditor',
                eventType: 'click',
                callback: submitProjectForm
            }
        ]
    };
}
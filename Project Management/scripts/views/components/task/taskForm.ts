import { submitProjectForm } from "../../../controllers/projectController";
import { submitTaskForm } from "../../../controllers/taskController";

export default function taskForm(action):any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3>${action} Task</h3>
        </header>
        <form>
            <input type="text" id="taskTitle" placeholder="First name">
            <input type="hidden" id="taskId">
            <textarea name="projectDescription" id="taskDescription" cols="20" rows="10" placeholder="Description"></textarea>
            <select name="taskStatus" id="taskStatus">
                <option value="Pending">Pending</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
            </select>
            <input type="text" id="taskAssignee" placeholder="Assignee">
            <div class="form-button">
                <button class="form-btn" id="taskEditor">${action} Task</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'taskEditor',
                eventType: 'click',
                callback: submitTaskForm
            }
        ]
    };
}
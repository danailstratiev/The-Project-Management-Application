import { createWorkLog } from "../../controllers/workLogController";


export default function workLogs():any{

    return {
        template:`
    <section class="page-intro">
        <header>
            <h2>Task</h2>
        </header>
        <section class="project-description">
            <div class="task-status">
                <h3 id="currentTaskTitle"></h3>
                <span class="currentTaskStatus" id="taskCurrentStatus"></span>
            </div>
            <div>
            <input type="hidden" id="currentTaskId">
            <input type="hidden" id="currentTaskProjectId">
            <p id="worklogTaskDesctiption"></p>
            </div>
        </section>
    </section>
    <section class="central-content">
        <header class="central-header">
            <h2>Work Log</h2>
            <button class="create-btn" id="workLogCreator">+ Log Work</button>
        </header>
        <section class="project-tasks" id="workLogsContainer">
              
        </section>
    </section>
        `,
        listeners:[
            {
                targetId: 'workLogCreator',
                eventType: 'click',
                callback: createWorkLog
            }   
        ]
    };
}
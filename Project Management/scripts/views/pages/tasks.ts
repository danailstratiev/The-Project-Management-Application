import { createTask } from "../../controllers/taskController";


export default function tasks():any{
    return {
        template:`
    <section class="page-intro">
        <header>
            <h2>Project</h2>
        </header>
        <section class="project-description">
            <h3 id="currentProjectTitle">   </h3>
            <p id="currentProjectDescription"></p>
            <input type="hidden" id="currentProjectId">
        </section>
    </section>
    <section class="central-content">
        <header class="central-header" id="tasksHeader">
            <h2>Tasks</h2>
        </header>
        <section class="project-tasks" id="tasksContainer">
            
        </section>
    </section>
        `,
        listeners:[
            // {
            //     targetId: 'taskCreator',
            //     eventType: 'click',
            //     callback: createTask
            // }     
        ]
    };
}
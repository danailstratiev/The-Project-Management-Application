import { createProject } from "../../controllers/projectController";


export default function projects():any {
    return {
        template: `
    <header>
        <h2>Dashboard</h2>
    </header>
    <section class="dashboard">                
        <div class="dashboard-data">
            <h3 id="allProjectsCount">0</h3>
            <p id="allProjectsLine">Total Projects</p>
        </div>
        <div class="dashboard-data">
            <h3 id="pendingTasksCount">0</h3>
            <p id="pendingTasks">Pending Tasks</p>
        </div>
        <div class="dashboard-data">
            <h3 id="assignedTasksCount">0</h3>
            <p id="assignedTasks">Assigned Tasks</p>
        </div>
        <div class="dashboard-data">
            <h3 id="workTime">0</h3>
            <p>Hours Logged</p>
        </div>
    </section>

    <section class="central-content">
        <header class="central-header">
            <h2>Project</h2>
            <button class="create-btn" id="projectCreator">+ CREATE PROJECT</button>
        </header>
        <section class="current-projects" id="currentProjects">
            
        </section>
    </section>        
        `,
    listeners:[
        {
            targetId: 'projectCreator',
            eventType: 'click',
            callback: createProject
        } 
    ]
    };
}
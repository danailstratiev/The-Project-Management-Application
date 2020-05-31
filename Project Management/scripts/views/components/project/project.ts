

export default function project():any {
    return {
        template: `
    <section class="project-info">
        <header>
            <h2>Project</h2>
        </header>
        <section class="project-description">
            <h3>Title</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic voluptatem ea est, enim inventore necessitatibus officia blanditiis facilis dolorem asperiores nostrum iste quam dignissimos. Quod reprehenderit eveniet nulla quibusdam non.</p>
        </section>
    </section>
    <section class="tasks-info">
        <header class="tasks-header">
            <h2>Tasks</h2>
            <button class="create-task-btn">+ CREATE TASK</button>
        </header>
        <section class="project-tasks">
            <section class="current-task-info">
                <header class="task-header">
                    <div class="task-status">
                        <h3>Title - Assignee</h3>
                        <p>Status</p>
                    </div>
                    <div class="task-btns">
                        <button class="edit-btn"></button>
                        <button class="delete-btn"></button>
                    </div>
                </header>
                <section class="task-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur officiis nisi mollitia minus, cupiditate facere vero dolorem. Numquam, dolorum. Repellendus necessitatibus suscipit pariatur enim repudiandae soluta sit consequatur rerum provident.</p>
                </section>
            </section>
            <section class="current-task-info">
                <header class="task-header">
                    <div class="task-status">
                        <h3>Title - Assignee</h3>
                        <span>Status</span>
                    </div>
                    <div class="task-btns">
                        <button class="edit-btn"></button>
                        <button class="delete-btn"></button>
                    </div>
                </header>
                <section class="task-description">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur officiis nisi mollitia minus, cupiditate facere vero dolorem. Numquam, dolorum. Repellendus necessitatibus suscipit pariatur enim repudiandae soluta sit consequatur rerum provident.</p>
                </section>
            </section>
        </section>
    </section>
        `,
        listeners:[

        ]
    };
}
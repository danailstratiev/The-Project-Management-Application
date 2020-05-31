import { submitUserForm } from "../../../controllers/userController";


export default function userForm():any {
    return {
        template: `
    <div class="site-form">
        <header>
            <h3>Create User/Edit User</h3>
        </header>
        <form>
            <input type="text" id="firstNameInput" placeholder="First name">
            <input type="text" id="lastNameInput" placeholder="Last name">
            <input type="text" id="usernameInput" placeholder="Username">
            <input type="text" id="passwordInput" placeholder="Password">
            <input type="hidden" id="userId">
            <div class="admin-checker">
                <p>
                    <input type="checkbox" id="isAdmin">
                </p>
                <p>Is admin</p>
            </div>
            <div class="form-button">
                <button class="form-btn" id="userEditor">Create/Edit</button>
            </div>
        </form>
    </div>
        `,
        listeners:[ 
            {
                targetId: 'userEditor',
                eventType: 'click',
                callback: submitUserForm
            }   
        ]
    };
}
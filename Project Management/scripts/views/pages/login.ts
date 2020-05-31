import {submitLoginForm} from '../../controllers/loginController';

export default function login():any{
    return {
        template: `
    <header class="site-nav">
        <div class="site-intro">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please  Sign in with your credentials</p>
        </div>
    </header>
    <main class="login-section">
        <header class="login-header">
            <h2>Project Management App</h2>
        </header>
        <div class="app-user-image">

        </div>
        <section class="login-form">
        <form >
            <div class="form-input">
                <input type="text" id="username" placeholder="Username">
                <input type="password" id="password" placeholder="Password">
            </div>
            <div class="login-form-btn">
                <button class="login-btn" id="signInBtn">SIGN IN</button>
            </div>
        </form>
        </section>
    </main>
        `,
        listeners:[
            {
                targetId: 'signInBtn',
                eventType: 'click',
                callback: submitLoginForm
            }
        ]
    };
}


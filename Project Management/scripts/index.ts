import { render } from "./utilities/helpers";
import login from "./views/pages/login";
import {main_container} from "./utilities/constants"
import '../styles/styles.css';
import '../styles/common.css';
import '../styles/loginForm.css';
import '../styles/dashboard.css';
import '../styles/table.css';
import '../styles/modal.css';
import '../styles/userForm.css';
import '../styles/project.css';
 


window.addEventListener('DOMContentLoaded', init);
function init(): void {
    render('.' +main_container,login());    
  }
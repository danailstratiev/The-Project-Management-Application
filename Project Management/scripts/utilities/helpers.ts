import {Listener, LoggedUser} from './types';
import AuthenticationService from '../services/authenticationService';
import adminView from '../views/navigation/adminView';
import userView from '../views/navigation/userView';

export function render(selector, renderData: {template: string, listeners: Listener[]}):void{
    const container: HTMLElement = (document.querySelector(selector) as HTMLElement);
    container.innerHTML = renderData.template;

    if (renderData && renderData.listeners && renderData.listeners.length) {
        for (const listener of renderData.listeners) {
            const target: HTMLElement = (document.getElementById(listener.targetId) as HTMLElement);
            target.addEventListener(listener.eventType, listener.callback);
        }
    }
}

export function modal(renderData: {template: string, listeners: Listener[]}):void {
    const modal: HTMLDivElement = document.createElement('div');
    modal.classList.add('modal');

    const modalContent: HTMLDivElement = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = renderData.template;

    modal.appendChild(modalContent);
    const container = document.getElementsByClassName('container')[0];
    container.appendChild(modal);
    modal.style.display = 'block';

    window.onclick = function(event) {
        if (event.target == modal) {
            container.removeChild(modal);
        }
    }

    if (renderData && renderData.listeners && renderData.listeners.length) {
        for (const listener of renderData.listeners) {
            const target: HTMLElement = (document.getElementById(listener.targetId) as HTMLElement);
            target.addEventListener(listener.eventType, listener.callback);
        }
    }
}

export function closeModal():void{
    let modal:HTMLElement = document.getElementsByClassName('modal')[0] as HTMLElement;
    let container:HTMLElement = document.getElementsByClassName('container')[0] as HTMLElement;
    container.removeChild(modal);
}

//We use this function to create various HTML elements
export function createHTMLelement(tagname:string, className:string, innerHtml:string, attributes:Array<{key,value}>,event:{name, func}):HTMLElement{
    let element:HTMLElement = (document.createElement(tagname) as HTMLElement);

    if(className){
        element.classList.add(className);
    }

    if(innerHtml){
        element.innerHTML = innerHtml;
    }

    if(attributes){
        attributes.forEach((a) => element.setAttribute(a.key, a.value));
    }

    if (event) {
        element.addEventListener(event.name, event.func);
    }

    return element;
}

export function handleNavigation():void {
    const loggedUser: LoggedUser = AuthenticationService.getLoggedUser();

    if (loggedUser.isAdmin) {
        render('.project-nav', adminView());
    } else {
        render('.project-nav', userView());
    }
}

export function openNav():void {
    document.getElementById("mySidenav").style.display = "block";
}
  
export function closeNav():void {
    document.getElementById("mySidenav").style.display = "none";
}
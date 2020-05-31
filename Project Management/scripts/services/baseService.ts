import AuthenticationService from './authenticationService';
import {base_url} from '../utilities/constants';

export default class BaseService{
    protected url:string;
    constructor(url:string){
        this.url = url;
    }

    public async getAll(){
        const response = await fetch(`${base_url}${this.url}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            }
        });

        return response.json();
    }

    public async getById(id:string){
        const response = await fetch(`${base_url}${this.url}/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            }
        });

        return response.json();
    }
    
    public async addItem(item:any){
        await fetch(`${base_url}${this.url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)
        });
    }

    public async editItem(item:any){
        await fetch(`${base_url}${this.url}/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)  
        });
    }

    public async deleteItem(id:string){
        await fetch(`${base_url}${this.url}/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            }
        })
    }

    public async assignItem(id:string, item:any){
        
        await fetch(`${base_url}${this.url}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(item)
        });
    }
}
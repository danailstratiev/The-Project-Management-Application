import BaseService from "./baseService";
import {projects_url, base_url, team_url} from "../utilities/constants";
import AuthenticationService from "./authenticationService";

class ProjectService extends BaseService {
    constructor() {
        super(projects_url);
    }

    public async getProjectTeams(id){
        const response = await fetch(`${base_url}${this.url}/${id}${team_url}s`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            } 
        });

        return response.json();
    }
}

export default new ProjectService();
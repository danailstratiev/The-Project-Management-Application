import BaseService from "./baseService"
import {team_url, base_url, members_url} from "../utilities/constants";
import AuthenticationService from "./authenticationService";

class TeamService extends BaseService{
    constructor() { 
        super(team_url)       
    }

    public async getTeamMembers(id){
        const response = await fetch(`${base_url}${this.url}/${id}${members_url}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: AuthenticationService.getAuthorizationHeader()
            }
        });

        return response.json();
    }
}

export default new TeamService();
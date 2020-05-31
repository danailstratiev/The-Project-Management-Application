import BaseService from '../services/baseService';
import {users_url} from '../utilities/constants';

class UserService extends BaseService{
    constructor(){
        super(users_url);
    }
}

export default new UserService();
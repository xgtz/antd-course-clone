import request from '../util/request'

export function queryLoginControls(){
    return request('/api/loginControls');
}
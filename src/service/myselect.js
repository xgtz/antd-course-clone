import request from '../util/request'

export function queryOptions(){
    return request('/api/myselectoptions')
}

export function queryFormContols(){
    return request('/api/formcontrols')
}
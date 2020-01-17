import * as loginService from '../service/login';

export default{
    namespace:'login',
    state:{
        controls:[]
    },
    effects:{
        *queryControls({_},{call,put}){
            const rsp = yield call ( loginService.queryLoginControls);
            yield put({type:'initControls',payload:{controls: rsp.result}});
        }
    },
    reducers:{
        initControls(state,{payload:{controls}}){
            return {
                ...state,
                controls
            }
        }
    }
}
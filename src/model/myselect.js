import * as myselectService from '../service/myselect'

export default{
    namespace:'myselect',
    state:{
        options:[],
        defaultValue:'',
        formControls:[]
    },  
    effects:{
        *queryOptions({_},{call,put}){
            const rsp = yield call(myselectService.queryOptions)
            //console.log(rsp)
            yield put({type:'initOptions', payload:{options: rsp.result}})
            yield put({type:'setDefaultValue', payload:{val: '2'}})
        },
        *queryFormControl({_},{call,put}){
            //console.log('queryFormControl...')
            const rsp = yield call(myselectService.queryFormContols)
            yield put({type:'initFormControls',payload:{formControls: rsp.result}})
        }
    },
    reducers:{
        initOptions(state,{payload:{options}}){
            return {
                options,
                defaultValue: '',
                formControls:[]
            }
        },
        setDefaultValue(state,{payload:{val}}){
            var obj= {
                options:state.options,
                defaultValue: val,
                formControls:[]
            };
            //console.log(obj);
            return obj;
        },
        initFormControls(state,{payload:{formControls}}){
            var obj ={
                ...state,
                formControls:formControls
            }
            //console.log(obj.formControls)
            return obj;
        }
    }
}


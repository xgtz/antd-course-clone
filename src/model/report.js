import * as reportService from '../service/report';

export default{
    namepsace:'report',
    state:{
        reportColumns:[],
        reportList:[],
        formControls:[]
    },
    effects:{
        *queryReportColumns({payload},{call,put}){
            const rsp = yield call(reportService.queryReportColumns,payload);
           
            yield put({type:'saveReportColumns',payload:{reportColumns: rsp.result}});
        },
        *queryReportList({payload},{call,put}){
            const rsp = yield call (reportService.queryReports,payload);
            //console.log(rsp.result);
            yield put({type:'saveList',payload:{reportList: rsp.result}});
        },
        *queryFormControls({payload},{call,put}){
            const rsp = yield call(reportService.queryFormControls,payload);
            //console.log(rsp.result);
            yield put({type:'saveFormContorls',payload:{formControls: rsp.result}});
        }
    },
    reducers:{
        saveList(state,{payload:{reportList}}){
            return  {
                ...state,
                reportList
            }
        },
        saveReportColumns(state,{payload:{reportColumns}}){
            return {
                ...state,
                reportColumns
            }
        },
        saveFormContorls(state,{payload:{formControls}}){
            return {
                ...state,
                formControls
            }
        }
    }
}

import request from '../util/request'


export function queryReports(data){
    return request('/api/reports/query',{
      headers:{
        'content-type': 'application/json',
      },
      method:'POST',
      body:JSON.stringify(data),
    })

    // return request('/Report/Samples',{
    //   headers:{
    //     'content-type': 'application/json',
    //   },
    //   method:'POST',
    //   body:JSON.stringify(data),
    // })
  }  
  


  export function queryReportColumns(data){
    return request('/api/reports/columns');
  }

  export function queryFormControls(data){
    return request('/api/reports/formControls');
  }
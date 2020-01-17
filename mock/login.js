const data = [
    {
      'field': 'jobid',
      'text': '工号',
      'errorMessage': '请输入工号',
      'required': true,
      'type': 'int',
      'value': 100
    },{
      'field': 'date',
      'text': '日期',
      'errorMessage': '请输入日期',
      'required': false,
      'type': 'date',
      'value': '2017-10-20'
    },{
      'field': 'username',
      'text': '用户名',
      'errorMessage': '请输入用户名',
      'required': true,
      'type': 'char',
      'value': 'hello world'
    },{
      'field': 'customer',
      'text': '客户',
      'errorMessage': '请输入客户',
      'required': true,
      'type': 'select',
      'value': '2',
      'options': [
          {id:'1',text:'贝尔'},
          {id:'2',text:'中兴'},
          {id:'3',text:'烽火'},
      ]
    }
  ]

  export default {
      'get /api/loginControls':function(req,res,next){
          setTimeout( ()=>{
            res.json({
                result:data
            })
          },1000);
      }
  }
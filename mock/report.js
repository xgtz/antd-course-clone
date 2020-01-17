
const data = [];
for (let i = 0; i < 2000; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: i+10,
      address: `London, Park Lane no. ${i}`,
    });
  }

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
];


const formControls=[
  {
    field: 'jobid',
    text: '工号',
    errorMessage: '请输入工号',
    required: true,
    type: 'input',
    value: 100
  },{
    field: 'date',
    text: '日期',
    errorMessage: '请输入日期',
    required: false,
    type: 'date',
    value: '2017-10-20'
  },{
    field: 'username',
    text: '用户名',
    errorMessage: '请输入用户名',
    required: true,
    type: 'char',
    value: 'hello world'
  },{
    field: 'customer',
    text: '客户',
    errorMessage: '请输入客户',
    required: true,
    type: 'select',
    value: '2',
    options: [
        {id:'1',text:'贝尔'},
        {id:'2',text:'中兴'},
        {id:'3',text:'烽火'},
    ]
  }
];

export default{
    'post /api/reports/query':function(req,res,next){
        const {pageNum,pageSize,name,type} = req.body;
        //console.log(pageNum,page,name,type);
        let startNum= (pageNum -1)*pageSize;
        let endNum = pageNum*pageSize;
        //console.log(startNum,pageSize,data.length);
        var tmpData=data;
        tmpData = tmpData.filter(v => v.name.indexOf(name)>-1 );
        tmpData = tmpData.slice(startNum,endNum) ;
        setTimeout(()=>{
          res.json({
              result:tmpData
          })
        },3000)
        
    },
    // 'post /Report/Samples':function(req,res,next){
    //   const {pageNum,pageSize,name,type} = req.body;
    //   //console.log(pageNum,page,name,type);
    //   let startNum= (pageNum -1)*pageSize;
    //   let endNum = pageNum*pageSize;
    //   //console.log(startNum,pageSize,data.length);
    //   var tmpData=data;
    //   tmpData = tmpData.filter(v => v.name.indexOf(name)>-1 );
    //   tmpData = tmpData.slice(startNum,endNum) ;
    //   setTimeout(()=>{
    //     res.json({
    //         result:tmpData
    //     })
    //   },3000)
    // },
    'get /api/reports/columns':function(req,res,next){
      setTimeout(()=>{
          res.json({
              result:columns
          })
      },100)
    },

    'get /api/reports/formControls':function(req,res,next){
      setTimeout(()=>{
        res.json({
            result:formControls
        })
      },1000)
    }
}
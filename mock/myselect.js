const random_options=[
    {
        id:'1',
        text:'Jack'
    },
    {
        id:'2',
        text:'Lucy'
    },
    {
        id:'3',
        text:'Tom'
    }
]

const formControls=[
    {
        type:'1',
        field:'name',
        label:'名称',
        width:'100',
        required:true,
        actiontype:'',
        state:''
    },
    {
        type:'1',
        field:'desc',
        label:'描述',
        width:'100',
        required:false,
        actiontype:'',
        state:''
    },
    {
        type:'2',
        field:'type',
        label:'类型',
        width:'100',
        required:true,
        actiontype:'',
        state:''
    }
]

export default {
    'get /api/myselectoptions':function(req,res,next){
        setTimeout(()=>{
            res.json({
                result:random_options
            })
        },3000)
    },
    'get /api/formcontrols':function(req,res,next){
        setTimeout(()=>{
            res.json({
                result:formControls
            })
        },3000)
    }
}
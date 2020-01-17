import { Table, Button, Input,Select  } from 'antd';
import  style from  './report.less';
import { connect } from 'dva';
const { Option } = Select;
const namespace='report';

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

const mapStateToProps =(state) =>{
    return {
        reportLoading:state.loading.effects['report/queryReportList'],
        reportList:state[namespace].reportList,
        
    }
}
class Report extends React.Component {
    constructor(props){
        super(props);
    }
    params={
        pageNum:1,
        pageSize:100,
        name:'',
        type:'',
    }
    state={
        selectedRowKeys: [], 
        rowId:''
    }

    handleChange(key,value){
        this.params[key] = value;
        console.log(this.params);
        setTimeout(()=>{ this.forceUpdate();},10);
    }

    loadReportList(){
        this.props.dispatch({
            type:`${namespace}/queryReportList`,
            payload:{
                ...this.params
            }
        })
        
    }
    componentDidMount(){
        this.loadReportList();
    }

    start = () => {
        this.loadReportList();
    };

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    clickRow = (key,selectedRowKeys,event)=>{
        var keys=selectedRowKeys;
        if(keys.indexOf(key)<0)  {
        keys = keys.concat(key);
        } else{
            keys = keys.filter( item => item!=key);
        }
        this.setState({
        selectedRowKeys: keys,
        rowId: key
        })

    }

    render() {
        const { reportList,reportLoading} = this.props;
        const rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            onChange: this.onSelectChange
        };
    
    const paginationProps ={
        current:this.params.pageNum,
        pageSize:this.params.pageSize,
        pageSizeOptions:['50','100','200'],
        showSizeChanger:true,
        showQuickJumper:true,
        simple:false,
        total:2000,
        showTotal: total=> `共 ${total} 条`,
        onChange:(page,pageSize)=>{
            this.params.pageSize=pageSize;
            this.params.pageNum = page;
            this.loadReportList();
            
        },
        onShowSizeChange:(current,size) =>{
            this.params.pageSize=size;
            this.params.pageNum = 1;
            this.loadReportList();
        },
    }

    return (
            <div >
                <div style={{ marginBottom: 16 }}>
                    <Input style={{width:100}} placeholder="name..." onChange={event => this.handleChange('name',event.target.value)} />
                    <Select 
                        showSearch
                        style={{ width: 100, marginLeft:5 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }

                        onChange={ (value) => this.handleChange('type',value) }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                    <Button type="primary" style={{ marginLeft:5}} onClick={this.start} >
                        Reload
                    </Button>
                </div>
                <Table 
                    rowKey={record => {
                        return record.key
                    } }
                    loading={reportLoading}
                    rowSelection={rowSelection} 
                    columns={columns} 
                    dataSource={reportList} 
                    bordered 
                    scroll={{ y: 240 }}
                    size="small"
                    pagination={paginationProps}
                    onRow = {(record) =>{
                        return {
                            onClick:this.clickRow.bind(this,record.key,this.state.selectedRowKeys)
                        }
                    }}
                    rowClassName ={ (record,index)=>{
                        let className = index % 2 ? 'shallow_gray': 'deep_gray';
                        return record.key === this.state.rowId ? className + ' clickRowStyl' : className;
                    }}
                />
            </div>

    );
  }
}

 export default connect(mapStateToProps)(Report);

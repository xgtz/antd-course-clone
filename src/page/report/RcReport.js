import React from 'react';
import { Table, Button, Input,Select,Modal,Form,Tabs,Row,Col, Upload,Icon,Spin, message } from 'antd';
// import { Document,Page } from 'react-pdf';
import RcTable from '../common/RcTable';
import BuildForm from '../common/BuildForm';
import { connect } from 'dva';
import RcReportClass from './RcReport.less';
import moment from 'moment';
import reqwest from 'reqwest';
const { Option } = Select;
const { TabPane } = Tabs;
const namespace='report';





const mapStateToProps =(state) =>{
    return {
        reportLoading:state.loading.effects['report/queryReportList'],
        reportDataSrouce:state[namespace].reportList,
        reportColumns:state[namespace].reportColumns,
        formControls:state[namespace].formControls
    }
}

let dateControls=['date']

class RcReport extends React.Component {
    constructor(props){
        super(props);
    }
    state={
        deskDivWidth:800,
        deskHeight: document.body.clientHeight,
        dataSource:[],  
        selectedKey:'',
        selectedRows:[],
        selectedRowKeys:[],
        newModelVisible:false,
        editModelVisible:false,
        fileList:[],
        fileNameList:[],
        uploading:false,
        params:{
            pageNum:1,
            pageSize:100,
            name:'',
            type:'',
        }
    }

    handleChange(key,value){
        this.state.params[key] = value;
        setTimeout(()=>{ this.forceUpdate();},10);
    }

    loadReportColumns(){
        this.props.dispatch({
            type:`${namespace}/queryReportColumns`
        })
    }
    loadReportList(){
        this.props.dispatch({
            type:`${namespace}/queryReportList`,
            payload:{
                ...this.state.params
            }
        })
    }
    loadFormControls(){
        this.props.dispatch({
            type:`${namespace}/queryFormControls`,
        })
    }
    componentDidMount(){
        window.addEventListener('resize', this.handleSize);
        this.loadReportColumns();
        this.loadReportList();
        this.loadFormControls();
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleSize);
    }

    handleSize=()=>{
        this.setState({
            deskHeight:document.body.clientHeight,
        });
    
    }

    search = () => {
        this.loadReportList();
    };
    showModal=()=>{
        this.setState({newModelVisible:true});
    };

    showEditModal=()=>{
        this.setState({editModelVisible:true});
    };
    // 模态对话框OK
    handleOk=()=>{
        this.props.form.validateFields((err,values) =>{
            if(err)  return;
            let data = values;
            Object.keys(data).forEach(function(key){
                if(dateControls.indexOf(key)>-1){
                    data[key]= moment(data[key]).format('YYYY-MM-DD');
                }
            })
            console.log(data);
            this.setState({newModelVisible:false});
        })
    };
    // 模态对话框取消
    handleCancel=()=>{
        this.props.form.resetFields();
        this.setState({newModelVisible:false});
    }

    handleOkEdit=()=>{
        this.props.form.validateFields((err,values) =>{
            if(err)  return;
            let data = values;
            Object.keys(data).forEach(function(key){
                if(dateControls.indexOf(key)>-1){
                    data[key]= moment(data[key]).format('YYYY-MM-DD');
                }
            })
            console.log(data);
            this.setState({editModelVisible:false});
        })
    };
    handleCancelEdit=()=>{
        this.props.form.resetFields();
        this.setState({editModelVisible:false});
    }

    handleUpload = () =>{
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });
        formData.append('username','abc123');

        this.setState({
            uploading: true,
        });

        reqwest({
            url: '/Home/Upload',
            method: 'post',
            processData: false,
            data: formData,
            success: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('upload successfully.');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            },
        });
    };

    render() {
        const { newModelVisible,editModelVisible,deskHeight,uploading,fileList } = this.state;
        const { reportDataSrouce,reportLoading,reportColumns,formControls} = this.props;
        const { getFieldDecorator } = this.props.form;
        let columns = reportColumns;
        reportColumns.forEach( v=>{
            v.sorter = (a, b) => a.age - b.age;
        });
        // console.log(reportColumns);
        const uploadProps = {
            onRemove: file => {
                this.setState(state => {
                  const index = state.fileList.indexOf(file);
                  const newFileList = state.fileList.slice();
                  newFileList.splice(index, 1);
                  return {
                    fileList: newFileList,
                  };
                });
              },
              beforeUpload: file => {
                this.setState(state => ({
                  fileList: [...state.fileList, file],
                }));
                this.setState(state=>({
                  fileNameList:[...state.fileNameList,file.name]
                }));
                return false;
              },
              fileList,
              multiple:true
          };


        let height = deskHeight - 160;
        const pagination={
            current:this.state.params.pageNum,
            pageSize:this.state.params.pageSize,
            pageSizeOptions:['50','100','200'],
            showSizeChanger:true,
            showQuickJumper:true,
            simple:false,
            total:2000,
            showTotal: total=> `共 ${total} 条`,
            onChange:(page,pageSize)=>{
                this.state.params.pageSize=pageSize;
                this.state.params.pageNum = page;
                this.loadReportList();
                
            },
            onShowSizeChange:(current,size) =>{
                this.state.params.pageSize=size;
                this.state.params.pageNum = 1;
                this.loadReportList();
            },
        }
        return (
                <div style={{ marginBottom: 2,overflow:'hidden' }}  >
                    <div style={{ marginBottom: 0, height:35 }}>
                        <Row>
                            <Col span={12}>
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
                                <Button type="primary" style={{ marginLeft:5}} onClick={this.search} >
                                    查询
                                </Button>
                                <Button type="primary" style={{marginLeft:5}} onClick={this.showModal}>
                                    新建
                                </Button>
                                <Button type="primary" style={{marginLeft:5}} onClick={this.showEditModal}>
                                    编辑
                                </Button>
                            </Col>
                            <Col span={12} >
                                <div style={{ backgroundColor:'#C2C2C2',height:35, fontSize:18,paddingTop:3,paddingLeft:2 }}>
                                    信息:
                                </div>
                            </Col>
                        </Row>
                        
                    </div>
                    <div style={{overflow:'hidden', overflowY:'hidden'}} id="divReport">

                        <Row>
                            <Col span={12}>
                               
                                <Spin size="large" spinning={reportLoading} tip="加载中..." >
                                    <RcTable 
                                        that={this}
                                        // loading={reportLoading}
                                        selecekeys={this.state.selectedRowKeys}
                                        rowSelection="checkbox"
                                        columns={reportColumns}
                                        dataSource={reportDataSrouce}
                                        pagination={pagination}
                                        yscroll={height }
                                    />
                                </Spin>
                            </Col>
                            <Col span={12}>
                                <Tabs tabPosition="right">
                                    <TabPane tab="Tab 1" key="1">
                                        Content of Tab 1
                                    </TabPane>
                                    <TabPane tab="Tab 2" key="2">
                                        <iframe 
                                            src="http://localhost:5026/1.pdf#toolbar=0&statusbar=0"
                                            style={{ width:'100%',height:height}} />
                                    </TabPane>
                                    <TabPane tab="Tab 3" key="3">
                                            <div>
                                                <div style={{ float:'left',width:120}}>
                                                    <Upload {...uploadProps}>
                                                        <Button>
                                                            <Icon type="upload" /> 选择文件
                                                        </Button>
                                                    </Upload>
                                                </div>
                                                <div style={{ float:'left',width:100}}>
                                                    <Button
                                                        type="primary"
                                                        onClick={this.handleUpload}
                                                        disabled={fileList.length === 0}
                                                        loading={uploading}
                                                        style={{ marginTop: 0 }}
                                                    >
                                                        {uploading ? 'Uploading' : 'Start Upload'}
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>

                                            </div>
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                        
                    </div>

                    <Modal 
                        title="新建记录"
                        visible={newModelVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        width={500}
                        destroyOnClose={true}
                    >
                        <BuildForm 
                            formControls={formControls}
                            getFieldDecorator={getFieldDecorator}
                        /> 
                    </Modal>

                    <Modal 
                        title="修改记录"
                        visible={editModelVisible}
                        onOk={this.handleOkEdit}
                        onCancel={this.handleCancelEdit}
                        width={500}
                        destroyOnClose={true}
                    >
                        <BuildForm 
                            formControls={formControls}
                            getFieldDecorator={getFieldDecorator}
                        /> 
                    </Modal>
                </div>

        );
  }
}

 export default connect(mapStateToProps)(Form.create()(RcReport));

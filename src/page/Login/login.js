import React,{ Component } from 'react';
import {Row, Col, Form,InputNumber,Input,DatePicker, Button,Select } from 'antd';
import {connect } from 'dva';
import {switchItem} from  '../common/switchItem';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
// const Option = Select.Option;
const namespace="login";


const mapStateToProps = (state)=>{
    return {
        data:state[namespace].controls
    }
}

  const formItemLayout ={
      labelCol:{
          xs:{span:24},
          sm:{span:6},
      },
      wrapperCol:{
          xm:{span:24},
          sm:{span:14}
      }
  }


const tailFormItemLayout={
    wrapperCol:{
        xs:{
            span:24,
            offset:0
        },
        sm:{
            span:14,
            offset:6
        }
    }
}  

const formLayout={
    width:400,
    height:500,
    marginTop:100,
    marginLeft:'auto',
    marginRight:'auto'
}


class Login extends Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err,values) =>{
            if(!err){
                Object.keys(values).forEach(function(k){
                    if('date' == k){
                        console.log(k,':',moment(values[k]).format('YYYY-MM-DD'));
                    } else{
                        console.log(k,':',values[k]);
                    }
                    
                });

                console.log(values);
            }
        })
    }
    componentDidMount(){
        this.props.dispatch({
            type:`${namespace}/queryControls`
        })
    }

    render(){
        const { data } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Row>
                <Col span={12}>
                    <Form  onSubmit={this.handleSubmit} style={formLayout} >
                        {
                            data.map( (item,index) =>{
                                item.value = item.type == 'date' ? moment(item.value, 'YYYY-MM-DD') : item.value;
                                return (
                                    <FormItem
                                        key={index}
                                        {...formItemLayout}
                                        label={item.text}
                                        hasFeedback
                                        style={{ marginBottom:'2px' }}
                                    >
                                        {getFieldDecorator(item.field,{
                                            initialValue: item.value,
                                            rules:[{
                                                required: item.required,
                                                message:item.errorMessage
                                            }]
                                        })(
                                            switchItem(item)
                                        )}
                                    </FormItem>
                                )
                            })
                        }
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col span={12}>

                </Col>
                </Row>
            </div>
            
        )
    }
}

export default connect(mapStateToProps)( Form.create()(Login));
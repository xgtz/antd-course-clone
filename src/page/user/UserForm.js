import React,{ Component } from 'react'
import PropTypes from 'prop-types';
import {Form, Button,Select } from 'antd'
import * as FormContorlHelper from '../common/FormControlItem';
import { FormItemLayout_Helper } from '../common/FormItemLayout';
import {connect } from 'dva'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item
const Option = Select.Option


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
          {
            id:'1',text:'贝尔'
          },
          {
            id:'2',text:'中兴' 
          },
          {
            id:'3',text:'烽火'
          }

      ]
    }
  ]

 

  const formLayout={
      with:400,
      marginTop:100,
      marginLeft:'auto',
      marginRight:'auto'
  }


class UserForm extends Component{

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.form.validateFields((err,values) =>{
            if(!err){
                console.log('Received values of form: ', values)
            }
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} style={formLayout}>
                {
                    data.map( (item,index) => {
                        item.value = item.type == 'date' ? moment(item.value, 'YYYY-MM-DD') : item.value;
                        return (
                            <FormItem
                                key={index}
                                {...FormItemLayout_Helper.formItemLayout_inner}
                                label={item.text}
                                hasFeedback
                            >
                                {getFieldDecorator(item.field,{
                                    initialValue: item.value,
                                    rules:[{
                                        required: item.required,
                                        message: item.errorMessage
                                    }]
                                })(
                                    FormContorlHelper.switchItem(item)
                                )}
                            </FormItem>
                        )
                    })
                }
                <FormItem {...FormItemLayout_Helper.tailFormItemLayout_inner}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </FormItem>
            </Form>
        )
    }
}  


export default (Form.create()(UserForm));
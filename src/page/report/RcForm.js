import React from 'react';
import BaseForm from './BaseForm';
import moment from 'moment';
import {message } from 'antd';
const formList= [
    {
        type: "select",
        label: "机型",
        initialValue: "1",
        placeholder: "请选择您的机型",
        width: "200px",
        field:"iphone",
        list: [{id:"1",name:"IphoneX"}, {id:"2",name:"Ihonexs"},{id:"3",name:"IhoneXsMax"}],
        required: true,
        errorMessage: '请选择机型',
        
    },
    {
        type: "input",
        label: "备注",
        initialValue: "oncare",
        placeholder: "请填写你的备注",
        width: "200px",
        field:"text",
        required: true,
        errorMessage: '请填写备注信息',
    },
    {
        type: "checkbox",
        label: "isCare",
        initialValue: true,
        placeholder: "请填写你的备注",
        width: "200px",
        field:"isCare",

    },
    {
        type: "date",
        label: "查询时间",
        initialValue: "2018-09-09 02:02:02",
        placeholder: "请填写你的时间",
        width: "200px",
        field:"isStart",
        required: true,
        errorMessage: '请填写查询时间',
    },
]

let dateControls=["isStart"]

class RcForm extends React.Component{
    constructor(props){
        super(props);
    }
    submitForm(data){
        Object.keys(data).forEach(function(key){
            if(dateControls.indexOf(key)>-1){
                data[key]= moment(data[key]).format('YYYY-MM-DD');
            }
        })
        console.log(data);
        message.success('保存成功!');
    }

    render(){
        return (
            <BaseForm formList={formList}  formSubmit={this.submitForm}  />
        )
    }

}


export default RcForm;
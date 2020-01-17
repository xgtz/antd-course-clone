import React,{ Component } from 'react';
import {Select,Form,Radio,Checkbox,Button,Input,InputNumber,DatePicker} from 'antd';
import OptionList from '../common/OptionList';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';


export const formItemLayout={
    labelCol:{
        xs:{span:24},
        sm:{span:6},
    },
    wrapperCol:{
        xm:{span:24},
        sm:{span:14}
    }
}

class BuildForm extends Component{
    constructor(props){
        super(props);
    }

    switchItem=(item)=>{
        const type = item.type;
        switch(type){
            case 'int':
                return <InputNumber style={{ width:'100%'}} />
            case 'char':
                return <Input />;
            case 'input':
                return <Input />;
            case 'date':
                return <DatePicker style={{ width:'100%'}} format={dateFormat} />;
            case 'select':
                return (
                    <Select>
                        {
                            item.options.map((option,index) =>{
                                return ( <Option key={index} value={option.id} >{option.text}</Option> )
                            })
                        }
                    </Select>
                )
            default:
                return <Input />;
        }
    }
    initFormList= ()=>{
        const { getFieldDecorator } = this.props;
        const formControls = this.props.formControls;
        let formItemList=[];

        if(formControls && formControls.length>0){
            formControls.map((item,index) =>{
                item.value = item.type == 'date' ? moment(item.value, 'YYYY-MM-DD') : item.value;
                const formItem = 
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
                            this.switchItem(item)
                        )}
                    </FormItem>
                formItemList.push(formItem);
            })
        }

        return formItemList;
    };

    render(){
        return (
            <Form>
                {this.initFormList()}
            </Form>
        )
    }
}

export default BuildForm;
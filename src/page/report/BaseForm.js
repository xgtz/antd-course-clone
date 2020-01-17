import Rect,{Component } from 'react';
import {Select,Form,Radio,Checkbox,Button,Input,DatePicker} from 'antd';
import OptionList from '../common/OptionList';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;

const baseform_formItemLayout ={
    labelCol:{
        xs:{span:24},
        sm:{span:6},
    },
    wrapperCol:{
        xm:{span:24},
        sm:{span:14}
    }
}


const baseform_tailFormItemLayout={
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
    // width:400,
    // height:500,
    // marginTop:100,
    marginLeft:'auto',
    marginRight:'auto'
}

class BaseForm extends Component{

    handleSubmit = ()=>{
        const { getFieldsValue } = this.props.form;
        // let date1 = getFieldsValue();
        // date1.isStart= moment(date1.isStart).format('YYYY-MM-DD');
        this.props.formSubmit(getFieldsValue());         //最终 向后端输出；
    };

    reset= ()=>{
        // form 表单的固定方法
        this.props.form.resetFields();
    };

    initFormList= ()=>{
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        let formItemList=[];

        if(formList && formList.length>0){
            formList.map((item,index) =>{
                let initialValue = item.initialValue || '';
                let label = item.label;
                let placeholder = item.placeholder;
                let width = item.width;
                let list = item.list ||[];   // option
                let field = item.field;
                let required = item.required;
                let message = item.errorMessage;
                if(item.type ==="input"){
                    const input =
                        <FormItem 
                            label={label} 
                            key={field} 
                            {...baseform_formItemLayout} 
                            style={{ marginBottom:'2px' }}>
                            {getFieldDecorator(field,{
                                initialValue: initialValue,
                                rules:[{
                                    required: required,
                                    message:message
                                }]
                            })(
                                <Input placeholder={placeholder} style={{width:width}} />
                            )}
                        </FormItem>
                    formItemList.push(input);

                }else if(item.type ==="select"){
                    const select = 
                        <FormItem 
                            label={label} 
                            key={field} 
                            {...baseform_formItemLayout} 
                            style={{ marginBottom:'2px' }}>
                            {getFieldDecorator(field,{
                                initialValue:initialValue,
                                rules:[{
                                    required: required,
                                    message:message
                                }]
                            })(
                                <Select style={{ width: width}} placeholder={placeholder}>
                                    {OptionList.OptionList(list)}
                                </Select>
                            )}
                        </FormItem>
                    formItemList.push(select);
                }else if(item.type ==="checkbox"){
                    const checkbox = 
                        <FormItem 
                            label={label} 
                            key={field} 
                            {...baseform_formItemLayout}
                            style={{ marginBottom:'2px' }} >
                            {getFieldDecorator(field,{
                                valuePropName:"checked",
                                initialValue:initialValue,
                                rules:[{
                                    required: required,
                                    message:message
                                }]
                            })(
                                <Checkbox>{label}</Checkbox>
                            )}
                        </FormItem>
                    formItemList.push(checkbox);
                }else if(item.type==="date"){
                    const dateComponent = 
                        <FormItem 
                            label={label} 
                            key={field} 
                            {...baseform_formItemLayout}
                            style={{ marginBottom:'2px' }} >
                            {getFieldDecorator(field,{
                                initialValue:moment(initialValue,'YYYY-MM-DD'),
                                rules:[{
                                        required: required,
                                        message:message
                                    }]
                            })(
                                <DatePicker
                                    showTime
                                    format="YYYY-DD-DD"
                                    placeholder={placeholder} 
                                />
                            )}
                        </FormItem>
                    formItemList.push(dateComponent);
                }
            })
        }

        return formItemList;
    };

    render(){
        return (
            <Form style={formLayout}>
                {this.initFormList()}
                <FormItem {...baseform_tailFormItemLayout}>
                    <Button type="primary" onClick={()=>{this.handleSubmit()}}>
                        确定
                    </Button>
                    <Button onClick={()=>{this.reset()}} style={{ marginLeft:5}}>
                        重置
                    </Button>
                </FormItem>
            </Form>
        )
    }

}

export default Form.create()(BaseForm);

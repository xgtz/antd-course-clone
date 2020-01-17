import { InputNumber,Input, DatePicker,Select  } from "antd";
import moment from 'moment';
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
export function  switchItem(item){
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



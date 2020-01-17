import React,{ Component } from 'react'
import { Table,Modal,Button,Form, Select,Input } from 'antd'
import {connect } from 'dva'

const { Option } = Select;


const namespace="myselect";

const mapStateToProps= (state) =>{

    return {
        myoptions:state[namespace].options,
        defaultValue:state[namespace].defaultValue,
        formControls:state[namespace].formControls
    }
}


 class MySelect extends Component{
    onChange=(value) =>{
        console.log(`selected ${value}`)
    }

    onBlur = ()=>{
        console.log('blur')
    }

    onFocus = ()=>{
        console.log('focus')
    }

    onSearch = (val) =>{
        console.log('search:',val)
    }
    componentDidMount() {
        this.props.dispatch({
          type: `${namespace}/queryOptions`,
        });

        this.props.dispatch({
            type: `${namespace}/queryFormControl`,
        });
    }

    render(){

        const {form:{getFieldDecorator}} = this.props;

        return (
            <div>
                <h1>带搜索功能的下拉框</h1>
                <Select
                    showSearch
                    style={{ width:200}}
                    placeholder="select a person"
                    optionFilterProp = "children"
                    onChange={this.onChange}
                    onFocus = {this.onFocus}
                    onBlur ={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input,option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=0
                    }
                    notFoundContent=""
                    value={ this.props.defaultValue}
                >
                    {
                        this.props.myoptions.map( it =>(
                            <Option key={it.id} value={it.id}>{it.text}</Option>
                        ))
                    }
                </Select>
                <hr/>
                <hr/>
                <div>
                    {
                           console.log(this.props.formControls)
                    }
                   <Form>
                       {
                           
                           this.props.formControls.map( it =>{
                               return (
                                <Form.Item>
                                    {getFieldDecorator(it.label,{
                                        rules:[{ required: true}]
                                    })(
                                        <Input />
                                    )}
                                </Form.Item>
                               )
                           })
                       }

                       
                       
                   </Form>
                </div>
                {/* <Form>
                    {
                        this.props.formControls.map(v => {
                            <Input />
                            // if("1" == v.type){
                            //     <Form.Item label="测试">
                            //         {getFieldDecorator(`${v.field}`,{
                            //             rules:[{ required: `${v.required}`}]
                            //         })(
                            //             <Input />
                            //         )}
                            //     </Form.Item>
                            // }
                            // else if('2' == v.type){
                            //     <Form.Item label="测试">
                            //         {getFieldDecorator(`${v.field}`,{
                            //             rules:[{ required: `${v.required}`}]
                            //         })(
                            //             <Select>
                            //                 <Option value="jack">Jack</Option>
                            //             </Select>
                            //         )}
                            //     </Form.Item>
                            // }

                        })
                    }
                </Form> */}
            </div>
        )
    }
}


export default connect(mapStateToProps)(Form.create()(MySelect));
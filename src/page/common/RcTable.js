import React from 'react';
import { Table } from 'antd';
import  style from  './RcTable.less';

class RcTable extends React.Component{

    onRowClick(item,index){
        let selectedRowKeys = this.props.selecekeys;
        let selectedRows = this.props.that.state.selectedRows;
        let selectedKey = item.key;
        if(this.props.rowSelection==='checkbox'){
            if(this.props.selecekeys.indexOf(item.key) === -1){
                selectedRowKeys.push(item.key);
                selectedRows.push(item);
                this.props.that.setState({selectedRowKeys,selectedRows,selectedKey});
            } else{
                const index_= this.props.selecekeys.indexOf(item.key);
                selectedRowKeys.splice(index_,1);
                selectedRows.splice(index_,1);
                this.props.that.setState({selectedRowKeys,selectedRows});
            }
        } else if(this.props.rowSelection === "radio" || this.props.rowSelection===""){
            this.props.that.setState({selectedRowKeys:item.key,selectedRows:item,selectedKey});
        }
    }

    updateSelectedItem(selectedRowKeys,selectedItem){
        this.setState({
            selectedRowKeys,
            selectedItem
        })
    }

    tableInit(){
        let rowSelection={
            type:this.props.rowSelection==="checkbox"?"checkbox":"radio",
            selectedRowKeys:this.props.selecekeys,
            onChange: this.updateSelectedItem.bind(this.props.that)
        }

        return (
            <Table
                loading={this.props.loading}
                columns={this.props.columns}
                dataSource={this.props.dataSource}
                size="small"
                bordered
                scroll={{ y: this.props.yscroll }}
                pagination={this.props.pagination}
                rowSelection={this.props.rowSelection === false? null: rowSelection}
                onRow={(item,index) =>{
                    return {
                        onClick:()=>{
                            this.onRowClick(item,index);
                        }
                    }
                }}
                rowClassName ={ (record,index)=>{
                    let className = index % 2 ? 'shallow_gray': 'deep_gray';
                    return record.key === this.props.that.state.selectedKey ? className + ' clickRowStyl' : className;
                }}
            ></Table>
        )
    }

    render(){
        return (
            <div>
                { this.tableInit()}
            </div>
        )
    }

}


export default RcTable;
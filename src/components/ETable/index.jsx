import React, { Component } from 'react'
import { Table } from 'antd'
export default class ETable extends Component {
    state={}
    onRowClick = (record, index) => {
        let { rowSelection, selectedRowKeys, selectedIds } = this.props;
        if (rowSelection === 'checkbox') {
            let selectedItem = this.props.selectedItem || [];            
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                console.log('i',i)
                if (i === -1) {
                    selectedIds.push(record.id);
                    console.log('selectedIds', selectedIds)
                    selectedRowKeys.push(index);
                    console.log('selectedRowKeys', selectedRowKeys)
                    selectedItem.push(record);
                    console.log('selectedItem', selectedItem)

                } else {
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            } else {
                selectedIds = [record.id];
                selectedRowKeys = [index];
                selectedItem = [record]
            }
            this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
        } else {
            let selectKey = [index];
            // let selectedItem=record;
            console.log('触发了onRowClick事件')
            this.props.updateSelectedItem(selectKey, record)
        }
    }
    tableInit = () => {
        let row_selection = this.props.rowSelection;
        let { selectedRowKeys } = this.props;
        const rowSelection = {
            type: "radio",
            selectedRowKeys,
            // onChange:this.onSelectChange
        }        
        console.log('rowSelection',rowSelection)

        if (row_selection === false || row_selection === null) {
            row_selection = false;
        } else if (row_selection === "checkbox") {
            rowSelection.type = "checkbox";
        } else {
            row_selection = 'radio'
        }
        return <Table
            bordered
            {...this.props}
            rowSelection={row_selection ? rowSelection : null}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        if (!row_selection) {
                            return
                        }
                        this.onRowClick(record, index)
                    },  //点击行
                }
            }}
        />
    }
    render() {
        return (
            <div>
                {this.tableInit()}

            </div>
        )
    }
}

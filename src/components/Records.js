import React, { Component } from 'react';
import Record from './Record.js';
import * as RecordsAPI from '../utils/RecordsAPI';
import RecordForm from './RecordForm';

class Records extends Component {
    constructor(){
        super();
        this.state = {
            error:null,
            isLoaded:false,

            records:[]
        }
    }
    componentDidMount(){
        RecordsAPI.getAll().then(
            response=>this.setState({
                records:response.data,
                isLoaded:true
            }),
        ).catch(
            error=>this.setState({
                error,
                isLoaded:true
            })
        )
    }
    addRecord(record){
        console.log(record);
        this.setState({
            error:null,
            isLoaded:true,
            records:[
                ...this.state.records,
                record
            ]
        })
    }
    updateRecord(record){

    }
  render() {
    const {error,isLoaded,records} = this.state;
    let recordsComponent;
    if(error){
        recordsComponent =  <div>Error:{error.message}</div>
    }else if(!isLoaded){
        recordsComponent = <div>Loading....</div>
    }else {
        recordsComponent = (
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Active</th>
                </tr>
                </thead>
                <tbody>
                {records.map((record,i)=><Record key={record.id}{...record} handleEditRecord={this.updateRecord.bind(this)}/>)}
                </tbody>
            </table>
        );
    }
    return(
        <div>
            <h2>Records</h2>
            <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
            {recordsComponent}
        </div>
  )

  }
}

export default Records;

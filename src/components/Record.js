import React, { Component } from 'react';
import propTypes from 'prop-types';
import * as RecordsAPI from '../utils/RecordsAPI';

export default class Record extends Component {
    constructor(){
        super();
        this.state = {
            edit:false
        }
    }
    handleToggle(){
        this.setState({
            edit:!this.state.edit
        })
    }
    handleEdit(event){
        event.preventDefault();
        const record = {
            date:this.refs.date.value,
            title:this.refs.title.value,
            amount:this.refs.amount.value,
        };
        RecordsAPI.Update(this.props.id,record).then(
            response =>{
                this.props.handleEditRecord(response.data);
            }
        ).cache(
            error => console.log(error)
        )
    }
    recordRow(){
        return(
            <tr key={this.props.id}>
                <td>{this.props.date}</td>
                <td>{this.props.title}</td>
                <td>{this.props.amount}</td>
                <td>
                    <button className="btn btn-info mr-3" onClick={this.handleToggle.bind(this)}>Edit</button>
                    <button className="btn btn-danger" >Delete</button>
                </td>
            </tr>
        )
    }
    recordForm(){
        return(
            <tr key={this.props.id}>
                <td><input type="text" className="form-control" defaultValue={this.props.date} ref="date"/></td>
                <td><input type="text" className="form-control" defaultValue={this.props.title} ref="title"/></td>
                <td><input type="text" className="form-control" defaultValue={this.props.amount} ref="amount"/></td>
                <td>
                    <button className="btn btn-info mr-3"onClick={this.handleEdit.bind(this)}>Update</button>
                    <button className="btn btn-danger" onClick={this.handleToggle.bind(this)}>Cancel</button>
                </td>
            </tr>
        )
    }
  render() {
    if(this.state.edit){
        return this.recordForm();
    }else {
        return this.recordRow();
    }
  }
}


Record.propTypes = {
    id:propTypes.string,
    date:propTypes.string,
    title:propTypes.string,
    amount:propTypes.number,
}

import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

export default class Record extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:"",
            title:"",
            amount:"",
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        let name,obj;
        name = event.target.name;
        this.setState((
            obj = [],
            obj[""+name] = event.target.value,
            obj
        ))

    }
    handleSubmit(event){
        event.preventDefault();
        const data = {
            date:this.state.date,
            title:this.state.title,
            amount:Number.parseInt(this.state.amount,0),
        }
        RecordsAPI.Create(data).then(
            response=>{
                this.props.handleNewRecord(response.data)
                this.setState({
                    date:"",
                    title:"",
                    amount:"",
                })
            }
        ).cache(
            error=>console.log(error.message)
        )
    }
    valid(){
        return this.state.date && this.state.title && this.state.amount
    }
    render() {
        return(
            <form action="" className="form-inline mb-4" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-2">
                    <input type="text" className="form-control" placeholder='date' name='date' value={this.state.date} onChange={this.handleChange}/>
                </div>
                <div className="form-group mr-2">
                    <input type="text" className="form-control"  placeholder='title' name='title' value={this.state.title} onChange={this.handleChange}/>
                </div>
                <div className="form-group mr-2">
                    <input type="text" className="form-control"  placeholder='Amount' name='amount' value={this.state.amount} onChange={this.handleChange}/>
                </div>
                <button  type='submit' className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
            </form>
        )
    }
}


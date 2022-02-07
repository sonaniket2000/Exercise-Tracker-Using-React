import React from 'react'
import { Navigate } from "react-router-dom" 

class CreateTask extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            Title:this.props.Title,
            Description:this.props.Description,
            currentStatus:this.props.currentStatus
        }

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    handleSubmit(event){
        let newData = this.props.data;
        let keyNew = this.props.data.length+1;

     if(this.props.value === "Submit"){
        newData.push({
            key:keyNew,
            title:this.state.Title,
            description:this.state.Description,
            toggle:false
           });
      }

       this.props.handleClick(newData);
        this.setState({
            currentStatus:"Home"
        });
       event.preventDefault();
    }

    handleReset(){
        this.setState({
            Title:'',
            Description:''
        });
    }

    render(){
        return(
            <>
            {this.state.currentStatus && <Navigate to='/Home'/>}
            <br /><br /><br /><br />
            <form onSubmit={this.handleSubmit}>
            <label>
                Title : 
                 <input className="inputTitle" type="text" value={this.state.Title} onChange={this.handleChange} name = "Title"/>
            </label>
            <br />
            <label>
                Description :
                <input type = "text" className="inputDescription"value={this.state.Description} onChange = {this.handleChange} name = "Description" />
            </label>
            <br/>
                <input type="submit" className = "ResetBtn" value={this.props.value}/>
                <button type="reset" onClick={() => this.handleReset()} className = "ResetBtn">Cancel</button>
            </form>
            </>
        );
    }
}

export default CreateTask;
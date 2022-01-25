import React from 'react'


class CreateTask extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            Title:this.props.Title,
            Description:this.props.Description
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
     }else if(this.props.value === "Update"){
        newData = newData.filter(data => data.key !== this.props.keyEdit).map(data => (
            {
                key:data.key,
                title:data.title,
                description:data.description,
                toggle:data.toggle
            }
        ));
        this.props.handleClick(newData);

        newData.push({
            key:this.props.keyEdit,
            title:this.state.Title,
            description:this.state.Description,
            toggle:false
           });
     }

       this.props.handleClick(newData);
       this.props.handleSetCureentStatus("Home");
       event.preventDefault();
    }

    render(){
        return(
            <>
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
                <input type="submit" value={this.props.value}/>
            </form>
            </>
        );
    }
}

export default CreateTask;
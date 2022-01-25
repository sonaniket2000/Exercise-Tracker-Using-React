import React from 'react'
import Tiket from './Components/Tiket'
import CreateTask  from './Components/CreateTask';

var edit;

class App extends React.Component{
  constructor(props){
    super(props);    
        this.state = {
      count : [
        {
          key:1,
          title:'Push-ups',
          description:"we have to do 200 pusups upto saturday",
          toggle:false
        },
        {
          key:2,
          title:'Sit-ups',
          description:"we have to do 20 pusups upto saturday",
          toggle:true
        }
      ],
      btnCompleted:true,
      btnPending:false,
      currentStatus:'Home'
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSetCureentStatus = this.handleSetCureentStatus.bind(this);
  }

  handleSetCureentStatus(val){
    this.setState({
      currentStatus:val
    });
  }

    CurrentPage(val){
    switch(val){
      case "Home":return <Tiket data = {this.state.count} btn1= {this.state.btnCompleted} btn2 = {this.state.btnPending}  handleClick={this.handleClick} handleUpdate={this.handleUpdate}/>;
      case "CreateNewTask": return <CreateTask data = {this.state.count} Title='' Description=''  handleClick = {this.handleClick}  value="Submit" handleSetCureentStatus={this.handleSetCureentStatus} />;
      case "Update": return <CreateTask data = {this.state.count} keyEdit={edit.key} Title={edit.title} Description={edit.description}  handleClick = {this.handleClick}  value="Update" handleSetCureentStatus={this.handleSetCureentStatus}/>
      default:return 
    }
  }

  handleUpdate(editData){
    
    edit=editData;
    this.setState({
      currentStatus:"Update"
    });
  }

  handleButton(val){
   if(val === 3){
      this.setState({
        btnCompleted:true,
        btnPending:false
      });
    }
    else if(val === 4){
      this.setState({
        btnCompleted:true,
        btnPending:true
      });
    }else if(val === 5){
      this.setState({
        btnCompleted:false,
        btnPending:false
      });
    }
  }

  handleClick(val){
  
    this.setState({
      count:val
    });
  }

  render(){
    return(
    <div className='Main'>
    <div className='AboveAll'>
      <button className="Home" onClick={() =>this.setState({currentStatus:"Home"})}>Home</button>
      <button className="CreateTask" onClick={() =>this.setState({currentStatus:"CreateNewTask"})}>Create New Task</button>
      <br />
      {this.state.currentStatus==="Home" &&
      <>
      <button className="ViewAll" onClick={() =>this.handleButton(3)}>View All</button>
      <button className="Completed" onClick={() =>this.handleButton(4)}>Completed</button>
      <button classname="Pending" onClick={() =>this.handleButton(5)}>Pending</button>
      </>
      }
      {this.CurrentPage(this.state.currentStatus)}  
    
    </div>
    </div>
    );
  }
}

export default App;

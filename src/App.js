import React from 'react'
import Tiket from './Components/Tiket'
import CreateTask  from './Components/CreateTask';
import { AiFillHome } from "react-icons/ai";

var editKey,editTitle;

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
      case "Home" :         return <Tiket data = {this.state.count} btn1= {this.state.btnCompleted} btn2 = {this.state.btnPending}  handleClick={this.handleClick} handleUpdate={this.handleUpdate} currentStatus = {this.state.currentStatus}/>;
      case "CreateNewTask": return <CreateTask data = {this.state.count} Title='' Description=''  handleClick = {this.handleClick}  value="Submit" handleSetCureentStatus={this.handleSetCureentStatus} />;
      case "Update" :       return <Tiket data = {this.state.count} btn1= {this.state.btnCompleted} btn2 = {this.state.btnPending}  handleClick={this.handleClick} currentStatus = {this.state.currentStatus} editKey = {editKey} editTitle = {editTitle} handleSetCureentStatus={this.handleSetCureentStatus}/>
      // case "Update": return <CreateTask data = {this.state.count} keyEdit={edit.key} Title={edit.title} Description={edit.description}  handleClick = {this.handleClick}  value="Update" handleSetCureentStatus={this.handleSetCureentStatus}/>
      default:return 
    }
  }

  handleUpdate(editData){
    
    editKey=editData.key;            // how can we take whole object here?? ... convert it then use it here...bcox we have to send key and title seprately due to this
    editTitle = editData.title;
    console.log("edit" + editTitle);
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
    var temp1 = {background:""}
    var temp2 = {background:""};
    var temp3 = {background:""};

    var home = {color:"",borderBottom:""};
    var createTask = {color:"",borderBottom:""};

    if(this.state.currentStatus === "CreateNewTask") {
      createTask = {color:"blue",borderBottom:"1px solid blue"};
    } else{
       home = {color:"blue",borderBottom:"1px solid blue"};
    }


    if(this.state.btnCompleted === true && this.state.btnPending === false)
     temp1 = {color:"blue",border:"2px double  blue"};
    else if(this.state.btnCompleted === true && this.state.btnPending === true)
     temp2 = {color:"blue",border:"2px double  blue"};
    else
     temp3 = {color:"blue",border:"2px double  blue"};


    return(
      <div className='App'>
    <div className='Main'>
    <div className='AboveAll'>
      <button  className="Home" style = {home} onClick={() =>this.setState({currentStatus:"Home"})}><AiFillHome/>Home</button>
      <button className="CreateTask" style = {createTask} onClick={() =>this.setState({currentStatus:"CreateNewTask"})}>Create New Task</button>
      <br />
      <div className='Content'>
      {this.state.currentStatus ==="Home" &&
      <>
      <button className="ViewAll" style={temp1} onClick={() =>this.handleButton(3)} >View All</button> 
      <button className="Completed" style={temp2} onClick={() =>this.handleButton(4)}>Completed</button>
      <button className="Pending" style={temp3} onClick={() =>this.handleButton(5)}>Pending</button>
      </>
      }
      {this.CurrentPage(this.state.currentStatus)}  
      </div>
    </div>
    </div>
    </div>
    );
  }
}

export default App;

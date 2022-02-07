// Imports
import React from 'react'
import Tiket from './Tiket'
import CreateTask  from './CreateTask';
import { AiFillHome } from "react-icons/ai";
import { Link } from 'react-router-dom';

// global variables
var editKey,editTitle;

// Main Component
class App extends React.Component{
  constructor(props){
    super(props);    

    this.state = {
      currentStatus:'Home'
    };

    this.handleSetCureentStatus = this.handleSetCureentStatus.bind(this);
  }

  handleSetCureentStatus(val){
      this.setState({
        currentStatus:val
      });
  }

  CurrentPage(val){

    switch(val){
      case "Open":
      case "Home" :         return <Tiket data = {this.props.data} btn1= {this.props.btnCompleted} btn2 = {this.props.btnPending}  handleClick = {this.props.handleClick} handleUpdate={this.handleUpdate} currentStatus = {this.props.currentStatus}/>;
      case "CreateNewTask": return <CreateTask data = {this.props.data} Title='' Description=''  handleClick = {this.props.handleClick}  value="Submit" handleSetCureentStatus={this.handleSetCureentStatus} currentStatus = '' />;
      default:return 
    }
  }

  handleOpen(){
        if(this.state.currentStatus !== "Open"){
        this.setState({currentStatus:"Open"});
    }else if(this.state.currentStatus === "Open"){
      this.setState({currentStatus:"Home"});
    }
  }

  render(){

    // All Dynamic css
    var temp1 = {background:""}
    var temp2 = {background:""};
    var temp3 = {background:""};

    var home = {color:"",borderBottom:""};
    var createTask = {color:"",borderBottom:""};

    var open = {width:""};
    var body = {marginLeft:""};

    // linear-gradient(to top, white, #b9b2eb)

    if(this.state.currentStatus === "Open") {  
      open = {width:"20%"};  // 20%
      body = {marginLeft:"20%",  background: "linear-gradient(to top, white, #c3bfe6)"};
      home = {color:"rgb(0,0,255,0.3)"};
      createTask = {color:"rgb(0,0,0,0.3)"};
    }

    if(this.props.currentStatus === "CreateNewTask") {
      createTask = {color:"blue",borderBottom:"1px solid blue"};
    } else if(this.props.currentStatus === "Home"){
       home = {color:"blue",borderBottom:"1px solid blue"};
    }


    if(this.props.btnCompleted === true && this.props.btnPending === false)
     temp1 = {color:"white"};
    else if(this.props.btnCompleted === true && this.props.btnPending === true)
     temp2 = {color:"white"};
    else
     temp3 = {color:"white"};


    return(
     
        <div className='App'>
            <div className='sidenav' style={open}>
               
                <Link to="/Home" style={temp1} >View All</Link>
                <Link to="/Home/Completed" style={temp2} >Completed</Link>
                <Link to="/Home/Pending" style={temp3} >Pending</Link>
            </div>
              
            <div  className={this.state.currentStatus === "Open" ? "menu-btn-open" : "menu-btn"} onClick={() => this.handleOpen()}>
                <a class="menu-btn__burger"></a>
            </div>

            {this.state.currentStatus !== "Open" ?
            <div className='Main' style={body} >
                <div className='AboveAll'>
                
                    <Link to="/Home" className="Home" style = {home} onClick={() => this.handleSetCureentStatus("Home")}><AiFillHome/>Home</Link>
                    <Link to="/CreateTask" className="CreateTask" style = {createTask} onClick={() =>this.setState({currentStatus:"CreateNewTask"})}>Create New Task</Link>
                    <br />

                    <div className='Content'>
                    {this.CurrentPage(this.props.currentStatus)}  
                    </div>
                </div>
            </div> 
            :
            <div className='Main' style={body} onClick={() => this.handleSetCureentStatus("Home")}>
                <div className='AboveAll'>
                    
                    <Link to="/Home" className="Home" style = {home} onClick={() => this.handleSetCureentStatus("Home")}><AiFillHome/>Home</Link>
                    <Link to="/CreateTask" className="CreateTask" style = {createTask} onClick={() =>this.setState({currentStatus:"CreateNewTask"})}>Create New Task</Link>
                        <br />

                        <div className='Content'>   
                        {this.CurrentPage(this.props.currentStatus)}  
                        </div>
                </div>
            </div>}
        </div>
    );
  }
}

export default App;

import React from 'react'
import Home from './Components/Home'
import {Routes,Route,Navigate,BrowserRouter} from 'react-router-dom';

class App extends React.Component{

  constructor(){
    super();

    this.state = {
      data : [
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
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(val){
  
    this.setState({
      data:val
    });
  }
  

  render(){
    return(
      <BrowserRouter>
      <Routes>
      
         <Route exact path="/CreateTask" element={<Home data = {this.state.data} handleClick = {this.handleClick} currentStatus="CreateNewTask"/>} />
         <Route exact path = "/Home/Completed"  element={<Home data = {this.state.data} handleClick = {this.handleClick}  btnCompleted = {true}  btnPending={true} currentStatus="Home"/>} />
         <Route exact path = "/Home/Pending"  element={<Home data = {this.state.data} handleClick = {this.handleClick}  btnCompleted = {false}  btnPending={false} currentStatus="Home"/>} />
         <Route exact path="/Home" element={<Home data = {this.state.data} handleClick = {this.handleClick}  btnCompleted = {true}  btnPending={false} currentStatus="Home"/>}/>
         <Route path='/' element={<Navigate to="/Home" />}/>
         </Routes>
     </BrowserRouter>
    );
  }
}

export default App;

import React from 'react'
import '../index.css'

var editKey='';

class Tiket extends React.Component{

    constructor(props){

        super(props);
        this.state = {Title : '',currentStatus:''};
    }

    handleChange(event){

        this.setState({
            Title:event.target.value
        });
    }

    handleDelete(val){
        let data = this.props.data;
        var newData;
             newData = data.filter(data => data.key !== val).map(data => (
                {
                    key:data.key,
                    title:data.title,
                    description:data.description,
                    toggle:data.toggle
                }
            ));
            this.props.handleClick(newData);
        }

            handleToggle(keyData){
                let data = this.props.data;
                var newData;
                newData = data.map(data => (
                    {
                        key:data.key,
                        title:data.title,
                        description:data.description,
                        toggle:(data.key === keyData)?!data.toggle:data.toggle
                    }
                ));
                this.props.handleClick(newData);
            }
 
        handleEdit(allData){
            editKey = allData.key;
            this.setState({
                currentStatus:"Edit",
                Title:allData.title
            });
        }

        handleConfirm(){
            var newData = this.props.data;
            newData = newData.map(data => (
                {
                    key:data.key,
                    title:data.key !== editKey?data.title:this.state.Title,
                    description:data.description,
                    toggle:data.toggle
                }
            ));
               editKey='';
               console.log("data"+JSON.stringify(newData));
               this.props.handleClick(newData);    
        }

        handleReset(){
            editKey='';
            this.setState({currentStatus:''});
        }
        
    render(){
        let btn1= this.props.btn1;
        let btn2 = this.props.btn2;
        let data;
        var btnAll = {background:""};
        var blue,red;
        console.log("Key "+editKey);
        if(this.props.currentStatus !== "Open"){
            var completed = {background:"rgb(	89, 255, 160,0.4)"};
            var pending = {background:"rgb( 255, 237, 101,0.4)"}
            red = "rgb(255,0,0,0.4)";
            blue = "rgb(0,0,255,0.4)";
        }else{
            var completed = {background:"rgb(	89, 255, 160,0.2)",color:"rgb(0,0,0,0.4)",border:"0.5px solid rgb(0,0,0,0.4)",boxShadow:"0.5px 0.5px rgb(0,0,0,3)"};
            var pending = {background:"rgb( 255, 237, 101,0.2)",color:"rgb(0,0,0,0.4)",border:"0.5px solid rgb(0,0,0,0.4)",boxShadow:"0.5px 0.5px rgb(0,0,0,3)  "};
           btnAll = {background:"rgb(240 ,248, 255, 0.2)",color:"rgb(0,0,0,0.6)",border:"1px solid rgb(0,0,0,0.2)"};
           red = "rgb(255,0,0,0.1)";
           blue = "rgb(0,0,255,0.1)";
        }

        
        console.log(this.props.editKey);

            data = this.props.data.filter(data => (data.toggle === btn1 || data.toggle === btn2)).map((data) =>
            <div className='AboveContainer'>
            <div className='Container' key={data.key} style={data.toggle?completed:pending}>
                {editKey !== data.key ? 
                <>
                <div className='Title'>{data.title}</div>
                <h1 className='hrTiket'/>
                <div className='Description'>{data.description}</div>
                <button className='btnDelete' style = {btnAll} onClick={() => this.handleDelete(data.key)}> Delete</button>
                <button className='btnEdit'  style = {btnAll} onClick={() => this.handleEdit(data)}>Edit</button>
                <button className='btnToggle'  style = {btnAll,{background:data.toggle?blue:red}} onClick={() => this.handleToggle(data.key)}>{data.toggle?"Completed":"Pending"}</button>
                </> : 
                <>
                    <input type="text" value={this.state.Title} className='editTitle' onChange={(e) => this.handleChange(e)}/>
                    <button className='Confirm' onClick={() => this.handleConfirm()}>Confirm</button>
                    <button className='Cancel' onClick={() => this.handleReset()}>Cancel</button>
                    <h1 className='hr'/>
                    <div className='Description'>{data.description}</div>

                </>
                 }
            </div>
            </div>
            );

        return(
            <div className='DekhateHai'>
                {data}
            </div>
        );
    }
}

export default Tiket;
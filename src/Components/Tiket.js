import React from 'react'
import '../index.css'

class Tiket extends React.Component{

    constructor(props){
        super(props);
        console.log(" s"+this.props.editTitle);
        this.state = {Title : ''};
    }

    handleChange(event){
        console.log("handleCHange "+ event.target.value);
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
            console.log(allData);
            this.props.handleUpdate(allData);
        }

        handleConfirm(){
            var newData = this.props.data;
            console.log("new "+newData);
            // WE CAN USE MAP HERE...TRY IT AFTERWARDS...........useddddd
            newData = newData.map(data => (
                {
                    key:data.key,
                    title:data.key !== this.props.editKey?data.title:this.state.Title,
                    description:data.description,
                    toggle:data.toggle
                }
            ));

               this.props.handleClick(newData);
               this.props.handleSetCureentStatus("Home");
        }

        componentDidUpdate(prevProps){
            if(this.props.currentStatus === "Update" && prevProps.editTitle !== this.props.editTitle)
            {
                if(this.state.Title !== this.props.editTitle)
                {
                    this.setState({Title:this.props.editTitle});
                }
            }
        }
        
    render(){
        let btn1= this.props.btn1;
        let btn2 = this.props.btn2;
        let data;
        var btnAll = {background:""};

        if(this.props.currentStatus !== "Open"){
            var completed = {background:"rgb(	89, 255, 160,0.4)"};
            var pending = {background:"rgb( 255, 237, 101,0.4)"}
        }else{
            var completed = {background:"rgb(	89, 255, 160,0.2)",color:"rgb(0,0,0,0.4)",border:"0.5px solid rgb(0,0,0,0.4)",boxShadow:"0.5px 0.5px rgb(0,0,0,3)"};
            var pending = {background:"rgb( 255, 237, 101,0.2)",color:"rgb(0,0,0,0.4)",border:"0.5px solid rgb(0,0,0,0.4)",boxShadow:"0.5px 0.5px rgb(0,0,0,3)  "};
           btnAll = {background:"rgb(240 ,248, 255, 0.2)",color:"rgb(0,0,0,0.6)",border:"1px solid rgb(0,0,0,0.2)"};
        }

        
        console.log(this.props.editKey);

            data = this.props.data.filter(data => (data.toggle === btn1 || data.toggle === btn2)).map((data) =>
            <div className='AboveContainer'>
            <div className='Container' key={data.key} style={data.toggle?completed:pending}>
                {this.props.editKey !== data.key ? 
                <>
                <div className='Title'>{data.title}</div>
                <h1 className='hrTiket'/>
                <div className='Description'>{data.description}</div>
                <button className='btnDelete' style = {btnAll} onClick={() => this.handleDelete(data.key)}> Delete</button>
                <button className='btnEdit'  style = {btnAll} onClick={() => this.handleEdit(data)}>Edit</button>
                <button className='btnToggle'  style = {btnAll} onClick={() => this.handleToggle(data.key)}>{!data.toggle?"Completed":"Pending"}</button>
                </> : 
                <>
                    <input type="text" value={this.state.Title} className='editTitle' onChange={(e) => this.handleChange(e)}/>
                    <button className='Confirm' onClick={() => this.handleConfirm()}>Confirm</button>
                    <button className='Cancel' onClick={() => this.props.handleSetCureentStatus("Home")}>Cancel</button>
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
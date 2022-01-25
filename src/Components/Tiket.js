import React from 'react'
import '../index.css'

class Tiket extends React.Component{

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
      
            this.props.handleUpdate(allData);
        }
        
    render(){
        let btn1= this.props.btn1;
        let btn2 = this.props.btn2;
        let data;
       

            data = this.props.data.filter(data => (data.toggle === btn1 || data.toggle === btn2)).map((data) =>
            <div className='AboveContainer'>
            <div className='Container' key={data.key}>
                <div className='Title'>{data.title}</div>
                <div className='Description'>{data.description}</div>
                <button className='btnDelete'  onClick={() => this.handleDelete(data.key)}> Delete</button>
                <button className='btnEdit' onClick={() => this.handleEdit(data)}>Edit</button>
                <button className='btnToggle' onClick={() => this.handleToggle(data.key)}>Toggle</button>
            </div>
            </div>
            );

        return(
            <>
                {data}
            </>
        );
    }
}

export default Tiket;
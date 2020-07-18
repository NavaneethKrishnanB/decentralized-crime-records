import React from 'react'
import  'bootstrap/dist/css/bootstrap.min.css'

class Result extends React.Component{
    render()
    {
        console.log("props",this.props.name,this.props.offense);
        
        return (
            <div className="card card-danger">
             <h4>Name:{this.props.name}</h4>
             <h4>Offense:{this.props.offense}</h4>
            <br></br>
             </div>
        );
    }
}
export default Result;
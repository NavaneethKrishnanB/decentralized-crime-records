import React from 'react';
import  'bootstrap/dist/css/bootstrap.min.css'

class Boxes extends React.Component {


    render(){
     // console.log(typeof this.props.offense);
  return (
    <div>
     <tr className="card"><td style={{width:"300"}}>{this.props.id}</td><td style={{width:"300"}}>{this.props.name}</td><td style={{width:"300"}}>{this.props.offense}</td></tr>
    <br></br>
 </div>
  );
    }
}

export default Boxes;

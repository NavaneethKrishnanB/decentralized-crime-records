import React from 'react';
import  'bootstrap/dist/css/bootstrap.min.css'
class Form extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            name:'',
            id:'',
            offense:''
        }
        this.changeId=this.changeId.bind(this);
        this.changeName=this.changeName.bind(this);
        this.changeOffense=this.changeOffense.bind(this);
        this.submit= this.submit.bind(this);
        
    }
    
    changeName(e)
    {
      console.log(e.target.value);
      this.setState({name:e.target.value});
      //  console.log(this.state.new_name)
    }
     changeId(e)
    {
      this.setState({id:e.target.value});
      console.log(this.state.id);
    }
     changeOffense(e){
      this.setState({offense:e.target.value});
      console.log(this.state.offense);
    }
    submit(e)
    {
        e.preventDefault();
        console.log(this.state);
        console.log(this.state.id,this.state.name,this.state.offense);
        this.props.addRecord(this.state.id,this.state.name,this.state.offense);
    }
    render()
    {
        return (
            <div>
            <form onSubmit={this.submit} className="card">
            <input type="text" placeholder="id" value={this.state.new_id} onChange={this.changeId} className="card-body bg-dark text-white"></input>
            <input type="text" placeholder="name" value={this.state.new_name} onChange={this.changeName} className="card-body bg-dark text-white"></input>
            <input type="text" placeholder="offense" value={this.state.new_offense} onChange={this.changeOffense} className="card-body bg-dark text-white"></input>
            <button onClick={this.addRecord} className="btn">submit</button>
            </form> 
            </div>
        );
    }
}

export default Form;
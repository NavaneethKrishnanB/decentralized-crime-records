import React from 'react'
import  'bootstrap/dist/css/bootstrap.min.css'

class Search extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            id:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e)
    {
        this.setState({id:e.target.value});
    }
    onSubmit(e)
    {
        e.preventDefault();
        this.props.search(this.state.id);
        
    }
    render()
    {
        return (
            <div>
                <form>
                <input type = "text" className="form-control" placeholder="search by id" value={this.state.id} onChange={this.onChange}></input>
                <center><button className="btn" onClick={this.onSubmit} style={{align:"center"}}>Search</button>
               </center></form>
               <br></br>
            </div>
        );
    }
}
export default Search;
import React from 'react';
import Web3 from 'web3'
import Boxes from "./components/Boxes";
import TruffleContract from "@truffle/contract"
import Records from "../build/contracts/Records.json"
import Form from "./components/Form.js"
import  'bootstrap/dist/css/bootstrap.min.css'
import Search from './components/Search'
import Result from './components/Result'
class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
      account:'',
      records:[],//record contains id,name,dob,offense
      validator:false,
      rec:null
     
    }
    this.loadWeb3 = this.loadWeb3.bind(this);
    this.loadRecords= this.loadRecords.bind(this);
    this.addRecord = this.addRecord.bind(this);
    this.refresh = this.refresh.bind(this);
    this.search = this.search.bind(this);
  }
  search(index)
  {
    console.log(index);
    let start=0,end=rec.length;
    let ind=-1;
    while(start<=end)
    {
        let mid=(start+end)/2;
        if(this.state.records[mid].id==index)
        {
          ind = mid;
          break;
        }
        else if(this.state.records[mid].id>index)
        {
           end = mid-1;
        }
        else
        {
            start = mid+1;
        }
    }
    if(ind!=-1)
    var rec = this.state.records[ind];
    console.log("rec",rec);
    this.setState({rec:rec});
  }
  async componentDidMount()
  {
  await this.loadWeb3();
    // TODO: Refactor with promise chain
  const web3 = window.web3;
  console.log("web3",web3);
  if (typeof (web3) != 'undefined') {
    this.web3Provider = web3.currentProvider
  } else {
    this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
  }

   this.web3 = new Web3(this.web3Provider);

  
   this.records = TruffleContract(Records);
   this.records.setProvider(this.web3Provider);
 //  console.log(this.records);
    this.web3.eth.getCoinbase((acc)=>
    console.log("acc",acc));
   let accounts='0xb30C45655180233acf96149a12788898bD821A5C';
    web3.eth.getAccounts().then((accs)=>console.log(accs)).catch(err=>console.log("err",err))
    
  console.log("accounts",accounts);

   this.setState({account:accounts});console.log(this.state.account);

   this.records.deployed().then((recordsInstance)=>
   {
     //console.log(recordsInstance);
     this.recordsInstance = recordsInstance;
      this.loadRecords();


    this.recordsInstance.isValidator({from:this.state.account}).then((res)=>
   {
     console.log("res",res);
     this.setState({validator:res});
   });
   });
   
  

  }
  async loadRecords()
  {
    this.recordsInstance.listNo().then((listno)=>
    {
      let total = listno.toNumber();
      console.log(total);
      let recs=[];
      for(let i=1;i<=total;i++)
      {
         this.recordsInstance.list(i).then((record)=>{
         // console.log(record);
          this.setState({records:[...this.state.records,{
            id:record[0],
            name:record[1],
            offense:record[2]
          }]});
          //console.log("state",this.state.records);
        })
      }
     
    });
    this.state.records.sort((a,b)=>{ return a.id-b.id});
  }
  async loadWeb3()
  {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }


  }

  refresh()
  {
    this.setState({new_id:'',new_name:'',new_offense:''});
  }
  addRecord(_id,_name,_offense)
  {
      console.log(this.recordsInstance);
      console.log(this.recordsInstance);
      console.log(_name,_id,_offense);
      this.recordsInstance.addRecord(Number(_id),_name,_offense,{from:this.state.account})
      .then((rec)=>{
  
      console.log('record added successfully')})
      .catch(err=>console.log(err))
      this.refresh();
  }
    render(){
      
        var arr = [];
        arr.push(<thead><td>ID</td><td>Name</td><td>Offence</td></thead>)
        for(let rec of this.state.records){
          console.log("id", rec.id.toNumber())
        arr.push(<Boxes id={rec.id.toNumber()} name={rec.name} offense={rec.offense} key={rec.id}/>);
        }
      
  return (
    <div>
      <h1 className="text-center font-weight-bold">Decentralized Criminal Records</h1>
      <br></br>
      {
       this.state.validator?
      <Form addRecord={this.addRecord}/>:null
      }
      <Search search={this.search}/>
    <table className="table"  style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          
    <tbody>
      {
            this.state.rec!=null?
            <Result name={this.state.rec.name} offense={this.state.rec.offense}></Result>:
            null
          }
     {arr}
    </tbody>
    </table>
    </div>
  );
    }
}

export default App;

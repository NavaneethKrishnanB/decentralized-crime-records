pragma solidity >=0.4.21 <0.7.0;

contract Records {
  address public validator;
  uint public listNo=0;
  struct record {
      uint id;
      string name;
      string offense;
  }
  
  event recordAdded
  (
      uint recordNo
  );
  modifier onlyValidator{
      require(address(msg.sender)==validator,"no authorisation");
      _;
  }
  constructor() public{
      validator = address(msg.sender);
  }
  mapping(uint=>record) public list;
  function isValidator() public view returns(bool){
      if(validator == address(msg.sender))
      return true;
      return false;
  }
  function addRecord(uint _id,string memory _name,string memory _offense) public onlyValidator
  {
    listNo++;
    list[listNo] = record(_id,_name,_offense);
    emit recordAdded(listNo);
  }

}

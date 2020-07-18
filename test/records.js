var Records = artifacts.require('./Records.sol');

contract("Records",async ()=>{  //contract is used instead of describe
var recordsInstance;
it("initialized with 0 records",async ()=>{
    return Records.deployed().then((instance)=>{
        return instance.listNo();
    }).then((no)=>{
        assert.equal(no,0,"err initialized with non empty records");
    });

});
it("allows to add records",async ()=>{
    return Records.deployed().then((instance)=>{
        recordsInstance = instance;
        return recordsInstance.addRecord(54321,"joey","violence",{from:"0xb30C45655180233acf96149a12788898bD821A5C"})
        .then((receipt)=>{
            assert.equal(receipt.logs.length,1,"event was triggered");
            return recordsInstance.list(1);
        }).then((recs)=>
        {
            assert.equal(recs.id,54321,"id not correctly written");
            assert.equal(recs.name,"joey","name not written correctly");
            assert.equal(recs.offense,"violence","offense not properly written");
        })
    })
});
it("isValidator working",async()=>{
 return Records.deployed().then((instance)=>{
     recordsInstance = instance;
     return recordsInstance.isValidator({from:'0xb30C45655180233acf96149a12788898bD821A5C'});
 }).then((isValid)=>{
     assert(isValid,"authorisation not given to valid address");
     return recordsInstance.isValidator({from:'0x6eF4D6d18F37Bf9Bb9510D1e659751713cf5F639'})
 }).then((isValid)=>{
     assert(!isValid,"authorization given to invalid address");
 })
});

});
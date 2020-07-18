var Records = artifacts.require('./Records.sol');

module.exports = (deployer) =>
{
    deployer.deploy(Records);
};
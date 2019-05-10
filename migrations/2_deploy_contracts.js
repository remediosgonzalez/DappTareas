var Tareas = artifacts.require("./ListadoTareas.sol");

module.exports = function(deployer) {
  deployer.deploy(Tareas);
};


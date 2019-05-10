pragma solidity ^0.5.0;

contract ListadoTareas {
  uint public contador = 0;

  struct Tarea {
    uint id;
    string descr;
    bool hecho;
  }

  mapping(uint => Tarea) public tarea;

  constructor() public {
        crearTarea("Creando mi primera tarea");
      }

  function crearTarea(string memory _descr) public {
    contador ++;
    tarea[contador] = Tarea(contador, _descr, false);
emit TareaCreada(contador, _descr, false);
  }

  event TareaCreada(
    uint id,
    string descr,
    bool hecho
  );
}


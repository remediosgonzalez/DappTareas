# DappTareas
## Entorno de desarrollo

* Node.js v6 LTS: https://nodejs.org/es/. 
  * sudo apt-get install curl
  * curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash
  * sudo apt-get install nodejs
* Truffle: Contrato inteligente
  * sudo npm install -g truffle@5.0.2
* Ganache: Blockchain local
  * https://truffleframework.com/ganache
  * sudo npm install -g ganache-cli
* Chrome
* Metamask
* Sublime Text

## Configuración del proyecto

* Crear directorio del proyecto, y dentro de este:
  * truffle init
* Creación de archivo de instalación de dependencias
  * package.json
  * truffle-config.js
* Instalar dependencias (node_modules)
 * npm install

## Estructura del proyecto
* contracts: Directorio de contratos.
* migrations: Directorio de migraciones.
* node_modules: Dependencias.
* _Package.json_: Configuración del proyecto.
* Test: Ficheros de test para realizar pruebas al contrato
* _truffle-config.js_: Archivo de configuración principal de nuestro proyecto Truffle, donde se configura la configuración de la red.

## Despliegue del contrato en blockchain local (ganache)
* Cración de un contrato
* Colocarlo en carpeta contracts
* Compilar
  * truffle compile
* Acceso desde consola Truffle
  * Conectar a la red de Ganache: 
    * truffle-config.js: Añadir ip + puerto
  * Crear script migración: 2_deploy_contracts.js
  * ganache-cli –p 7545
  * truffle migrate --network ganache
  * truffle console --network ganache

## Interactuando con el contrato (ejemplos)
  * lt = await ListadoTareas.deployed()
  * lt.address
  * t  = await lt.tarea(1) 
  * t[0]
  * lt.crearTarea(“Esta es otra tarea”)
  * ListadoTareas.deployed().then(function(lt){ return lt.crearTarea("Tarea 3"); }).then(function(result){ console.log("Tarea creada"+result.tx); }).catch(function(error){ console.error("Se produjo un error"); });

## Cambiando el contrato
* Generar nueva migración ó
* truffle migrate --reset --network ganache 

## Front-end: Servidor web
* servidor web lite-server: 
  * sudo npm install –g lite-server
* Implementación del front-end:
  * bs-config.json
  * src/index.html
  * src/app.js
* Despliegue
  * npm run dev
* Conectar metamask con ganache: 
  * http://localhost:7545





##Done BTC: 18TtHadQmkB1qcmX2o8kX9tuhnAvdjmbJT

##Done LTC: LSX627aParGLEBGRtTTg78BfLLh3mGfJaE

##Done ETH: 0xbf9525da02ad57ad5febc8586d415edc4f16443c

##Done ETC: 0xd672eb886719649b74649c9ae08a34ff20e7b24d

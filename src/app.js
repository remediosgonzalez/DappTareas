App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // Código traído de: https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Establecer cuenta de blockchain
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Creación en javascript de la versión del smart contract
    const listadoTareas = await $.getJSON('ListadoTareas.json')
    App.contracts.ListadoTareas = TruffleContract(listadoTareas)
    App.contracts.ListadoTareas.setProvider(App.web3Provider)

    // Cargar el contrato con valores de la blockchain
    App.listadoTareas = await App.contracts.ListadoTareas.deployed()
  },

  render: async () => {
    // Controlo sobre la carga 
    if (App.loading) {
      return
    }

    // Actualizando el estado
    App.setLoading(true)

    // Listado de cuentas
    $('#cuenta').html(App.account)

    // Enumeración de tareas
    await App.renderTareas()

    // Actualizano el estado
    App.setLoading(false)
  },

  renderTareas: async () => {
    // Enumeramos las tareas en la lista de tareas pendientes
    const contador = await App.listadoTareas.contador()
    const $tareaPlantilla = $('.tareaPlantilla')

    // Representacion de cada tarea en una nueva plantilla de tareas
    for (var i = 1; i <= contador; i++) {
      // Fetch the tarea data from the blockchain
      const tarea = await App.listadoTareas.tarea(i)
      const tareaId = tarea[0].toNumber()
      const tareaDescr = tarea[1]
      const tareaHecho = tarea[2]

      // Crea el html por tarea
      const $nuevaTareaPlantilla = $tareaPlantilla.clone()
      $nuevaTareaPlantilla.find('.descr').html(tareaDescr)
      $nuevaTareaPlantilla.find('input')
                      .prop('name', tareaId)
                      .prop('checked', tareaHecho)
                      // .on('click', App.toggleCompleted)

      // Coloca la tarea en el lugar que le corresponde
      if (tareaHecho) {
        $('#listadoTareaHecho').append($nuevaTareaPlantilla)
      } else {
        $('#listadoTarea').append($nuevaTareaPlantilla)
      }

      // Muestra las tareas
      $nuevaTareaPlantilla.show()
    }
  },
  
  crearTarea: async () => {
     App.setLoading(true)
     const descr = $('#nuevaTarea').val()
     await App.listadoTareas.crearTarea(descr)
     window.location.reload()
   },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const descr = $('#descr')
    if (boolean) {
      loader.show()
      descr.hide()
    } else {
      loader.hide()
      descr.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})




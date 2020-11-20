function init() {
  console.log('js is running')

  // * Variables
  const grid = document.querySelector('.grid')

  const width = 10
  const height = 20
  // const cellCount = width * height
  const cells = []
  let activeTetrimonoShape = null

  //* Tetrimonoes:

  const tetrimonoes = [
    {
      name: 'Orange Ricky',
      defaultPosition: [6, 14, 15, 16],
    },
    {
      name: 'blueRicky',
      defaultPosition: [3, 13, 14, 15],
    },
    {
      name: 'clevelandZ',
      defaultPosition: [4, 5, 15, 16],
    },
    {
      name: 'rhodeIslandZ',
      defaultPosition: [4, 5, 13, 14],
    },
    {
      name: 'hero',
      defaultPosition: [3, 4, 5, 6],
    },
    {
      name: 'teewee',
      defaultPosition: [4, 13, 14, 15],
    },
    {
      name: 'smashboy',
      defaultPosition: [4, 5, 14, 15],
    }
  ]


  //* Active Tetrimono

  const activeTetrimono = {
    cellAPosition: null,
    cellBPosition: null,
    cellCPosition: null,
    cellDPosition: null,
  }


  // * Make a grid
  function createGrid() {
    for (let row = 1; row <= height; row++) {
      for (let column = 1; column <= width; column++) {
        const cell = document.createElement('div')
        cell.classList = `Y${row}X${column}`
        grid.appendChild(cell)
        cells.push(cell)
      }
    }
  }
  createGrid()


  //* Generate a random shape

  function generateActiveTetrimono() {
    // activeTetrimonoShape = tetrimonoes[Math.floor(Math.random() * tetrimonoes.length)]
    activeTetrimonoShape = tetrimonoes[0]
    return activeTetrimonoShape
  }

  console.log(activeTetrimonoShape)

  //* Add a shape

  function addActiveTetrimono() {
    const startingPosition = generateActiveTetrimono().defaultPosition

    cells[startingPosition[0]].classList.add('square-full')
    cells[startingPosition[1]].classList.add('square-full')
    cells[startingPosition[2]].classList.add('square-full')
    cells[startingPosition[3]].classList.add('square-full')

    activeTetrimono.cellAPosition = startingPosition[0]
    activeTetrimono.cellBPosition = startingPosition[1]
    activeTetrimono.cellCPosition = startingPosition[2]
    activeTetrimono.cellDPosition = startingPosition[3]
  }
  addActiveTetrimono()


  //* Remove a shape
  function removeActiveTetrimono() {
    cells[activeTetrimono.cellAPosition].classList.remove('square-full')
    cells[activeTetrimono.cellBPosition].classList.remove('square-full')
    cells[activeTetrimono.cellCPosition].classList.remove('square-full')
    cells[activeTetrimono.cellDPosition].classList.remove('square-full')
  }

  // addActiveTetrimono()


  function moveDownActiveTetrimono() {
    removeActiveTetrimono()
    activeTetrimono.cellAPosition = activeTetrimono.cellAPosition + 10
    activeTetrimono.cellBPosition = activeTetrimono.cellBPosition + 10
    activeTetrimono.cellCPosition = activeTetrimono.cellCPosition + 10
    activeTetrimono.cellDPosition = activeTetrimono.cellDPosition + 10

    cells[activeTetrimono.cellAPosition].classList.add('square-full')
    cells[activeTetrimono.cellBPosition].classList.add('square-full')
    cells[activeTetrimono.cellCPosition].classList.add('square-full')
    cells[activeTetrimono.cellDPosition].classList.add('square-full')
  }

  function moveLeftActiveTetrimono() {
    removeActiveTetrimono()
    activeTetrimono.cellAPosition = activeTetrimono.cellAPosition - 1
    activeTetrimono.cellBPosition = activeTetrimono.cellBPosition - 1
    activeTetrimono.cellCPosition = activeTetrimono.cellCPosition - 1
    activeTetrimono.cellDPosition = activeTetrimono.cellDPosition - 1

    cells[activeTetrimono.cellAPosition].classList.add('square-full')
    cells[activeTetrimono.cellBPosition].classList.add('square-full')
    cells[activeTetrimono.cellCPosition].classList.add('square-full')
    cells[activeTetrimono.cellDPosition].classList.add('square-full')
  }

  function moveRightActiveTetrimono() {
    removeActiveTetrimono()
    activeTetrimono.cellAPosition = activeTetrimono.cellAPosition + 1
    activeTetrimono.cellBPosition = activeTetrimono.cellBPosition + 1
    activeTetrimono.cellCPosition = activeTetrimono.cellCPosition + 1
    activeTetrimono.cellDPosition = activeTetrimono.cellDPosition + 1

    cells[activeTetrimono.cellAPosition].classList.add('square-full')
    cells[activeTetrimono.cellBPosition].classList.add('square-full')
    cells[activeTetrimono.cellCPosition].classList.add('square-full')
    cells[activeTetrimono.cellDPosition].classList.add('square-full')
  }

  function rotateActiveTetrimono() {
    if (activeTetrimonoShape.name === 'Orange Ricky') {
      removeActiveTetrimono() 

      activeTetrimono.cellAPosition = activeTetrimono.cellAPosition + 10
      activeTetrimono.cellBPosition = activeTetrimono.cellBPosition + 1
      activeTetrimono.cellCPosition = activeTetrimono.cellCPosition - 10
      activeTetrimono.cellDPosition = activeTetrimono.cellDPosition - 21

      cells[activeTetrimono.cellAPosition].classList.add('square-full')
      cells[activeTetrimono.cellBPosition].classList.add('square-full')
      cells[activeTetrimono.cellCPosition].classList.add('square-full')
      cells[activeTetrimono.cellDPosition].classList.add('square-full')
    }
  }


  //* Move a shape

  function handleKeyDown(event) {


    switch (event.keyCode) {
      case 40:
        removeActiveTetrimono()
        moveDownActiveTetrimono()
        console.log('test')
        break
      case 37:
        removeActiveTetrimono()
        moveLeftActiveTetrimono()
        console.log('test')
        break
      case 39:
        removeActiveTetrimono()
        moveRightActiveTetrimono()
        break
      case 38:
        removeActiveTetrimono()
        rotateActiveTetrimono()
        break
    }
  }

  //* Event listeners

  document.addEventListener('keydown', handleKeyDown)

  // console.log('test')



  //* Tests for movement etc

  // setTimeout(() => {
  //   moveDownActiveTetrimono()
  // }, 1000)

  // setInterval(() => {
  //   moveDownActiveTetrimono()
  // }, 1000)


}

window.addEventListener('DOMContentLoaded', init)
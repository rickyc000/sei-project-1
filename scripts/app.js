function init() {
  console.log('js is running')

  // * Variables
  const grid = document.querySelector('.grid')

  const width = 10
  const height = 20
  // const cellCount = width * height
  const cells = []


  //* Tetrimonoes

  const orangeRicky = {
    name: 'Orange Ricky',
    defaultPosition: [14, 15, 16, 6],
  }

  const blueRicky = {
    name: 'smashboy',
    defaultPosition: [4, 5, 14, 15],
  }

  const clevelandZ = {
    name: 'smashboy',
    defaultPosition: [4, 5, 14, 15],
  }

  const rhodeIslandZ = {
    name: 'smashboy',
    defaultPosition: [4, 5, 14, 15],
  }

  const hero = {
    name: 'smashboy',
    defaultPosition: [4, 5, 14, 15],
  }

  const teewee = {
    name: 'smashboy',
    defaultPosition: [4, 5, 14, 15],
  }

  const smashboy = {
    name: 'smashboy',
    defaultPosition: [4, 5, 14, 15],
  }

  const defaultPositions = [orangeRicky.defaultPosition, ]


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
        cell.classList = `X${row}Y${column}`
        grid.appendChild(cell)
        cells.push(cell)
      }
    }
  }
  createGrid()


  //* Generate a random shape

  function generateStartingShape() {
    return defaultPositions[Math.floor(Math.random() * defaultPositions.length)]
  }

  //* Add a shape

  function addActiveTetrimono() {
    const startingPosition = generateStartingShape()

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

  addActiveTetrimono()


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



  //* Move a shape

  function handleKeyDown(event) {
    removeActiveTetrimono()

    switch (event.keyCode) {
      case 40:
        moveDownActiveTetrimono()
        console.log('test')
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
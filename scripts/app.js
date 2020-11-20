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
    orientation: 'default',
  }


  // * Make a grid
  function createGrid() {
    for (let row = 1; row <= height; row++) {
      for (let column = 1; column <= width; column++) {
        const cell = document.createElement('div')
        cell.classList = `Y${row} X${column}`
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


  //* Add a new shape to the top of the page

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
    activeTetrimono.orientation = 'default'
  }
  addActiveTetrimono()



  //* Remove a shape
  function removeActiveTetrimono() {
    cells[activeTetrimono.cellAPosition].classList.remove('square-full')
    cells[activeTetrimono.cellBPosition].classList.remove('square-full')
    cells[activeTetrimono.cellCPosition].classList.remove('square-full')
    cells[activeTetrimono.cellDPosition].classList.remove('square-full')
  }



  //* Function to drop all Active Cell Positions by 1 row (or 10 cells)
  function moveCells(number) {
    activeTetrimono.cellAPosition = activeTetrimono.cellAPosition + number
    activeTetrimono.cellBPosition = activeTetrimono.cellBPosition + number
    activeTetrimono.cellCPosition = activeTetrimono.cellCPosition + number
    activeTetrimono.cellDPosition = activeTetrimono.cellDPosition + number
  }


  //* Fills a block of squares (-10 used for when the block becomes stationary, filling the squares above)
  function fillSquares(number) {
    cells[activeTetrimono.cellAPosition + number].classList.add('square-full')
    cells[activeTetrimono.cellBPosition + number].classList.add('square-full')
    cells[activeTetrimono.cellCPosition + number].classList.add('square-full')
    cells[activeTetrimono.cellDPosition + number].classList.add('square-full')
  }

  //* Remove Tetrimono from it's existing cell position
  function moveDownActiveTetrimono() {
    removeActiveTetrimono()

    moveCells(10)

    //* Checks if the cell below the current active cell is free:
    if (cells[activeTetrimono.cellAPosition].classList.contains('square-full')) {
      fillSquares(-10)
      addActiveTetrimono()
    } else if (cells[activeTetrimono.cellBPosition].classList.contains('square-full')) {
      fillSquares(-10)
      addActiveTetrimono()
    } else if (cells[activeTetrimono.cellCPosition].classList.contains('square-full')) {
      fillSquares(-10)
      addActiveTetrimono()
    } else if (cells[activeTetrimono.cellDPosition].classList.contains('square-full')) {
      fillSquares(-10)
      addActiveTetrimono()
    } else {

      fillSquares(0)

      //* Checks to see if the Active Cell is on the BOTTOM ROW:
      if (activeTetrimono.cellAPosition >= 190 && activeTetrimono.cellAPosition <= 199) {
        addActiveTetrimono()
      } else if (activeTetrimono.cellBPosition >= 190 && activeTetrimono.cellBPosition <= 199) {
        addActiveTetrimono()
      } else if (activeTetrimono.cellCPosition >= 190 && activeTetrimono.cellCPosition <= 199) {
        addActiveTetrimono()
      } else if (activeTetrimono.cellDPosition >= 190 && activeTetrimono.cellDPosition <= 199) {
        addActiveTetrimono()
      } else {
        return
      }
    }
  }

  //* Move LEFT active Tetrimono
  function moveLeftActiveTetrimono() {

    //* Check to see if any cells are the edge of the grid:
    if (cells[activeTetrimono.cellAPosition].classList.contains('X1')) {
      return
    } else if (cells[activeTetrimono.cellBPosition].classList.contains('X1')) {
      return
    } else if (cells[activeTetrimono.cellCPosition].classList.contains('X1')) {
      return
    } else if (cells[activeTetrimono.cellCPosition].classList.contains('X1')) {
      return
    } else {
      console.log('the other option')
      removeActiveTetrimono()
      moveCells(-1)
      fillSquares(0)
    }
  }

  //* Move RIGHT active Tetrimono

  function moveRightActiveTetrimono() {

    //* Check to see if any cells are the edge of the grid:
    if (cells[activeTetrimono.cellAPosition].classList.contains('X10')) {
      return
    } else if (cells[activeTetrimono.cellBPosition].classList.contains('X10')) {
      return
    } else if (cells[activeTetrimono.cellCPosition].classList.contains('X10')) {
      return
    } else if (cells[activeTetrimono.cellDPosition].classList.contains('X10')) {
      return
    } else {
      console.log('the other option')
      removeActiveTetrimono()
      moveCells(+1)
      fillSquares(0)
    }
  }



  function rotateActiveTetrimono() {

    if (activeTetrimonoShape.name === 'Orange Ricky') {

      if (activeTetrimono.orientation === 'default') {
        removeActiveTetrimono()
        activeTetrimono.cellAPosition = activeTetrimono.cellAPosition + 9
        activeTetrimono.cellBPosition = activeTetrimono.cellBPosition - 20
        activeTetrimono.cellCPosition = activeTetrimono.cellCPosition - 11
        activeTetrimono.cellDPosition = activeTetrimono.cellDPosition - 2
        activeTetrimono.orientation = 'left-side'
        console.log(activeTetrimono.orientation)
        fillSquares(0)

      } else if (activeTetrimono.orientation === 'left-side') {
        removeActiveTetrimono()
        activeTetrimono.cellAPosition = activeTetrimono.cellAPosition - 1
        activeTetrimono.cellBPosition = activeTetrimono.cellBPosition + 12
        activeTetrimono.cellCPosition = activeTetrimono.cellCPosition + 1
        activeTetrimono.cellDPosition = activeTetrimono.cellDPosition - 10
        activeTetrimono.orientation = 'upside-down'
        console.log(activeTetrimono.orientation)
        fillSquares(0)

      } else if (activeTetrimono.orientation === 'upside-down') {
        removeActiveTetrimono()
        activeTetrimono.cellAPosition = activeTetrimono.cellAPosition - 19
        activeTetrimono.cellBPosition = activeTetrimono.cellBPosition + 10
        activeTetrimono.cellCPosition = activeTetrimono.cellCPosition + 1
        activeTetrimono.cellDPosition = activeTetrimono.cellDPosition - 8
        activeTetrimono.orientation = 'right-side'
        console.log(activeTetrimono.orientation)
        fillSquares(0)

      } else {
        removeActiveTetrimono()
        activeTetrimono.cellAPosition = activeTetrimono.cellAPosition + 11
        activeTetrimono.cellBPosition = activeTetrimono.cellBPosition - 2
        activeTetrimono.cellCPosition = activeTetrimono.cellCPosition  + 9
        activeTetrimono.cellDPosition = activeTetrimono.cellDPosition  + 20
        activeTetrimono.orientation = 'default'
        console.log(activeTetrimono.orientation)
        fillSquares(0)
      }
    }

    if (activeTetrimonoShape.name === 'Orange Ricky') {

      if (activeTetrimono.orientation === 'default') {
        removeActiveTetrimono()
        activeTetrimono.cellAPosition = activeTetrimono.cellAPosition + 9
        activeTetrimono.cellBPosition = activeTetrimono.cellBPosition - 20
        activeTetrimono.cellCPosition = activeTetrimono.cellCPosition - 11
        activeTetrimono.cellDPosition = activeTetrimono.cellDPosition - 2
        activeTetrimono.orientation = 'left-side'
        console.log(activeTetrimono.orientation)
        fillSquares(0)

      } else if (activeTetrimono.orientation === 'left-side') {
        removeActiveTetrimono()
        activeTetrimono.cellAPosition = activeTetrimono.cellAPosition - 1
        activeTetrimono.cellBPosition = activeTetrimono.cellBPosition + 12
        activeTetrimono.cellCPosition = activeTetrimono.cellCPosition + 1
        activeTetrimono.cellDPosition = activeTetrimono.cellDPosition - 10
        activeTetrimono.orientation = 'upside-down'
        console.log(activeTetrimono.orientation)
        fillSquares(0)

      } else if (activeTetrimono.orientation === 'upside-down') {
        removeActiveTetrimono()
        activeTetrimono.cellAPosition = activeTetrimono.cellAPosition - 19
        activeTetrimono.cellBPosition = activeTetrimono.cellBPosition + 10
        activeTetrimono.cellCPosition = activeTetrimono.cellCPosition + 1
        activeTetrimono.cellDPosition = activeTetrimono.cellDPosition - 8
        activeTetrimono.orientation = 'right-side'
        console.log(activeTetrimono.orientation)
        fillSquares(0)

      } else {
        removeActiveTetrimono()
        activeTetrimono.cellAPosition = activeTetrimono.cellAPosition + 11
        activeTetrimono.cellBPosition = activeTetrimono.cellBPosition - 2
        activeTetrimono.cellCPosition = activeTetrimono.cellCPosition  + 9
        activeTetrimono.cellDPosition = activeTetrimono.cellDPosition  + 20
        activeTetrimono.orientation = 'default'
        console.log(activeTetrimono.orientation)
        fillSquares(0)
      }
    }

  }


  //* Move a shape with the keyboard

  function handleKeyDown(event) {
    switch (event.keyCode) {
      case 40:
        // removeActiveTetrimono()
        moveDownActiveTetrimono()
        console.log('test')
        break
      case 37:
        // removeActiveTetrimono()
        moveLeftActiveTetrimono()
        console.log('test')
        break
      case 39:
        // removeActiveTetrimono()
        moveRightActiveTetrimono()
        break
      case 38:
        // removeActiveTetrimono()
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
  // }, 300)


}

window.addEventListener('DOMContentLoaded', init)
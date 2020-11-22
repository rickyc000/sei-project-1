function init() {
  console.log('js is running')

  // * Variables
  const grid = document.querySelector('.grid')

  const width = 10
  const height = 20
  const cells = []
  let activeTetrimonoShape = null

  //* Tetrimonoes:

  const tetrimonoes = [
    {
      name: 'Orange Ricky',
      defaultPosition: [6, 14, 15, 16],
    },
    {
      name: 'Blue Ricky',
      defaultPosition: [3, 13, 14, 15],
    },
    {
      name: 'Cleveland Z',
      defaultPosition: [4, 5, 15, 16],
    },
    {
      name: 'Rhode Island Z',
      defaultPosition: [4, 5, 13, 14],
    },
    {
      name: 'Hero',
      defaultPosition: [3, 4, 5, 6],
    },
    {
      name: 'Teewee',
      defaultPosition: [4, 13, 14, 15],
    },
    {
      name: 'Smashboy',
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



  //* Function to move all Active Cells (arguments for how much to move each cell)
  function moveCells(cellA, cellB, cellC, cellD) {
    activeTetrimono.cellAPosition = activeTetrimono.cellAPosition + cellA
    activeTetrimono.cellBPosition = activeTetrimono.cellBPosition + cellB
    activeTetrimono.cellCPosition = activeTetrimono.cellCPosition + cellC
    activeTetrimono.cellDPosition = activeTetrimono.cellDPosition + cellD
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

    moveCells(10, 10, 10, 10)

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





  function checkingForFullSquares(cellA, cellB, cellC, cellD) {

    if (cells[activeTetrimono.cellAPosition + cellA].classList.contains('square-full')
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellBPosition]
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellCPosition]
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellDPosition]
    ) {
      return false
    } else if (cells[activeTetrimono.cellBPosition + cellB].classList.contains('square-full')
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellAPosition]
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellCPosition]
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellDPosition]
    ) {
      return false
    } else if (cells[activeTetrimono.cellCPosition + cellC].classList.contains('square-full')
      && cells[activeTetrimono.cellCPosition + cellC] !== cells[activeTetrimono.cellAPosition]
      && cells[activeTetrimono.cellCPosition + cellC] !== cells[activeTetrimono.cellBPosition]
      && cells[activeTetrimono.cellCPosition + cellC] !== cells[activeTetrimono.cellDPosition]
    ) {
      return false
    } else if (cells[activeTetrimono.cellDPosition + cellD].classList.contains('square-full')
      && cells[activeTetrimono.cellDPosition + cellD] !== cells[activeTetrimono.cellAPosition]
      && cells[activeTetrimono.cellDPosition + cellD] !== cells[activeTetrimono.cellBPosition]
      && cells[activeTetrimono.cellDPosition + cellD] !== cells[activeTetrimono.cellCPosition]
    ) {
      return false
    } else {
      return true
    }
  }




  //* Move LEFT active Tetrimono
  function moveLeftActiveTetrimono() {

    if (checkingForFullSquares(-1, -1, -1, -1)) {

      //* If it passes the above checks, if it then checks any of the cells are at the edge of the grid
      if (cells[activeTetrimono.cellAPosition].classList.contains('X1')) {
        return
      } else if (cells[activeTetrimono.cellBPosition].classList.contains('X1')) {
        return
      } else if (cells[activeTetrimono.cellCPosition].classList.contains('X1')) {
        return
      } else if (cells[activeTetrimono.cellCPosition].classList.contains('X1')) {
        return
      } else {
        removeActiveTetrimono()
        moveCells(-1, -1, -1, -1)
        fillSquares(0)
      }
    } else {
      return
    }
  }

  //* Move RIGHT active Tetrimono

  function moveRightActiveTetrimono() {

    if (checkingForFullSquares(1, 1, 1, 1)) {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X10')) {
        return
      } else if (cells[activeTetrimono.cellBPosition].classList.contains('X10')) {
        return
      } else if (cells[activeTetrimono.cellCPosition].classList.contains('X10')) {
        return
      } else if (cells[activeTetrimono.cellDPosition].classList.contains('X10')) {
        return
      } else {
        removeActiveTetrimono()
        moveCells(1, 1, 1, 1)
        fillSquares(0)
      }
    } else {
      return
    }
  }




  //* ROTATIONS for each of the different shapes:

  function rotateActiveTetrimono() {

    if (activeTetrimonoShape.name === 'Orange Ricky') {

      if (activeTetrimono.orientation === 'default') {
        if (checkingForFullSquares(9, -20, -11, -2)) {
          removeActiveTetrimono()
          moveCells(9, -20, -11, -2)
          activeTetrimono.orientation = 'left-side'
          fillSquares(0)
        } else {
          return 
        }

      } else if (activeTetrimono.orientation === 'left-side') {
        if (checkingForFullSquares(-11, 2, -9, -20)) {
          removeActiveTetrimono()
          moveCells(-11, 2, -9, -20)
          activeTetrimono.orientation = 'upside-down'
          fillSquares(0)
        } else {
          return
        }

      } else if (activeTetrimono.orientation === 'upside-down') {
        if (checkingForFullSquares(-9, 20, 11, 2)) {
          removeActiveTetrimono()
          moveCells(-9, 20, 11, 2)
          activeTetrimono.orientation = 'right-side'
          fillSquares(0)
        } else {
          return 
        }

      } else {
        if (checkingForFullSquares(11, -2, 9, 20)) {
          removeActiveTetrimono()
          moveCells(11, -2, 9, 20)
          activeTetrimono.orientation = 'default'
          fillSquares(0)
        } else {
          return 
        }
      }
    }


    if (activeTetrimonoShape.name === 'Blue Ricky') {

      if (activeTetrimono.orientation === 'default') {
        removeActiveTetrimono()
        moveCells(-9, -20, -11, -2)
        activeTetrimono.orientation = 'left-side'
        fillSquares(0)

      } else if (activeTetrimono.orientation === 'left-side') {
        removeActiveTetrimono()
        moveCells(21, 12, 1, -10)
        activeTetrimono.orientation = 'upside-down'
        fillSquares(0)

      } else if (activeTetrimono.orientation === 'upside-down') {
        removeActiveTetrimono()
        moveCells(-1, 10, 1, -8)
        activeTetrimono.orientation = 'right-side'
        fillSquares(0)

      } else {
        removeActiveTetrimono()
        moveCells(-11, -2, 9, 20)
        activeTetrimono.orientation = 'default'
        fillSquares(0)
      }
    }

    if (activeTetrimonoShape.name === 'Cleveland Z') {

      if (activeTetrimono.orientation === 'default') {
        removeActiveTetrimono()
        moveCells(-9, 0, -11, -2)
        activeTetrimono.orientation = 'position two'
        fillSquares(0)

      } else {
        removeActiveTetrimono()
        moveCells(9, 0, 11, 2)
        activeTetrimono.orientation = 'default'
        fillSquares(0)

        //* ADD THE FULL ROTATION POSITIONS HERE
      }
    }

    if (activeTetrimonoShape.name === 'Rhode Island Z') {

      if (activeTetrimono.orientation === 'default') {
        removeActiveTetrimono()
        moveCells(0, 9, -20, -11)
        activeTetrimono.orientation = 'position two'
        fillSquares(0)

      } else {
        removeActiveTetrimono()
        moveCells(0, -9, 20, 11)
        activeTetrimono.orientation = 'default'
        fillSquares(0)

        //* ADD THE FULL ROTATION POSITIONS HERE
      }
    }


    if (activeTetrimonoShape.name === 'Hero') {

      if (activeTetrimono.orientation === 'default') {
        removeActiveTetrimono()
        moveCells(-19, -10, -1, 8)
        activeTetrimono.orientation = 'position two'
        fillSquares(0)

      } else {
        removeActiveTetrimono()
        moveCells(19, 10, 1, -8)
        activeTetrimono.orientation = 'default'
        fillSquares(0)

        //* ADD THE FULL ROTATION POSITIONS HERE
      }
    }


    if (activeTetrimonoShape.name === 'Teewee') {

      if (activeTetrimono.orientation === 'default') {
        removeActiveTetrimono()
        moveCells(0, -20, -11, -2)
        activeTetrimono.orientation = 'left-side'
        fillSquares(0)

      } else if (activeTetrimono.orientation === 'left-side') {
        removeActiveTetrimono()
        moveCells(0, 2, -9, -20)
        activeTetrimono.orientation = 'upside-down'
        fillSquares(0)

      } else if (activeTetrimono.orientation === 'upside-down') {
        removeActiveTetrimono()
        moveCells(0, 20, 11, 2)
        activeTetrimono.orientation = 'right-side'
        fillSquares(0)

      } else {
        removeActiveTetrimono()
        moveCells(0, -2, 9, 20)
        activeTetrimono.orientation = 'default'
        fillSquares(0)
      }
    } else {
      return
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
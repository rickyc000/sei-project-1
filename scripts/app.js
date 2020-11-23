function init() {
  console.log('js is running')

  // * Variables
  const grid = document.querySelector('.grid')

  const width = 10
  const height = 20
  const cells = []
  let activeTetrimonoShape = null
  let controlsEnabled = false

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
    activeTetrimonoShape = tetrimonoes[Math.floor(Math.random() * tetrimonoes.length)]
    // activeTetrimonoShape = tetrimonoes[5]
    return activeTetrimonoShape
  }




  //* LOOP to check for full rows of squares

  function checkingForCompleteRows() {
    const rows = []
    const completeRows = []
    for (let rowNumber = 1; rowNumber <= 19; rowNumber++) {
      rows[rowNumber] = []
      rows[rowNumber].length = 0
      for (let cellNumber = rowNumber * 10; cellNumber <= rowNumber * 10 + 9; cellNumber++) {
        if (cells[cellNumber].classList.contains('square-full')) {
          rows[rowNumber].push(['square-full'])
        } else {
          // console.log(rowNumber)
        }
        if (rows[rowNumber].length === 10) {
          console.log('Row number ' + rowNumber + ' is full')
          completeRows.push(rowNumber + 1)
        } else {
          // console.log(rowNumber)
        }
      }
    }
    clearCompleteRows(completeRows)
  }

  //* FUNCTION to drop a ROW when complete:

  function clearCompleteRows(rowNumbers) {

    if (rowNumbers.length === 0) {
      console.log('do nothing!')
    } else {
      console.log(rowNumbers + ' time to clear some rows')
    }
  }




  //* Add a new shape to the top of the page

  function addActiveTetrimono() {

    controlsEnabled = false

    checkingForCompleteRows()

    setTimeout(() => {
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

      controlsEnabled = true

    }, 1000)
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



  //* MOVE DOWN function:

  function moveDownActiveTetrimono() {

    //   //* Checks to see if the Active Cell is on the BOTTOM ROW:
    if (activeTetrimono.cellAPosition >= 190 && activeTetrimono.cellAPosition <= 199) {
      addActiveTetrimono()

    } else if (activeTetrimono.cellBPosition >= 190 && activeTetrimono.cellBPosition <= 199) {
      addActiveTetrimono()

    } else if (activeTetrimono.cellCPosition >= 190 && activeTetrimono.cellCPosition <= 199) {
      addActiveTetrimono()

    } else if (activeTetrimono.cellDPosition >= 190 && activeTetrimono.cellDPosition <= 199) {
      addActiveTetrimono()

    } else {

      if (checkingForFullSquares(10, 10, 10, 10)) {
        removeActiveTetrimono()
        moveCells(10, 10, 10, 10)
        fillSquares(0)
      } else {

        addActiveTetrimono()
      }
    }
  }
















  function checkingForFullSquares(cellA, cellB, cellC, cellD) {

    if (cells[activeTetrimono.cellAPosition + cellA].classList.contains('square-full')
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellBPosition]
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellCPosition]
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellDPosition]
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellAPosition]
    ) {
      console.log(cells[activeTetrimono.cellBPosition + cellA].classList + ' cell A ')
    } else if (cells[activeTetrimono.cellBPosition + cellB].classList.contains('square-full')
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellAPosition]
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellCPosition]
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellDPosition]
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellBPosition]
    ) {
      // return false
      console.log(cells[activeTetrimono.cellBPosition + cellB].classList + ' cell B ')
    } else if (cells[activeTetrimono.cellCPosition + cellC].classList.contains('square-full')
      && cells[activeTetrimono.cellCPosition + cellC] !== cells[activeTetrimono.cellAPosition]
      && cells[activeTetrimono.cellCPosition + cellC] !== cells[activeTetrimono.cellBPosition]
      && cells[activeTetrimono.cellCPosition + cellC] !== cells[activeTetrimono.cellDPosition]
      && cells[activeTetrimono.cellBPosition + cellC] !== cells[activeTetrimono.cellCPosition]
    ) {
      console.log(cells[activeTetrimono.cellBPosition + cellC].classList + ' cell C ')
    } else if (cells[activeTetrimono.cellDPosition + cellD].classList.contains('square-full')
      && cells[activeTetrimono.cellDPosition + cellD] !== cells[activeTetrimono.cellAPosition]
      && cells[activeTetrimono.cellDPosition + cellD] !== cells[activeTetrimono.cellBPosition]
      && cells[activeTetrimono.cellDPosition + cellD] !== cells[activeTetrimono.cellCPosition]
      && cells[activeTetrimono.cellBPosition + cellD] !== cells[activeTetrimono.cellDPosition]
    ) {
      console.log(cells[activeTetrimono.cellBPosition + cellB].classList + ' cell D ')
    } else {
      return true
    }
  }




  //* Move LEFT active Tetrimono
  function moveLeftActiveTetrimono() {

    if (checkingForFullSquares(-1, -1, -1, -1)) {

      //* If it passes the above checks,  it then checks any of the cells are at the edge of the grid
      if (cells[activeTetrimono.cellAPosition].classList.contains('X1')) {
        return
      } else if (cells[activeTetrimono.cellBPosition].classList.contains('X1')) {
        return
      } else if (cells[activeTetrimono.cellCPosition].classList.contains('X1')) {
        return
      } else if (cells[activeTetrimono.cellDPosition].classList.contains('X1')) {
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


  //* Function to check for available spaces, MOVE if yes, RETURN nothing if no

  function checkAndRotateTetrimono(cellA, cellB, cellC, cellD, orientation) {
    if (checkingForFullSquares(cellA, cellB, cellC, cellD)) {
      removeActiveTetrimono()
      moveCells(cellA, cellB, cellC, cellD)
      activeTetrimono.orientation = orientation
      fillSquares(0)
    } else {
      return
    }
  }


  //* ROTATION rules for ORANGE RICKY shape:
  function rotateOrangeRicky() {

    if (activeTetrimono.orientation === 'default') {
      checkAndRotateTetrimono(9, -20, -11, -2, 'left-side')

    } else if (activeTetrimono.orientation === 'left-side') {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X10')) {
        return
      } else {
        checkAndRotateTetrimono(-11, 2, -9, -20, 'upside-down')
      }

    } else if (activeTetrimono.orientation === 'upside-down') {
      checkAndRotateTetrimono(-9, 20, 11, 2, 'right-side')

    } else {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X1')) {
        return
      } else {
        checkAndRotateTetrimono(11, -2, 9, 20, 'default')
      }
    }
  }



  //* ROTATION rules for BLUE RICKY shape:

  function rotateBlueRicky() {

    if (activeTetrimono.orientation === 'default') {
      checkAndRotateTetrimono(-9, -20, -11, -2, 'left-side')

    } else if (activeTetrimono.orientation === 'left-side') {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X10')) {
        return
      } else {
        checkAndRotateTetrimono(11, 2, -9, -20, 'upside-down')
      }

    } else if (activeTetrimono.orientation === 'upside-down') {
      checkAndRotateTetrimono(9, 20, 11, 2, 'right-side')

    } else {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X1')) {
        return
      } else {
        checkAndRotateTetrimono(-11, -2, 9, 20, 'default')
      }
    }
  }

  //* ROTATION rules for CLEVELAND Z shape:

  function rotateClevelandZ() {
    if (activeTetrimono.orientation === 'default') {
      checkAndRotateTetrimono(-9, 0, -11, -2, 'left-side')

    } else if (activeTetrimono.orientation === 'left-side') {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X10')) {
        return
      } else {
        checkAndRotateTetrimono(11, 0, -9, -20, 'upside-down')
      }

    } else if (activeTetrimono.orientation === 'upside-down') {
      checkAndRotateTetrimono(9, 0, 11, 2, 'right-side')

    } else {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X1')) {
        return
      } else {
        checkAndRotateTetrimono(-11, 0, 9, 20, 'default')
      }
    }
  }


  //* ROTATION rules for Rhode Island Z:

  function rotateRhodeIslandZ() {
    if (activeTetrimono.orientation === 'default') {
      checkAndRotateTetrimono(0, 9, -20, -11, 'left-side')

    } else if (activeTetrimono.orientation === 'left-side') {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X10')) {
        return
      } else {
        checkAndRotateTetrimono(0, -11, 2, -9, 'upside-down')
      }

    } else if (activeTetrimono.orientation === 'upside-down') {
      checkAndRotateTetrimono(0, -9, 20, 11, 'right-side')

    } else {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X1')) {
        return
      } else {
        checkAndRotateTetrimono(0, 11, -2, 9, 'default')
      }
    }
  }



  //* ROTATION rules for HERO

  function rotateHero() {

    //! Can't add this here because it needs to be written into the rules of certain orientations:
    // if (activeTetrimono.cellAPosition >= 0 && activeTetrimono.cellAPosition <= 9) {
    //       return

    if (activeTetrimono.orientation === 'default') {
      checkAndRotateTetrimono(-19, -10, -1, 8, 'left-side')

    } else if (activeTetrimono.orientation === 'left-side') {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X1') || cells[activeTetrimono.cellAPosition].classList.contains('X10')) {
        return
      } else {
        checkAndRotateTetrimono(12, 1, -10, -21, 'upside-down')
      }

    } else if (activeTetrimono.orientation === 'upside-down') {
      checkAndRotateTetrimono(19, 10, 1, -8, 'right-side')

    } else {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X1') || cells[activeTetrimono.cellAPosition].classList.contains('X10')) {
        return
      } else {
        checkAndRotateTetrimono(-12, -1, 10, 21, 'default')
      }
    }
  }

  //* ROTATION rules for TEEWEE shape

  function rotateTeewee() {
    if (activeTetrimono.orientation === 'default') {
      checkAndRotateTetrimono(0, -20, -11, -2, 'left-side')

    } else if (activeTetrimono.orientation === 'left-side') {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X10')) {
        return
      } else {
        checkAndRotateTetrimono(0, 2, -9, -20, 'upside-down')

      }
    } else if (activeTetrimono.orientation === 'upside-down') {
      checkAndRotateTetrimono(0, 20, 11, 2, 'right-side')


    } else {
      if (cells[activeTetrimono.cellAPosition].classList.contains('X1')) {
        return
      } else {
        checkAndRotateTetrimono(0, -2, 9, 20, 'default')
      }
    }
  }



  //* ROTATIONS for each of the different shapes:

  function rotateActiveTetrimono() {

    if (activeTetrimono.cellAPosition >= 0 && activeTetrimono.cellAPosition <= 9) {
      return
    } else {
      if (activeTetrimonoShape.name === 'Orange Ricky') {
        rotateOrangeRicky()
      }
      if (activeTetrimonoShape.name === 'Blue Ricky') {
        rotateBlueRicky()
      }
      if (activeTetrimonoShape.name === 'Cleveland Z') {
        rotateClevelandZ()
      }
      if (activeTetrimonoShape.name === 'Rhode Island Z') {
        rotateRhodeIslandZ()
      }
      if (activeTetrimonoShape.name === 'Hero') {
        rotateHero()
      }
      if (activeTetrimonoShape.name === 'Teewee') {
        rotateTeewee()
      } else {
        return
      }
    }
  }


  //* Move a shape with the keyboard

  function handleKeyDown(event) {
    switch (event.keyCode) {
      case 40:
        if (controlsEnabled === true) {
          moveDownActiveTetrimono()
        }
        break
      case 37:
        if (controlsEnabled === true) {
          moveLeftActiveTetrimono()
        }
        break
      case 39:
        if (controlsEnabled === true) {
          moveRightActiveTetrimono()
        }
        break
      case 38:
        if (controlsEnabled === true) {
          rotateActiveTetrimono()
        }
        break
    }
  }


  // for (let i = 190; i <= 199; i++) {
  //   if (cells[i].contains('square-full')) {
  //     console.log(i + ' square full')
  //   } else {
  //     console.log(i + ' free')
  //   }
  // }







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
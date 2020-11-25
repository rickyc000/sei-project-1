function init() {
  console.log('js is running')

  // * Variables
  const grid = document.querySelector('.grid')

  const startGameButton = document.querySelector('.start-button')
  const resetGameButton = document.querySelector('.reset-button')
  const scoreDisplay = document.querySelector('.score-display')
  const levelDisplay = document.querySelector('.level-display')

  console.log(scoreDisplay)
  console.log(levelDisplay)

  const width = 10
  const height = 20
  const cells = []
  let activeTetrimonoShape = null
  let controlsEnabled = false

  let gameInPlay = false


  let timerId = null

  let levelTotal = 1
  const levelArray = [1]
  let totalScore = 0

  scoreDisplay.textContent = totalScore
  levelDisplay.textContent = levelTotal

  //* Tetrimonoes:

  const tetrimonoes = [
    {
      name: 'Orange Ricky',
      defaultPosition: [6, 14, 15, 16],
      color: 'orange-ricky',
    },
    {
      name: 'Blue Ricky',
      defaultPosition: [3, 13, 14, 15],
      color: 'blue-ricky',

    },
    {
      name: 'Cleveland Z',
      defaultPosition: [4, 5, 15, 16],
      color: 'cleveland-z',
    },
    {
      name: 'Rhode Island Z',
      defaultPosition: [4, 5, 13, 14],
      color: 'rhode-island-z',
    },
    {
      name: 'Hero',
      defaultPosition: [3, 4, 5, 6],
      color: 'hero',
    },
    {
      name: 'Teewee',
      defaultPosition: [4, 13, 14, 15],
      color: 'teewee',
    },
    {
      name: 'Smashboy',
      defaultPosition: [4, 5, 14, 15],
      color: 'smashboy',
    }
  ]


  //* Active Tetrimono

  const activeTetrimono = {
    cellAPosition: null,
    cellBPosition: null,
    cellCPosition: null,
    cellDPosition: null,
    orientation: 'default',
    color: '',
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


  //* Function to start the game:

  function startGame() {
    gameInPlay = true
    addActiveTetrimono()
  }

  //* Function to reset the game:

  function resetGame() {
    console.log(gameInPlay)
    console.log('reset game')

    gameInPlay = false
    controlsEnabled = false

    totalScore = 0
    scoreDisplay.textContent = totalScore

    levelTotal = 1
    levelDisplay.textContent = levelTotal


    console.log(gameInPlay)

  }


  //* Generate a random shape

  function generateActiveTetrimono() {
    activeTetrimonoShape = tetrimonoes[Math.floor(Math.random() * tetrimonoes.length)]
    // activeTetrimonoShape = tetrimonoes[1]
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
          completeRows.push(rowNumber)
        } else {
          // console.log(rowNumber)
        }
      }
    }

    //* This then passes an ARRAY of any rows that need clearing:
    clearCompleteRows(completeRows)
  }



  //* FUNCTION to clear a ROW when complete:

  function clearCompleteRows(rowNumbersToClear) {

    //* If the array is empty, then nothing happens
    if (rowNumbersToClear.length === 0) {
      return
    } else {

      //* This then finds the HIGHEST number in the array:      
      const firstRowToClear = rowNumbersToClear.reduce((acc, curr) => {
        return Math.max(acc, curr)
      })

      //* This then removes the square-full class from the cells in that row:
      //* Then adds the classList from the cell above 

      for (let i = firstRowToClear; i > 0; i--) {
        const rowToClear = i
        for (let i = rowToClear * 10; i <= rowToClear * 10 + 9; i++) {
          cells[i].classList.remove('square-full')
          cells[i].classList = cells[i - 10].classList
        }
      }

      //* The function then clears the last row number from the array
      //* And runs the check for complete rows again:

      rowNumbersToClear.pop()
      checkingForCompleteRows()

      //* Level calculator through each new score:

      levelArray.push(1)
      levelTotal = Math.ceil(levelArray.length / 5)
      console.log('The current level is: ' + levelTotal)

      //* Score calculator:

      totalScore = totalScore + (100 * levelTotal)
      console.log('TOTAL SCORE = ' + totalScore)
      scoreDisplay.textContent = totalScore
      levelDisplay.textContent = levelTotal
    }
  }


  //* Add a new shape to the top of the page

  function addActiveTetrimono() {

    clearInterval(timerId)

    controlsEnabled = false

    // checkingForCompleteRows()

    if (gameInPlay === true) {

      checkingForCompleteRows()

      //* Slight pause before generating:
      setTimeout(() => {
        const startingTetrimono = generateActiveTetrimono()

        const startingPosition = startingTetrimono.defaultPosition

        cells[startingPosition[0]].classList.add('square-full', startingTetrimono.color)
        cells[startingPosition[1]].classList.add('square-full', startingTetrimono.color)
        cells[startingPosition[2]].classList.add('square-full', startingTetrimono.color)
        cells[startingPosition[3]].classList.add('square-full', startingTetrimono.color)

        activeTetrimono.cellAPosition = startingPosition[0]
        activeTetrimono.cellBPosition = startingPosition[1]
        activeTetrimono.cellCPosition = startingPosition[2]
        activeTetrimono.cellDPosition = startingPosition[3]
        activeTetrimono.orientation = 'default'
        activeTetrimono.color = startingTetrimono.color

        controlsEnabled = true

        gameOverCheck()

        timerId = setInterval(() => {
          moveDownActiveTetrimono()
          console.log(timerId + ' timerId')
        }, 400)

      }, 200)



    } else {
      console.log('game not in play')
    }
  }





  //* Checking for GAME OVER:

  function gameOverCheck() {

    if (checkingForFullSquares(10, 10, 10, 10)) {
      return
    } else {

      gameInPlay = false
      console.log('GAME OVER!')
      //* Deactivate the timer and add a pop out message here with the option to restart (refresh the page)
    }

  }


  //* Remove a shape
  function removeActiveTetrimono() {
    cells[activeTetrimono.cellAPosition].classList.remove('square-full', activeTetrimono.color)
    cells[activeTetrimono.cellBPosition].classList.remove('square-full', activeTetrimono.color)
    cells[activeTetrimono.cellCPosition].classList.remove('square-full', activeTetrimono.color)
    cells[activeTetrimono.cellDPosition].classList.remove('square-full', activeTetrimono.color)
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
    cells[activeTetrimono.cellAPosition + number].classList.add('square-full', activeTetrimono.color)
    cells[activeTetrimono.cellBPosition + number].classList.add('square-full', activeTetrimono.color)
    cells[activeTetrimono.cellCPosition + number].classList.add('square-full', activeTetrimono.color)
    cells[activeTetrimono.cellDPosition + number].classList.add('square-full', activeTetrimono.color)
  }



  //* MOVE DOWN function:

  function moveDownActiveTetrimono() {

    if (gameInPlay === true) {

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



    } else {
      console.log('Game not in play')
    }
  }


  function checkingForFullSquares(cellA, cellB, cellC, cellD) {

    if (cells[activeTetrimono.cellAPosition + cellA].classList.contains('square-full')
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellBPosition]
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellCPosition]
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellDPosition]
      && cells[activeTetrimono.cellAPosition + cellA] !== cells[activeTetrimono.cellAPosition]
    ) {
      return
    } else if (cells[activeTetrimono.cellBPosition + cellB].classList.contains('square-full')
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellAPosition]
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellCPosition]
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellDPosition]
      && cells[activeTetrimono.cellBPosition + cellB] !== cells[activeTetrimono.cellBPosition]
    ) {
      // return false
      return
    } else if (cells[activeTetrimono.cellCPosition + cellC].classList.contains('square-full')
      && cells[activeTetrimono.cellCPosition + cellC] !== cells[activeTetrimono.cellAPosition]
      && cells[activeTetrimono.cellCPosition + cellC] !== cells[activeTetrimono.cellBPosition]
      && cells[activeTetrimono.cellCPosition + cellC] !== cells[activeTetrimono.cellDPosition]
      && cells[activeTetrimono.cellBPosition + cellC] !== cells[activeTetrimono.cellCPosition]
    ) {
      return
    } else if (cells[activeTetrimono.cellDPosition + cellD].classList.contains('square-full')
      && cells[activeTetrimono.cellDPosition + cellD] !== cells[activeTetrimono.cellAPosition]
      && cells[activeTetrimono.cellDPosition + cellD] !== cells[activeTetrimono.cellBPosition]
      && cells[activeTetrimono.cellDPosition + cellD] !== cells[activeTetrimono.cellCPosition]
      && cells[activeTetrimono.cellBPosition + cellD] !== cells[activeTetrimono.cellDPosition]
    ) {
      return
    } else {
      return true
    }
  }




  //* Move LEFT active Tetrimono
  function moveLeftActiveTetrimono() {

    if (gameInPlay === true) {

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

    } else {
      console.log('Cannot MOVELEFT, game not in play!')
    }

  }

  //* Move RIGHT active Tetrimono

  function moveRightActiveTetrimono() {

    if (gameInPlay === true) {

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

    if (gameInPlay === true) {

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

    } else {
      return
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







  //* Event listeners

  document.addEventListener('keydown', handleKeyDown)

  startGameButton.addEventListener('click', startGame)
  resetGameButton.addEventListener('click', resetGame)


  //* Tests for movement etc

  // setTimeout(() => {
  //   moveDownActiveTetrimono()
  // }, 1000)



}

window.addEventListener('DOMContentLoaded', init)
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const totalMatches = document.querySelector('#total_words')
  const longest = document.querySelector('#longest_word')
  const msg = document.querySelector('#msg')
  const most_valuable_word = ""
  const startBtn = document.querySelector('#start-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  let totalMatchesInt = 0
  var currentchr = ""
  const colors = [
    'DarkOliveGreen',
    'CadetBlue',
    'DarkOrchid',
    'DarkOliveGreen',
    'DarkCyan'
  ]

  //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  console.log(theTetrominoes[0][0])

  //randomly select a Tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

  //draw the Tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
      squares[currentPosition + index].style.backgroundColor = colors[random]
      squares[currentPosition + index].innerText = currentchr
    })
  }

  //undraw the Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
      squares[currentPosition + index].style.backgroundColor = ''
      squares[currentPosition + index].innerText = ''
    })
  }


  //assign functions to keyCodes
  function control(e) {
    if(msg.innerHTML!='end') {
      if(e.keyCode === 37) {
        moveLeft()
      } else if (e.keyCode === 38) {
        rotate()
      } else if (e.keyCode === 39) {
        moveRight()
      } else if (e.keyCode === 40) {
        moveDown()
  
        // between 'A' and 'Z'
      } else if (e.keyCode <= 90 && e.keyCode >= 65) {
        currentchr = String.fromCharCode(e.keyCode)
        console.log('pressed ' + currentchr)
      }
    }
  }
  document.addEventListener('keyup', control)

  //move down function
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  // runs for row deletion
  function freeze() {
    // stops tetromino at obstacle
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      //start a new tetromino falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      // reset current char
      currentchr = ""
      draw()
      nextShape()
      addScore()
      gameOver()
    }
  }

  //move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1
    }
    draw()
  }

  //move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    if(!isAtRightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw()
  }

  
  ///FIX ROTATION OF TETROMINOS A THE EDGE 
  function isAtRight() {
    return current.some(index=> (currentPosition + index + 1) % width === 0)  
  }
  
  function isAtLeft() {
    return current.some(index=> (currentPosition + index) % width === 0)
  }
  
  function checkRotatedPosition(P){
    P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
    if ((P+1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
      if (isAtRight()){            //use actual position to check if it's flipped over to right side
        currentPosition += 1    //if so, add one to wrap it back around
        checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
        }
    }
    else if (P % width > 5) {
      if (isAtLeft()){
        currentPosition -= 1
      checkRotatedPosition(P)
      }
    }
  }
  
  //rotate the tetromino
  function rotate() {
    undraw()
    currentRotation ++
    if(currentRotation === current.length) { //if the current rotation gets to 4, make it go back to 0
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    checkRotatedPosition()
    draw()
  }
  /////////

  
  
  //show up-next tetromino in mini-grid display
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  const displayIndex = 0


  //the Tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  //display the shape in the mini-grid display
  function nextShape() {
    //remove any trace of a tetromino form the entire grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
      square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }

  //add functionality to the button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      nextShape()
    }
  })

  // row deletion and add score
  function addScore() {
    // iterate over each row
    
    for (let i = 0; i < 199; i +=width) {

      console.log('iterating over row'  +i)
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      // full row fill deletion
      if(row.every(index => squares[index].classList.contains('taken'))) {
        score +=10
        scoreDisplay.innerHTML = score
        // 'remove' row by modifying html
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
          squares[index].innerText = ''
        })
        let squaresRemoved = squares.splice(i, width)
        // append preexisting rows to "fresh" row
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
      // some chars exist, check for word matches
      else if (row.some(index => squares[index].innerHTML != '')) {

        // get text in row
        let rowText = []
        row.forEach(index => {
          if(squares[index].innerText == '') {
            // needs to be compatible with getSubstrings()
            rowText.push(' ');
          }
          else {
            rowText.push(squares[index].innerText);
          }
        })

        //find all substrings of min<=length<=max and sort descending
        substrings = getSubstrings(rowText)
        console.log(substrings)
        let substringsListDesc = sortByLengthDescending(substrings)
        console.log(substringsListDesc)
        var found = false
        var j = 0
        while (j < substringsListDesc.length && !found) { 
          // matched a substring with word in dict, dont need to search for more
          if(dictionary.includes(substringsListDesc[j])) {
            console.log('found match')
            totalMatchesInt += 1
            totalMatches.innerText =  totalMatchesInt
            updatelongest(substringsListDesc[j])
            addMatchedWord(substringsListDesc[j])
            score += getScrabblePoints(substringsListDesc[j])
            scoreDisplay.innerHTML = score
            row.forEach(index => {
              squares[index].classList.remove('taken')
              squares[index].classList.remove('tetromino')
              squares[index].style.backgroundColor = ''
              squares[index].innerText = ''
            })
            // watch out for i and j confusion here
            let squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
            console.log('breaking')
            found = true
            }
            j++
        }


      }
    }
  }

  //game over
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      msg.innerHTML = 'end'
      clearInterval(timerId)
    }
  }
  // helper functions
  function getSubstrings(arr) {
    const result = [];
    const maxSubstringLength = 10;
    const minSubstringLength = 3;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== '') {
        for (let j = minSubstringLength; j <= maxSubstringLength; j++) {
          if (i + j <= arr.length && arr.slice(i, i + j).indexOf(' ') === -1) {
            result.push(arr.slice(i, i + j).join(''));
          } else {
            break;
          }
        }
      } else {
        break;
      }
    }
    return result;
  }
  
  function sortByLengthDescending(arr) {
    arr.sort(function(a, b) {
      if (a.length < b.length) {
        return 1;
      } else if (a.length > b.length) {
        return -1;
      } else {
        return 0;
      }
    });
    return arr;
  }

  function getScrabblePoints(word) {
    const pointValues = {
      'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1,
      'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1,
      'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
    };
    
    let points = 0;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i].toUpperCase();
      points += pointValues[letter] || 0;
    }
    
    return points * 10;
  }
  
  function add_game() {
    console.log('saving score')
    var form = document.createElement("form");
    var score = document.createElement("input");  
    var wordsmatched = document.createElement("input");  
    var longestword = document.createElement("input");  

    // player created in views.py

    form.method = "POST";
    form.action = "add_game";   

    score.value = document.getElementById('score').innerText;
    wordsmatched.value = document.getElementById('total_words').innerText;
    longestword.value =  document.getElementById('longest_word').innerText;
    wordsmatched.name = "words_matched"
    score.name="score";
    longestword.name = "longest_word";
    form.appendChild(score);
    form.appendChild(wordsmatched);
    form.appendChild(longestword);

    document.body.appendChild(form);

    form.submit();
  }
  let save_btn = document.getElementById('save-button');
  save_btn.addEventListener('click', add_game);
  save_btn.addEventListener('click', ()=> {console.log('clicked')});

  function addMatchedWord(word) {
    let wordsDiv = document.getElementById('matched_words')
    wordsDiv.innerHTML = "<div>"+word+"</div>" + wordsDiv.innerHTML
    wordsDiv.innerHTML = getTop10Divs();
  }

  function updatelongest(str) {
    if(str.length > longest.innerText.length) {
      longest.innerHTML = str;
    }
  }

  function getTop10Divs() {
    // Get the container <div> element by its ID
    const container = document.getElementById("matched_words");
  
    // Create an array to store the child <div> elements
    const divs = [];
  
    // Loop over the child <div> elements and add them to the array
    for (let i = 0; i < container.children.length; i++) {
      divs.push(container.children[i].outerHTML);
    }
  
    // Get the top 10 <div> elements
    const top10Divs = divs.slice(0, 10);
  
    // Join the top 10 <div> elements into a string and return it
    return top10Divs.join("");
  }

})

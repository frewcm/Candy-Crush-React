/* eslint-disable react-hooks/exhaustive-deps */

import React,{useState,useEffect} from 'react'
import ScoreBoard from './components/ScoreBoard'
import BlueCandy from './images/blue.png'
import GreenCandy from './images/green.png'
import OrangeCandy from './images/orange.png'
import PurpleCandy from './images/purple.png'
import RedCandy from './images/red.png'
import YellowCandy from './images/yellow.png'
import Blank from './images/blank.png'
import CandyBack from './images/candyback.jpg'
const candyColor = [BlueCandy, GreenCandy,OrangeCandy,PurpleCandy ,RedCandy,YellowCandy];
const width = 8

function App() {

  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  const checkForColumnOfFour = () => {
    for(let i = 0; i <= 39; i++){
       const columnOfFour = [i, i + width, i + width * 2,i + width * 3]
       const decidedColor = currentColorArrangement[i]

       const isBlank = currentColorArrangement[i] === Blank 
        
       if(columnOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
           setScoreDisplay((score)=> score + 4)
           columnOfFour.forEach(square => currentColorArrangement[square] = Blank)
           return true
   }
      }
              }
              const checkForRowOfFour = () => {
                for(let i = 0; i < 64; i++){
                   const rowOfFour = [i, i + 1, i + 2,i + 3]
                   const decidedColor = currentColorArrangement[i]
                   const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
                   const isBlank = currentColorArrangement[i] === Blank 

                   if(notValid.includes(i)) continue
                   if(rowOfFour.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
                    setScoreDisplay((score)=> score + 4)
                       rowOfFour.forEach(square => currentColorArrangement[square] = Blank)
                       return true
               }
                  }
                          }
  
  const checkForColumnOfThree = () => {
    for(let i = 0; i <= 47; i++){
       const columnOfThree = [i, i + width, i + width * 2]
       const decidedColor = currentColorArrangement[i]
       const isBlank = currentColorArrangement[i] === Blank 
        
       if(columnOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
        setScoreDisplay((score)=> score + 3)
           columnOfThree.forEach(square => currentColorArrangement[square] = Blank)
           return true
   }
      }
              }
        
               
  const checkForRowOfThree = () => {
    for(let i = 0; i < 64; i++){
       const rowOfThree = [i, i + 1, i + 2]
       const decidedColor = currentColorArrangement[i]
       const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
       const isBlank = currentColorArrangement[i] === Blank 

       if(notValid.includes(i)) continue
       if(rowOfThree.every(square => currentColorArrangement[square] === decidedColor && !isBlank)){
        setScoreDisplay((score)=> score + 3)
           rowOfThree.forEach(square => currentColorArrangement[square] = Blank)
           return true
   }
      }
              }
      const moveIntoIndexBelow = ()=>{
        for(let i = 0; i <= 55 - width; i++){
        const firstRow = [0,1,2,3,4,5,6,7]
        const isFirstRow = firstRow.includes(i)
        if(isFirstRow && currentColorArrangement[i] === Blank){
          const randomNumber = Math.floor(Math.random() * candyColor.length)
          currentColorArrangement[i] = candyColor[randomNumber]
        }

          if((currentColorArrangement[i+ width] ) === Blank){
            currentColorArrangement[i + width] = currentColorArrangement[i]
            currentColorArrangement[i] = Blank
          }
        }
      }
     const dragStart = (e)=>{
      
       setSquareBeingDragged(e.target)
     }  
          
    const dragDrop = (e)=>{
     setSquareBeingReplaced(e.target)
    }  
      const dragEnd = (e)=>{
     
        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')
      
        const validMoves = [
          squareBeingDraggedId - 1,
          squareBeingDraggedId - width,
          squareBeingDraggedId + 1,
          squareBeingDraggedId + width
        ]
      const validMove = validMoves.includes(squareBeingReplacedId)

const isColumnOfFour = checkForColumnOfFour()
const isRowOfFour = checkForRowOfFour()
const isColumnOfThree = checkForColumnOfThree()
const isRowOfThree = checkForRowOfThree()

if(squareBeingReplacedId && validMove && (isColumnOfFour || isColumnOfThree || isRowOfFour || isRowOfThree)){
  setSquareBeingDragged(null)
  setSquareBeingReplaced(null)
} else{
  currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.style.backgroundColor
  currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.style.backgroundColor
  setCurrentColorArrangement([...currentColorArrangement])
}


        console.log(squareBeingDraggedId, squareBeingReplacedId)
      
    }  


  
  console.log(scoreDisplay)
  const createBoard = () => {
    const randomColorArrangemrnt = [];
    for(let i = 0; i < width * width; i++){
      const randomColors = candyColor[Math.floor(Math.random() * candyColor.length)]
      randomColorArrangemrnt.push(randomColors)
    }
    setCurrentColorArrangement(randomColorArrangemrnt)
  }
  useEffect(()=>{
    createBoard()
  },[])
  useEffect(()=>{
    const timer = setInterval(()=>{
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      moveIntoIndexBelow()
       setCurrentColorArrangement([...currentColorArrangement])
    },100)
    return ()=> clearInterval(timer)
  },[checkForColumnOfFour,checkForRowOfFour,checkForRowOfThree, checkForColumnOfThree,moveIntoIndexBelow,currentColorArrangement])
 

  return (
    <div className='app' style={{backgroundImage: `url(${CandyBack})`}}>
     <div className='game'>
      {currentColorArrangement.map((candyColor, index)=>{
        return <img 
         key={index} 
         alt={candyColor}
         src={candyColor}
         data-id ={index} 
         draggable={true}
         onDragStart={dragStart}
         onDragOver={(e)=> e.preventDefault()}
         onDragEnter={(e)=> e.preventDefault()}
         onDragLeave={(e)=> e.preventDefault()}
         onDrop={dragDrop}
         onDragEnd={dragEnd}
         />
        })}
     </div>
     <ScoreBoard score={scoreDisplay} />
    </div>
  )
}

export default App
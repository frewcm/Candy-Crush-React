import React from 'react'

function ScoreBoard({score}) {
  return (
    <div className='scoreboard'>
        <h1>Score</h1>
        <p>{score}</p>
        </div>
  )
}

export default ScoreBoard
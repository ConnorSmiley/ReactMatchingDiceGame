import './App.css';
import React, { useState } from "react";
import Dice from "./components/Dice";
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"

export default function App() {
    const[dice, setDice] = React.useState(createDice)
    const[end, setEnd] = React.useState(false)

    function generateDice() {
        return {
        value : Math.ceil(Math.random()*6),
            selected : false,
            id : nanoid()
    }}

   function createDice() {
       const newArray = []
       for (let i = 0; i < 10; i++) {
           newArray.push(generateDice())
       }
       return newArray
   }

    function reRoll() {
        setDice(prev=>prev.map(x=>{
            return x.selected ? x : generateDice()
        }))
    }

    function selectedDice(id) {
        setDice(prev=>prev.map(x=> {
            return x.id === id ? {...x, selected : !x.selected} : x
        }))
    }

    React.useEffect(()=> {
        const allSelected= dice.every(x=> x.selected)
        const baseValue= dice[0].value
        const compareValue= dice.every(x => x.value===baseValue)
        if (compareValue && allSelected) {
            setEnd(true)
        }
    }, [dice])

   const createDiceValues = dice.map(x => {
       return (
           <Dice
               value={x.value}
               selected={x.selected}
               id={x.id}
               key={x.id}
               selectedDice={()=>selectedDice(x.id)}
           />
       )
   })

  return (
      <>
          <div>
              <nav>
                    <h1>Dice Game</h1>
              </nav>
              <body>
              <h1 className="d1">Select and click dice</h1>
              <p2 className="d2">Get all 10</p2>
              </body>
          <main className='die-container'>
              {createDiceValues}
          </main>
              <div className="button-align">
              <button onClick={reRoll} className='keyboard'>{end ? "You Won" : "Roll Dice"}</button>
              </div>
          </div>

          {end && <Confetti />}
      </>
  );
}

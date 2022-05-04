import { useState, useEffect } from 'react'
import './Board.css'
import Card from './Card'

export default function Board() {
    // a board has 16 cards, which are 8 pairs
    // let's use the letters A through H with different colors
    // we can save it as an array so we can shuffle it

    const cardValue = (value, color) => {
        return { value, color }
    }
    const cardBack = {
        value: "Card", color: "white"
    }
    const guessTimer = 10000;

    const [cards, setCards] = useState(fisherYates())
    const [displayed, setDisplayed] = useState(new Array(16).fill(cardBack))
    const [currGuess, setCurrGuess] = useState(-1)
    const [prevWrong, setPrevWrong] = useState(null)

    function fisherYates() {
        const deck = [
            cardValue("A", "blue"), cardValue("A", "blue"),
            cardValue("B", "red"), cardValue("B", "red"),
            cardValue("C", "green"), cardValue("C", "green"),
            cardValue("D", "orange"), cardValue("D", "orange"),
            cardValue("E", "violet"), cardValue("E", "violet"),
            cardValue("F", "brown"), cardValue("F", "brown"),
            cardValue("G", "grey"), cardValue("G", "grey"),
            cardValue("H", "cyan"), cardValue("H", "cyan")
        ]
        // shuffle cards, and then save using setCards
        // for i from 0 to n-2 (n elements, so n-1 is the last one)
        // pick j such that i <= j < n
        // exchange a[i] and a[j]
        for (let i = 0; i < deck.length-1; i++) {
            const j = Math.floor(Math.random()*(deck.length-i) + i)
            const temp = deck[i]
            deck[i] = deck[j]
            deck[j] = temp 
        }
        return deck
    }

    const guess = (idx) => {
        // to process the guess we need a state
        // the state should store the current guess
        // but can also be empty or -1 (invalid)
        if (displayed[idx].value !== cardBack.value) return

        // but first we check if there was a previous wrong, and blank them out
        if (prevWrong) {
            displayed[prevWrong[0]] = cardBack
            displayed[prevWrong[1]] = cardBack 
            setPrevWrong(null)
        }

        displayed[idx] = cards[idx]
        setDisplayed(displayed)

        if (currGuess === -1) {
            return setCurrGuess(idx)
        } else {
            setCurrGuess(-1)
        }
       
        // the cards stay up if wrong until the next guess
        if (cards[currGuess].value === cards[idx].value) {
            setPrevWrong(null)
        } else {
            setPrevWrong([currGuess, idx])
        }
    }

    return (
        <div className="Board">
            { 
                displayed.map((card, idx) => {
                    return <Card 
                            value={card.value} 
                            style={{backgroundColor:card.color}} 
                            key={idx}
                            onClick={() => guess(idx)}
                            />
                })
            }
        </div>
    )
}


import './App.css';
import Images from './Images';
import { useState } from "react";
import { shuffle } from 'lodash';
import * as React from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: "Player",
            coins: 500,
            points: 0
        };

    }

    //coins funcions
    addCoins(number) {
        this.setState({ coins: this.state.coins + number });
    }
    subtrackCoins(number) {
        this.setState({ coins: this.state.coins - number });
    }

    //point functions
    addPoints() {
        this.setState({ perk_shuffle: this.state.points + 200 });
    }

    //perks functions
    shuffle() {
        this.subtrackCoins(100);
    }
    see() {
        this.subtrackCoins(50);
    }
    autoPair() {
        this.subtrackCoins(150);
    }

    //gets
    getName() {
        return this.name;
    }
    getCoins() {
        return this.coins;
    }
    getPoints() {
        return this.points;
    }

    //render
    render() {
        return (<b>{this.state.nick}</b>)
    };
}

function App() {
    const [cards, setCards] = useState(shuffle([...Images, ...Images]));
    const [clicks, setClicks] = useState(0);
    const [won, setWon] = useState(false);
    const [activeCards, setActiveCards] = useState([]);
    const [foundPairs, setFoundPairs] = useState([]);

    function flipCard(index) {
        if (won) {
            setCards(shuffle([...Images, ...Images]));
            setFoundPairs([]);
            setWon(false);
            setClicks(0);
        }
        if (activeCards.length === 0) {
            setActiveCards([index]);
        }
        if (activeCards.length === 1) {
            const firstIndex = activeCards[0];
            const secondsIndex = index;
            if (cards[firstIndex] === cards[secondsIndex]) {
                if (foundPairs.length + 2 === cards.length) {
                    setWon(true);
                }
                setFoundPairs([...foundPairs, firstIndex, secondsIndex]);
            }
            setActiveCards([...activeCards, index]);
        }
        if (activeCards.length === 2) {
            setActiveCards([index]);
        }
        setClicks(clicks + 1);
    }
    /**useEffect(() => {
        addResponseMessage('Welcome to this awesome chat!');
    }, []);**/

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        //addResponseMessage(response);
    };
    return (
        <div>
            <h1 className="mainH1">Hello <User/> in Memory Game</h1>
            <div className="stat">
                <h1 className="pairS">{foundPairs.length / 2}<span className='pairN'> Pary</span></h1>
                <h1 className='clicksS'>{clicks}<span className='clicksN'> Próby</span></h1>
            </div>
            <div className="board">
                {cards.map((card, index) => {
                    const flippedToFront = (activeCards.indexOf(index) !== -1) || foundPairs.indexOf(index) !== -1;
                    return (
                        <div className={"card-outer " + (flippedToFront ? 'flipped' : '')}
                            onClick={() => flipCard(index)}>
                            <div className="card">
                                <div className="front">
                                    <img src={card} alt="" />
                                </div>
                                <div className="back" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='chatbox'><Widget handleNewUserMessage={handleNewUserMessage}/></div>
            {won && (
                <div className='winOverlay'>
                    <div className='win' onClick={() => {
                        setCards(shuffle([...Images, ...Images]));
                        setFoundPairs([]);
                        setWon(false);
                        setClicks(0);
                    }}>
                        <h1>Wygrałeś grę!<br />
                            <span className='small'>Kliknij tutaj, aby zacząć grę</span>
                        </h1>
                    </div>
                </div>
            )}

        </div>

    );
}

export default App;
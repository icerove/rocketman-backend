import {CardName, Card, CARDS} from './card';
import { Player } from './player';
import * as _ from 'lodash';
import * as rule from './rule';

class Game {
    currentLevel: CardName;
    player: Player[];
    turn: number;
    prevMove: Card[] | null;

    constructor() {
        this.currentLevel = '2';
        this.player = [new Player(), new Player()];
        this.turn = 1;
        this.prevMove = null;
        this.sendCards();
    }

    sendCards() {
        let cards = _.shuffle(CARDS);
        this.player[0].setCards(cards.slice(0, 22));
        this.player[1].setCards(cards.slice(22, 42));
    }

    yieldTurn(): boolean {
        if (this.prevMove == null) {
            return false;
        }
        this.prevMove = null;
        this.turn = 1 - this.turn;
        return true;
    }

    playCards(cards: Card[]) : boolean {
        if (!this.player[this.turn].hasCards(cards)) {
            return false;
        }
        if (this.prevMove == null) {
            if (rule.legalMove(cards)) {
                this.prevMove = cards;
                this.player[this.turn].move(cards);
                this.turn = 1 - this.turn;
                return true;
            }
            return false;
        }
        if (rule.biggerMove(cards, this.prevMove)) {
            this.prevMove = cards;
            this.player[this.turn].move(cards);
            this.turn = 1 - this.turn;
            return true;
        }
        
        return false;
    }

    checkWin() {

    }

    nextGame() {

    }
}
import {CardName, Card, CARDS, CARD_NAMES} from './card';
import * as _ from 'lodash';
import { isCallExpression } from '@babel/types';
import { AssertionError } from 'assert';

export function legalMove(cards: Card[]): boolean {
    switch (cards.length) {
        case 1:
            return true;
        case 2: 
            return (cards[0].name == cards[1].name);
        case 3:
            return (cards[0].name == cards[1].name && cards[0].name == cards[2].name);
        case 4:
            return cutFirstCards(cards).length != 2 && !hasJoker(cards);
        case 5:
            return (uniqueCards(cards) == 2 || isRow(cards)) && !hasJoker(cards);
        case 6:
            return (is4with2(cards) || isTwoTogether(cards) || isThreeTogether(cards)) && !hasJoker(cards);
    }
    return false;
}

function cutFirstCards(cards: Card[]): Card[] {
    return _.filter(cards, (c) => c.name != cards[0].name);
}

function hasJoker(cards: Card[]): boolean {
    return _.some(cards, (c) => c.special);
}

function uniqueCards(cards: Card[]): number {
    return  _.uniq(cards.map((c) => c.name)).length;
}

function isRow(cards: Card[]) {
    let sortedCards = _.sortBy(_.map(cards, (c) => _.indexOf(CARD_NAMES,c.name)));
    for(let i = 0; i < sortedCards.length-1; i++){
        let c = sortedCards[i+1];
        let card = sortedCards[i];
        if(c-card != 1) {
            return false;
        }
    }
    return true;
}

function isThreeTogether(cards:Card[]) {
    let sortedCards = _.sortBy(_.map(cards, (c) => _.indexOf(CARD_NAMES,c.name)));
    for(let i=0; i<sortedCards.length-3;i++){
        let c = sortedCards[i+3];
        let card = sortedCards[i];
        if(c-card != 1){
            return false;
        }
    }
    return true;
}

function isTwoTogether(cards:Card[]){
    let sortedCards = _.sortBy(_.map(cards, (c) => _.indexOf(CARD_NAMES,c.name)));
    return sortedCards[0] == sortedCards[1] && sortedCards[2] == sortedCards[3] && 
        sortedCards[4] == sortedCards[5] && sortedCards[2] - sortedCards[0] == 1 && 
        sortedCards[5] - sortedCards[3] == 1;
}

export function biggerMove(cards: Card[], prevMove: Card[], currentBig: CardName) : boolean {
    switch (prevMove.length) {
        case 1:
            return isBomb(cards) || (cards.length == 1 && isBiggerJoker(cards[0],prevMove[0],currentBig)) ||
            (cards.length == 2 && cards[0].name == prevMove[0].name && cards[0].name == cards[1].name);
        case 2:
            return !isBombJoker(prevMove) && (isBomb(cards) || (cards.length == 2 && cards[0].name == cards[1].name
                && isBigger(cards[0], prevMove[0], currentBig)));
        case 3:
            return isBomb(cards) || (cards.length == 3 && cards[0].name == cards[1].name && cards[1].name == cards[2].name 
                && isBigger(cards[0], prevMove[0], currentBig));
        case 4:
            if (isBombFour(prevMove)) {
                if (isBombJoker(cards) || isBombRow(cards)) {
                    return true;
                } else if (isBombFour(cards) && isBigger(cards[0], prevMove[0], currentBig)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return isBomb(cards) || (cards.length == 4 && uniqueCards(cards) == 2 && 
                isBigger(majorCard(cards), majorCard(prevMove), currentBig));
            }
        case 5:
            if (isBombRow(prevMove)) {
                if (isBombRow(cards) && isBigger2(cards[0], prevMove[0])) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return isBomb(cards) || (cards.length == 5 && isBigger2(sorted(cards)[0], sorted(prevMove)[0]));
            }
        case 6:
            return isBomb(cards) || 
            (is4with2(prevMove) && is4with2(cards) && isBigger(majorCard(cards), majorCard(prevMove), currentBig)) ||
            (isThreeTogether(prevMove) && isThreeTogether(cards) && isBigger2(sorted(cards)[0], sorted(prevMove)[0])) ||
            (isTwoTogether(prevMove) && isTwoTogether(cards) && isBigger2(sorted(cards)[0], sorted(prevMove)[0]));
    }
    return false
}

function isBomb(cards: Card[]): boolean {
    return isBombFour(cards) || isBombJoker(cards) || isBombRow(cards);
}

function isBombFour(cards:Card[]): boolean {
    return cards.length == 4 && uniqueCards(cards) == 1 
}

function isBombJoker(cards:Card[]):boolean {
    return cards.length == 2 && cards[0].special != null && cards[1].special != null;
}

function isBombRow(cards: Card[]): boolean {
    return cards.length == 5 && isRow(cards) && _.uniq(cards.map((c)=>c.symbol)).length == 1
}

function isBiggerJoker(card: Card, prevCard: Card, currentBig: CardName): boolean {
    if (card.special) {
        if (prevCard.special) {
            return card.special == 'Big Joker';
        } else {
            return true;
        }
    } else {
        if (prevCard.special) {
            return false;
        } else {
            return isBigger(card, prevCard, currentBig);
        }
    }
}

function isBigger(card: Card, prevCard: Card, currentBig: CardName): boolean {
    if (prevCard.name == currentBig) {
        return false;
    }
    if (card.name == currentBig) {
        return true;
    }
    return isBigger2(card, prevCard);
}

function isBigger2(card: Card, prevCard: Card): boolean {
    return _.indexOf(CARD_NAMES,card.name) > _.indexOf(CARD_NAMES, prevCard.name);
}

function is4with2(cards: Card[]): boolean {
    return (uniqueCards(cards) == 2 && cutFirstCards(cards).length % 2 == 0);
}

function majorCard(cards: Card[]): Card {
    let i = 0;
    let j = 0;
    let cardI: Card = {};
    let cardJ: Card = {};
    for (let c of cards) {
        if (c.name != cardI.name) {
            cardI = c;
            i++;
        } else {
            cardJ = c;
            j++;
        }
    }
    // if (cardI.name == undefined || cardJ.name == undefined) {
    //     throw "Not major with minor";
    // }
    return i>j ? cardI : cardJ;
}

function sorted(cards: Card[]): Card[] {
    return _.sortBy(cards, (c) => _.indexOf(CARD_NAMES,c.name));
}
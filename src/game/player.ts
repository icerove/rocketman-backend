import {Card, CardName} from './card';
import * as _ from 'lodash';

export class Player {
    cards: Card[] = [];
    level: CardName = '2';

    setCards(cards: Card[]) {
        this.cards = cards;
    }

    setLevel(level: CardName) {
        this.level = level;
    }

    hasCards(cards: Card[]) : boolean {
        let playerCards = _.clone(this.cards);
        for (let card of cards) {
            let withoutCard = playerCards.filter((c) => !_.isEqual(c, card));
            if (withoutCard.length == playerCards.length) {
                return false;
            }
            playerCards = withoutCard;
        }
        return true;
    }

    move(cards: Card[]) {
        for (let card of cards) {
            _.remove(this.cards, (c) => _.isEqual(card, c));
        }
    }
}
import * as rule from '../../src/game/rule';
import {Card} from '../../src/game/card';

describe('Correctly checking move is valid', () => {
    it("Single card is valid", () => {
        expect(rule.legalMove([{name: 'A', symbol: 'Spade'}])).toBeTruthy();
    });

    it("Double non pair is invalid", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name: 'K', symbol: 'Spade'}
        ])).toBeFalsy();
    });

    it("Double pair is big joker and small jocker", ()=>{
        expect(rule.legalMove([
            {special:'Big Joker'},
            {special:'Small Joker'}
        ])).toBeTruthy();
    });

    it("Cannot AABB", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name: 'A', symbol: 'Diamond'},
            {name: 'K', symbol: 'Club'},
            {name: 'K', symbol: 'Diamond'},
        ])).toBeFalsy();
    })

    it("3 cannot bring a joker", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'A', symbol: 'Diamond'},
            {name: 'A', symbol: 'Club'},
            {special:'Big Joker'}
        ])).toBeFalsy()
    })

    it("4 cannot bring a joker", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'A', symbol: 'Diamond'},
            {name: 'A', symbol: 'Club'},
            {name: 'A', symbol: 'Heart'},
            {special:'Big Joker'}
        ])).toBeFalsy()
    })

    it("4 can bring a non joker", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'A', symbol: 'Diamond'},
            {name: 'A', symbol: 'Club'},
            {name: 'A', symbol: 'Heart'},
            {name: 'K', symbol: 'Spade'},
        ])).toBeTruthy()
    })

    it("3 cannot bring two jokers", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'A', symbol: 'Diamond'},
            {name: 'A', symbol: 'Club'},
            {special:'Small Joker'},
            {name: 'K', symbol: 'Spade'},
        ])).toBeFalsy()
    })

    it("3 cannot bring two different", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'A', symbol: 'Diamond'},
            {name: 'A', symbol: 'Club'},
            {name: 'K', symbol: 'Spade'},
            {name: 'Q', symbol: 'Spade'}
        ])).toBeFalsy()
    })

    it("3 can bring two same", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'A', symbol: 'Diamond'},
            {name: 'A', symbol: 'Club'},
            {name: 'K', symbol: 'Spade'},
            {name: 'K', symbol: 'Club'}
        ])).toBeTruthy()
    })

    it("5 row is valid", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'Q', symbol: 'Diamond'},
            {name: '10', symbol: 'Club'},
            {name: 'J', symbol: 'Spade'},
            {name: 'K', symbol: 'Club'}
        ])).toBeTruthy()
    })

    it("5 non row is invalid", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'Q', symbol: 'Diamond'},
            {name: 'Q', symbol: 'Club'},
            {name: 'J', symbol: 'Spade'},
            {name: 'K', symbol: 'Club'}
        ])).toBeFalsy()
    })

    it("6 row is not valid", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'Q', symbol: 'Diamond'},
            {name: '10', symbol: 'Club'},
            {name: '9', symbol: 'Club'},
            {name: 'J', symbol: 'Spade'},
            {name: 'K', symbol: 'Club'}
        ])).toBeFalsy()
    })

    it("XXXXYY is valid", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'A', symbol: 'Diamond'},
            {name: 'A', symbol: 'Club'},
            {name: 'A', symbol: 'Heart'},
            {name: 'J', symbol: 'Spade'},
            {name: 'J', symbol: 'Club'}
        ])).toBeTruthy()
    })

    it("333444 is valid", () => {
        expect(rule.legalMove([
            {name: '3', symbol: 'Spade'},
            {name:'3', symbol: 'Diamond'},
            {name: '3', symbol: 'Club'},
            {name: '4', symbol: 'Heart'},
            {name: '4', symbol: 'Spade'},
            {name: '4', symbol: 'Club'}
        ])).toBeTruthy()
    })

    it("333555 is invalid", () => {
        expect(rule.legalMove([
            {name: '3', symbol: 'Spade'},
            {name:'3', symbol: 'Diamond'},
            {name: '3', symbol: 'Club'},
            {name: '5', symbol: 'Heart'},
            {name: '5', symbol: 'Spade'},
            {name: '5', symbol: 'Club'}
        ])).toBeFalsy()
    })

    it("334455 is valid", () => {
        expect(rule.legalMove([
            {name: '3', symbol: 'Spade'},
            {name:'3', symbol: 'Diamond'},
            {name: '5', symbol: 'Club'},
            {name: '4', symbol: 'Heart'},
            {name: '5', symbol: 'Spade'},
            {name: '4', symbol: 'Club'}
        ])).toBeTruthy()
    })

    it("334466 is invalid", () => {
        expect(rule.legalMove([
            {name: '3', symbol: 'Spade'},
            {name:'3', symbol: 'Diamond'},
            {name: '6', symbol: 'Club'},
            {name: '4', symbol: 'Heart'},
            {name: '6', symbol: 'Spade'},
            {name: '4', symbol: 'Club'}
        ])).toBeFalsy()
    })

    it("XXXX Joker Joker is invalid", () => {
        expect(rule.legalMove([
            {name: 'A', symbol: 'Spade'},
            {name:'A', symbol: 'Diamond'},
            {name: 'A', symbol: 'Club'},
            {name: 'A', symbol: 'Heart'},
            {special: 'Big Joker'},
            {special: 'Small Joker'}
        ])).toBeFalsy()
    })

    it("2233 Joker Joker is invalid", () => {
        expect(rule.legalMove([
            {name: '3', symbol: 'Spade'},
            {name:'3', symbol: 'Diamond'},
            {name: '2', symbol: 'Club'},
            {name: '2', symbol: 'Heart'},
            {special: 'Big Joker'},
            {special: 'Small Joker'}
        ])).toBeFalsy()
    })
});

describe('Correctly checking is bigger', () => {
    it('single card is bigger', () => {
        expect(rule.biggerMove([
            {name: '3', symbol: 'Spade'}
        ], [
            {name: '2', symbol: 'Spade'}
        ], '4')).toBeTruthy();
    })
});
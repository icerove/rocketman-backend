export type CardName = 'A' | 'K' | 'Q' | 'J' | '10'| '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
export type SymbolName = 'Diamond' | 'Spade' | 'Heart' | 'Club'
export type Card = {
    name?: CardName,
    symbol?: SymbolName,
    special?: 'Big Joker' | 'Small Joker'
}

export const CARD_NAMES: CardName[] =  ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
export const SYMBOL_NAMES: SymbolName[] = ['Diamond', 'Spade', 'Heart', 'Club'];
function cards(): Card[] {
    let result: Card[] = [];
    for (let name of CARD_NAMES) {
        for (let symbol of SYMBOL_NAMES) {
            result.push({name, symbol});
        }
    }
    result.push({special: 'Big Joker'});
    result.push({special: 'Small Joker'});
    return result;
}

export const CARDS = cards();

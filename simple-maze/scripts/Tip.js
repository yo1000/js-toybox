class Tip {
    static get UNIT_SIZE() {
        return 32;
    }
    
    static get TYPES() {
        return {
            BASE: {
                name: 'BASE',
                style: 'tip',
                passable: true,
                breakable: false
            },
            FLOOR: {
                name: 'FLOOR',
                style: 'floor',
                passable: true,
                breakable: false
            },
            STEEL: {
                name: 'STEEL',
                style: 'steel',
                passable: false,
                breakable: false
            },
            ROCK: {
                name: 'ROCK',
                style: 'rock',
                passable: false,
                breakable: true
            }
        }
    }
    
    constructor(type) {
        this.element = document.createElement('div')
        this.element.classList.add(Tip.TYPES.BASE.style)
        
        if (type) {
            this.element.classList.add(type.style)
            this.passable = type.passable
            this.breakable = type.breakable
        }
    }
    
    copy() {
        const tip = new Tip()
        tip.element.classList = this.element.classList
        tip.passable = this.passable
        tip.breakable = this.breakable
        
        return tip
    }
}

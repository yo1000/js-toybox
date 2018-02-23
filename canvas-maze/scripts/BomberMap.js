/**
 * require Tip.js
 * 
 */
class BomberMap {
    constructor(canvas, width, height) {
        this.canvas = canvas
        this.width = width + (width + 1) % 2
        this.height = height + (height + 1) % 2
    }



    build() {
        const ctx = this.canvas.getContext('2d')


        const containerElement = document.createElement('div')
        containerElement.classList.add('maze-container')
        containerElement.style.width = (this.width * Tip.UNIT_SIZE) + 'px'
        containerElement.style.height = (this.height * Tip.UNIT_SIZE) + 'px'
        
        for (let y = 0; y < this.height; y++) {
            const row = document.createElement('div')
            row.classList.add('row')
            containerElement.appendChild(row)
            
            for (let x = 0; x < this.width; x++) {
                let tip
                
                if (y == 0 || y + 1 == this.height ||
                    x == 0 || x + 1 == this.width ||
                    y % 2 === 0 && x % 2 === 0) {
                    tip = new Tip(Tip.TYPES.STEEL)
                } else if (y >= 1 && y <= 2 && x >= 1 && x <= 2 ||
                    y >= 1 && y <= 2 && x + 1 >= this.width - 2 && x + 1 <= this.width - 1 ||
                    y + 1 >= this.height - 2 && y + 1 <= this.height - 1 && x >= 1 && x <= 2 ||
                    y + 1 >= this.height - 2 && y + 1 <= this.height - 1 && x + 1 >= this.width - 2 && x + 1 <= this.width - 1) {
                    tip = new Tip(Tip.TYPES.FLOOR)
                } else if (Math.random() >= 0.5) {
                    tip = new Tip(Tip.TYPES.ROCK)
                } else {
                    tip = new Tip(Tip.TYPES.FLOOR)
                }
                
                row.appendChild(tip.element)
            }
        }
        
        return containerElement
    }
}

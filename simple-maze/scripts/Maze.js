/**
 * require Tip.js
 * 
 */
class Maze {
    constructor(width, height) {
        this.width = width + (width + 1) % 2
        this.height = height + (height + 1) % 2
        
        this.tips = new Array(this.height)
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i] = new Array(this.width)
        }
    }
    
    build() {
        const containerElement = document.createElement('div')
        containerElement.classList.add('maze-container')
        containerElement.style.width = (this.width * Tip.UNIT_SIZE) + 'px'
        containerElement.style.height = (this.height * Tip.UNIT_SIZE) + 'px'
        
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (y == 0 || y + 1 == this.height ||
                    x == 0 || x + 1 == this.width) {
                    this.tips[y][x] = Tip.TYPES.STEEL
                } else if (y % 2 === 0 && x % 2 === 0) {
                    this.tips[y][x] = Tip.TYPES.STEEL
                    let nx = x
                    let ny = y
                    while (this.tips[ny][nx] && this.tips[ny][nx].name !== Tip.TYPES.FLOOR.name) {
                        nx = x
                        ny = y
                        switch (Math.floor(Math.random() * 4)) {
                        case 0:
                            nx -= 1
                            break;
                        case 1:
                            nx += 1
                            break;
                        case 2:
                            ny -= 1
                            break;
                        case 3:
                            ny += 1
                            break;
                        }
                    }
                    this.tips[ny][nx] = Tip.TYPES.STEEL
                } else {
                    if (!this.tips[y][x]) {
                        this.tips[y][x] = Tip.TYPES.FLOOR
                    }
                }
            }
        }
        
        for (let y = 0; y < this.tips.length; y++) {
            const row = document.createElement('div')
            row.classList.add('row')
            containerElement.appendChild(row)
            
            for (let x = 0; x < this.tips[y].length; x++) {
                row.appendChild(new Tip(this.tips[y][x]).element)
            }
        }
        
        return containerElement
    }
}

/**
 * require Tip.js
 * 
 */
class MazeBuilder {
    constructor(width, height) {
        this.width = width + (width + 1) % 2
        this.height = height + (height + 1) % 2
    }
    
    build() {
        const containerElement = document.createElement('div')
        containerElement.classList.add('maze-container')
        containerElement.style.width = (this.width * Tip.UNIT_SIZE) + 'px'
        containerElement.style.height = (this.height * Tip.UNIT_SIZE) + 'px'
        
        const mazeTips = new Array(this.height)
        for (let i = 0; i < mazeTips.length; i++) {
            mazeTips[i] = new Array(this.width)
        }
        
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                
                if (y == 0 || y + 1 == this.height ||
                    x == 0 || x + 1 == this.width) {
                    mazeTips[y][x] = Tip.TYPES.STEEL
                } else if (y % 2 === 0 && x % 2 === 0) {
                    mazeTips[y][x] = Tip.TYPES.STEEL
                    switch (Math.floor(Math.random() * 4)) {
                    case 0:
                        mazeTips[y][x + 1] = Tip.TYPES.STEEL
                        break;
                    case 1:
                        mazeTips[y][x - 1] = Tip.TYPES.STEEL
                        break;
                    case 2:
                        mazeTips[y + 1][x] = Tip.TYPES.STEEL
                        break;
                    case 3:
                        mazeTips[y - 1][x] = Tip.TYPES.STEEL
                        break;
                    }
                } else {
                    if (!mazeTips[y][x]) {
                        mazeTips[y][x] = Tip.TYPES.FLOOR
                    }
                }
            }
        }
            
        for (let y = 0; y < mazeTips.length; y++) {
            const row = document.createElement('div')
            row.classList.add('row')
            containerElement.appendChild(row)
            
            for (let x = 0; x < mazeTips[y].length; x++) {
                row.appendChild(new Tip(mazeTips[y][x]).element)
            }
        }
        
        return containerElement
    }
}

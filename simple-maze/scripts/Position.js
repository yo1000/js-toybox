class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    
    add(x, y) {
        this.x += x
        this.y += y
    }
    
    toStyle() {
        return {
            left: (this.x * 32 + 16) + 'px',
            top: (this.y * 32 + 16) + 'px'
        }
    }
}

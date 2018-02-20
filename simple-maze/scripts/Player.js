class Player {
    constructor(x, y) {
        this.position = new Position(x, y)
        this.element = document.createElement('div')
        this.element.classList.add('player')
        this.element.classList.add('player-active')
        this.reflesh()
    }
    
    copy() {
        const tracedPlayer = new Player(this.position.x, this.position.y)
        tracedPlayer.element.classList.remove('player-active')
        return tracedPlayer
    }
    
    add(x, y) {
        this.position.x += x
        this.position.y += y
        this.reflesh()
    }
    
    reflesh() {
        const style = this.position.toStyle()
        this.element.style.left = style.left
        this.element.style.top = style.top
    }
    
    moveLeft() {
        this.add(-1, 0)
    }
    
    moveRight() {
        this.add(1, 0)
    }
    
    moveUp() {
        this.add(0, -1)
    }
    
    moveDown() {
        this.add(0, 1)
    }
    
    getLeftPosition() {
        return new Position(this.position.x - 1, this.position.y)
    }
    
    getRightPosition() {
        return new Position(this.position.x + 1, this.position.y)
    }
    
    getUpPosition() {
        return new Position(this.position.x, this.position.y - 1)
    }
    
    getDownPosition() {
        return new Position(this.position.x, this.position.y + 1)
    }
}

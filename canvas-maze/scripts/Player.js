class Player {
    constructor(context2d, x, y) {
        this.tipDrawer = new Tip(context2d)

        this.position = new Position(x, y)
        this.drawBall()
    }
    
    add(x, y) {
        this.position.x += x
        this.position.y += y
    }

    drawBall() {
        this.tipDrawer.drawBall(this.position.x, this.position.y)
    }

    drawFootprints() {
        this.tipDrawer.drawFootprints(this.position.x, this.position.y)
    }
    
    moveLeft() {
        this.drawFootprints()
        this.add(-1, 0)
        this.drawBall()
    }
    
    moveRight() {
        this.drawFootprints()
        this.add(1, 0)
        this.drawBall()
    }
    
    moveUp() {
        this.drawFootprints()
        this.add(0, -1)
        this.drawBall()
    }
    
    moveDown() {
        this.drawFootprints()
        this.add(0, 1)
        this.drawBall()
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

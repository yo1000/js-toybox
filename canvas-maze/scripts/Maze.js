/**
 * require Tip.js
 * 
 */
class Maze {
    static get TYPES() {
        return {
            NONE: {
                code: 0,
                passable: false
            },
            FLOOR: {
                code: 1,
                passable: true
            },
            BLOCK: {
                code: 2,
                passable: false
            }
        }
    }

    constructor(context2d, width, height) {
        this.tipDrawer = new Tip(context2d)

        this.width = width + (width + 1) % 2
        this.height = height + (height + 1) % 2
        
        this.tips = new Array(this.height)
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i] = new Array(this.width)
        }
    }
    
    passable(position) {
        if (!this.tips[position.y]) return false
        if (!this.tips[position.y][position.x]) return false
        return this.tips[position.y][position.x].passable
    }

    checkEmptyTip(x, y) {
        return !this.tips[y][x] || this.tips[y][x].passable
    }

    checkClosedInTipForLeft(x, y) {
        return this.tips[y - 1][x] && !this.tips[y - 1][x].passable &&
            this.tips[y][x + 1] && !this.tips[y][x + 1].passable &&
            this.tips[y][x - 1] && !this.tips[y][x - 1].passable
    }

    checkClosedInTipForTop(x, y) {
        return this.tips[y + 1][x] && !this.tips[y + 1][x].passable &&
            this.tips[y - 1][x] && !this.tips[y - 1][x].passable &&
            this.tips[y][x - 1] && !this.tips[y][x - 1].passable
    }

    generate() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (y === 0 || y + 1 === this.height ||
                    x === 0 || x + 1 === this.width) {
                    this.tips[y][x] = Maze.TYPES.BLOCK
                } else if (y % 2 === 0 && x % 2 === 0) {
                    this.tips[y][x] = Maze.TYPES.BLOCK
                    let nx = x
                    let ny = y
                    while (!this.checkEmptyTip(nx, ny)) {
                        nx = x
                        ny = y
                        switch (Math.floor(Math.random() * 4)) {
                            case 0:
                                if (this.checkClosedInTipForLeft(nx - 1, ny - 1)) {
                                    continue
                                }
                                nx -= 1
                                break;
                            case 1:
                                nx += 1
                                break;
                            case 2:
                                if (this.checkClosedInTipForTop(nx - 1, ny - 1)) {
                                    continue
                                }
                                ny -= 1
                                break;
                            case 3:
                                ny += 1
                                break;
                        }
                    }
                    this.tips[ny][nx] = Maze.TYPES.BLOCK
                } else {
                    if (!this.tips[y][x]) {
                        this.tips[y][x] = Maze.TYPES.FLOOR
                    }
                }
            }
        }
    }

    draw() {
        for (let y = 0; y < this.tips.length; y++) {
            for (let x = 0; x < this.tips[y].length; x++) {
                switch (this.tips[y][x].code) {
                    case Maze.TYPES.FLOOR.code:
                        this.tipDrawer.drawFloor(x, y)
                        break
                    case Maze.TYPES.BLOCK.code:
                        this.tipDrawer.drawBlock(x, y)
                        break
                }
            }
        }
    }

    generateAndDraw() {
        this.generate()
        this.draw()
    }
}

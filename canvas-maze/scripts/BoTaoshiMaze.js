class BoTaoshiMaze extends Maze {
    constructor(context2d, width, height) {
        super(context2d, width, height)
    }

    generate() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (y === 0 || y + 1 === this.height ||
                    x === 0 || x + 1 === this.width) {
                    this.tips[y][x] = Maze.TYPES.BLOCK
                } else if (y % 2 === 0 && x % 2 === 0) {
                    this.tips[y][x] = Maze.TYPES.BLOCK
                    const dir = (y === 2 || x === 2) ? 4 : 2
                    switch (Math.floor(Math.random() * dir)) {
                        case 0:
                            this.tips[y + 1][x] = Maze.TYPES.BLOCK
                            break;
                        case 1:
                            this.tips[y][x + 1] = Maze.TYPES.BLOCK
                            break;
                        case 2:
                            this.tips[y - 1][x] = Maze.TYPES.BLOCK
                            break;
                        case 3:
                            this.tips[y][x - 1] = Maze.TYPES.BLOCK
                            break;
                    }
                } else if (!this.tips[y][x]) {
                    this.tips[y][x] = Maze.TYPES.FLOOR
                }
            }
        }
    }
}
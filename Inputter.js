class Inputter {
    static get KEY_MAP() {
        return {
            LEFT: 'ArrowLeft',
            RIGHT: 'ArrowRight',
            UP: 'ArrowUp',
            DOWN: 'ArrowDown',
            DASH: 'z',
            JUMP: 'x'
        }
    }

    constructor(frameRatio, inputtables) {
        this.frameRatio = frameRatio
        this.inputtables = inputtables
        this.keyState = {
            left: false,
            right: false,
            up: false,
            down: false,
            dash: false,
            jump: false
        }
        
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
            case Inputter.KEY_MAP.JUMP:
                this.keyState.jump = true
                break
            case Inputter.KEY_MAP.DASH:
                this.keyState.dash = true
                break
            case Inputter.KEY_MAP.LEFT:
                this.keyState.left = true
                this.keyState.right = false
                break
            case Inputter.KEY_MAP.RIGHT:
                this.keyState.right = true
                this.keyState.left = false
                break
            case Inputter.KEY_MAP.UP:
                this.keyState.up = true
                this.keyState.down = false
                break
            case Inputter.KEY_MAP.DOWN:
                this.keyState.down = true
                this.keyState.up = false
                break
            }
        })
        
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
            case Inputter.KEY_MAP.JUMP:
                this.keyState.jump = false
                break
            case Inputter.KEY_MAP.DASH:
                this.keyState.dash = false
                break
            case Inputter.KEY_MAP.LEFT:
                this.keyState.left = false
                break
            case Inputter.KEY_MAP.RIGHT:
                this.keyState.right = false
                break
            case Inputter.KEY_MAP.UP:
                this.keyState.up = false
                break
            case Inputter.KEY_MAP.DOWN:
                this.keyState.down = false
                break
            }
        })
    }
    
    input() {
        setInterval(() => {
            for (let i = 0; i < this.inputtables.length; i++) {
                this.inputtables[i].input(this.keyState)
            }
        }, this.frameRatio)
    }
}

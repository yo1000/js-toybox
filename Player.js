class Player {
    static get JUMP_SPEED() { return 0.5 }
    static get JUMP() {
        return {
            RADIAN_UNIT: 0.1,
            RADIAN_MIN: 0.0,
            RADIAN_MAX: 1.9
        }
    }
    static get GO() {
        return {
            WAITING: -1,
            STEP: 2
        }
    }
    static get DASH() {
        return {
            ON: 2.0,
            OFF: 1.0
        }
    }
    static get TURN() {
        return {
            RIGHT: 0,
            LEFT: 1
        }
    }
    static get STYLE_NAMES() {
        return {
            WAIT: 'player-wait',
            GO: [
                'player-go1',
                'player-go1',
                'player-go2',
                'player-go2'
            ],
            GO1: 'player-go1',
            GO2: 'player-go2',
            JUMP: 'player-jump',
            TURN: 'player-turn',
            CROUCH: 'player-crouch'
        }
    }
    
    /**
     * @param {object} target - DOM Element
     */
    constructor(target) {
        this.target = target
        this.position = {
            x: 16 * 2,
            y: 16 * 5
        }
        this.jump = {
            y: 0,
            point: Player.JUMP.RADIAN_MIN,
            height: -9.6
        }
        this.go = Player.GO.WAITING
        this.turn = Player.TURN.RIGHT
        this.dash = false
        this.crouch = false
        this.target.style.display = 'block'
    }
    
    /**
     * スタイルのジャンプ状態を切り替える
     * @param {boolean} on - ジャンプが有効かどうか
     */
    updateStyleToJump(on) {
        if (on) {
            this.target.classList.add(Player.STYLE_NAMES.JUMP)
        } else {
            this.target.classList.remove(Player.STYLE_NAMES.JUMP)
        }
    }
    
    /**
     * スタイルの反転状態を切り替える
     * @param {boolean} on - 反転が有効かどうか
     */
    updateStyleToTurn(on) {
        if (on) {
            this.target.classList.add(Player.STYLE_NAMES.TURN)
        } else {
            this.target.classList.remove(Player.STYLE_NAMES.TURN)
        }
    }
    
    /**
     * スタイルのしゃがみ状態を切り替える
     * @param {boolean} on - しゃがみが有効かどうか
     */
    updateStyleToCrouch(on) {
        if (on) {
            this.target.classList.add(Player.STYLE_NAMES.CROUCH)
        } else {
            this.target.classList.remove(Player.STYLE_NAMES.CROUCH)
        }
    }
    
    /**
     * スタイルの移動状態をクリアする
     */
    updateStyleClearToGo() {
        for (var i = 0; i < Player.STYLE_NAMES.GO.length; i++) {
            this.target.classList.remove(Player.STYLE_NAMES.GO[i])
        }
    }
    
    /**
     * スタイルの移動状態を切り替える
     * @param {number} frame - フレーム数
     */
    updateStyleToGo(frame) {
        if (frame === Player.GO.WAITING) {
            this.updateStyleClearToGo()
            this.target.classList.add(Player.STYLE_NAMES.WAIT)
        } else {
            this.updateStyleClearToGo()
            this.target.classList.add(Player.STYLE_NAMES.GO[frame])
        }
    }
    
    doJump() {
        if (this.jump.point === 0.0) {
            this.jump.point = Player.JUMP_SPEED
        }
    }
    
    doJumping() {
        if (this.jump.point === 0.0) {
            return
        }
        
        const jump = Math.sin(Math.PI * this.jump.point) * this.jump.height
        this.jump.point += Player.JUMP.RADIAN_UNIT
        if (this.jump.point > Player.JUMP.RADIAN_MAX) {
            this.jump.point = Player.JUMP.RADIAN_MIN
        }

        this.pos(this.position.x, this.position.y + jump)
    }
    
    doGoToLeft() {
        this.go = (this.go + (this.dash ? 2 : 1)) % Player.STYLE_NAMES.GO.length
        this.turn = Player.TURN.LEFT
        this.pos(this.position.x - Player.GO.STEP * (this.dash ? Player.DASH.ON : Player.DASH.OFF), this.position.y)
    }
    
    doGoToRight() {
        this.go = (this.go + (this.dash ? 2 : 1)) % Player.STYLE_NAMES.GO.length
        this.turn = Player.TURN.RIGHT
        this.pos(this.position.x + Player.GO.STEP * (this.dash ? Player.DASH.ON : Player.DASH.OFF), this.position.y)
    }
    
    pos(newX, newY) {
        const xDir = (newX === this.position.x)
                ? false : (newX < this.position.x)
                ? 'L'
                : 'R'
        
        // 左右いずれかの横移動が発生している場合
        if (xDir) {
            const xTop = (xDir === 'L')
                ? document.elementFromPoint((newX + 1) * 4, (newY + 1) * 4)
                : document.elementFromPoint((newX - 1 + 16) * 4, (newY + 1) * 4)
            const xBottom = (xDir === 'L')
                ? document.elementFromPoint((newX + 1) * 4, (newY - 1 + 16) * 4)
                : document.elementFromPoint((newX - 1 + 16) * 4, (newY - 1 + 16) * 4)
            
            if (!xTop.hasAttribute(MapTip.TYPES.BLOCK) &&
                !xBottom.hasAttribute(MapTip.TYPES.BLOCK)) {
                this.position.x = newX
            } else {
                this.dash = false
                const rect = xBottom.getBoundingClientRect()
                
                switch (xDir) {
                    case 'L':
                        this.position.x = rect.right / 4
                        break;
                    case 'R':
                        this.position.x = rect.left / 4 - 16
                        break;
                }
            }
        }

        const yDir = (newY === this.position.y)
                ? false : (newY < this.position.y)
                ? 'U'
                : 'D'

        // 上下いずれかの縦移動が発生している場合
        if (yDir) {
            const yLeft = (yDir === 'U')
                ? document.elementFromPoint((newX + 1) * 4, (newY + 1) * 4)
                : document.elementFromPoint((newX + 1) * 4, (newY - 1 + 16) * 4)
            const yRight = (yDir === 'U')
                ? document.elementFromPoint((newX - 1 + 16) * 4, (newY + 1) * 4)
                : document.elementFromPoint((newX - 1 + 16) * 4, (newY - 1 + 16) * 4)
            
            if (!yLeft.hasAttribute(MapTip.TYPES.BLOCK) &&
                    !yRight.hasAttribute(MapTip.TYPES.BLOCK)) {
                this.position.y = newY
            } else if (yDir === 'U') {
                const rect = yLeft.getBoundingClientRect()
                this.position.y = rect.bottom / 4
                this.jump.point = Player.JUMP.RADIAN_MIN
            } else if (yDir === 'D') {
                const rect = yLeft.getBoundingClientRect()
                this.position.y = rect.top / 4 - 16
                this.jump.point = Player.JUMP.RADIAN_MIN
            }
        }
        
        // ジャンプから放物線の着地範囲を超えて継続落下する場合
        // 床が抜けて落下する場合
        if (!yDir && this.jump.point === 0.0) {
            const xTop = document.elementFromPoint(
                xDir === 'L' ? (newX) * 4 : (newX + 16) * 4,
                (newY + 16 - 1) * 4)
            
            if (xTop.hasAttribute(MapTip.TYPES.BLOCK)) {
                this.dash = false
            }
            
            const yLeftBottom = document.elementFromPoint((newX + (this.dash ? 0 : 1)) * 4, (newY + 16) * 4)
            const yRightBottom = document.elementFromPoint((newX + 16 - (this.dash ? 0 : 1)) * 4, (newY + 16) * 4)
            
            if (!yLeftBottom.hasAttribute(MapTip.TYPES.BLOCK) &&
                !yRightBottom.hasAttribute(MapTip.TYPES.BLOCK)) {
                this.jump.point = 1.425 // RADIAN_MAX * (3/4)
            }
        }
    }
    
    input(keyState) {
        if (keyState.jump) {
            this.doJump()
        }
        this.doJumping()
        
        this.dash = keyState.dash
        
        if (keyState.left) {
            this.doGoToLeft()
        }
        if (keyState.right) {
            this.doGoToRight()
        }
        if (!keyState.left && !keyState.right) {
            this.go = Player.GO.WAITING
        }
        
        if (keyState.up) {
            // ..
        }
        
        this.crouch = keyState.down
        
        this.pos(this.position.x, this.position.y)
    }
    
    render() {
        this.updateStyleToTurn(this.turn === Player.TURN.LEFT)
        this.updateStyleToGo(this.go)
        this.updateStyleToJump(
            this.jump.point - Player.JUMP.RADIAN_UNIT > Player.JUMP.RADIAN_MIN &&
            this.jump.point <= Player.JUMP.RADIAN_MAX)
        this.updateStyleToCrouch(this.crouch)
        
        this.target.style.left = this.position.x + 'px'
        this.target.style.top = this.position.y + 'px'
    }
}

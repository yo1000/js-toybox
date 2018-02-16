class Renderer {
    constructor(frameRatio, renderables) {
        this.frameRatio = frameRatio
        this.renderables = renderables
    }
    
    render() {
        setInterval(() => {
            for (let i = 0; i < this.renderables.length; i++) {
                this.renderables[i].render()
            }
        }, this.frameRatio)
    }
}

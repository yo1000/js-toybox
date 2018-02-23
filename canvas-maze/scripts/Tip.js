class Tip {
    /**
     *
     * @param context2d
     * @param rectWidth
     * @param lineWidth
     */
    constructor(context2d, rectWidth, lineWidth) {
        this.context2d = context2d
        this.rectWidth = rectWidth | 32
        this.lineWidth = lineWidth | 5
    }

    drawRect(x, y) {
        const rect = {
            x: x * this.rectWidth,
            y: y * this.rectWidth,
            w: this.rectWidth,
            h: this.rectWidth
        }
        this.context2d.fillRect(rect.x, rect.y, rect.w, rect.h)

        const line = {
            x: x * this.rectWidth + this.lineWidth / 2,
            y: y * this.rectWidth + this.lineWidth / 2,
            w: this.rectWidth - this.lineWidth,
            h: this.rectWidth - this.lineWidth
        }
        this.context2d.lineWidth = this.lineWidth
        this.context2d.strokeRect(line.x, line.y, line.w, line.h)
    }

    drawBlock(x, y) {
        const rect = {
            x0: x * this.rectWidth,
            y0: y * this.rectWidth,
            x1: x * this.rectWidth,
            y1: (y + 1) * this.rectWidth
        }
        const rectGrad = this.context2d.createLinearGradient(
            rect.x0, rect.y0, rect.x1, rect.y1)
        rectGrad.addColorStop(0, '#999')
        rectGrad.addColorStop(1, '#777')
        this.context2d.fillStyle = rectGrad

        const line = {
            x0: x * this.rectWidth,
            y0: y * this.rectWidth,
            x1: (x + 1) * this.rectWidth,
            y1: (y + 1) * this.rectWidth
        }
        const lineGrad = this.context2d.createLinearGradient(
            line.x0, line.y0, line.x1, line.y1)
        lineGrad.addColorStop(0, '#999')
        lineGrad.addColorStop(0.5, '#999')
        lineGrad.addColorStop(0.5, '#777')
        lineGrad.addColorStop(1, '#777')
        this.context2d.strokeStyle = lineGrad

        this.drawRect(x, y)
    }

    drawFloor(x, y) {
        this.context2d.strokeStyle = '#ccc'
        this.context2d.fillStyle = '#ccc'

        this.drawRect(x, y)
    }

    drawBall(x, y) {
        const rad = {
            x0: x * this.rectWidth + this.rectWidth / 2,
            y0: y * this.rectWidth + this.rectWidth / 2,
            r0: this.rectWidth / 4,
            x1: x * this.rectWidth + this.rectWidth / 2 - 5,
            y1: y * this.rectWidth + this.rectWidth / 2 - 5,
            r1: 0
        }
        const radGrad = this.context2d.createRadialGradient(
            rad.x0, rad.y0, rad.r0, rad.x1, rad.y1, rad.r1)
        radGrad.addColorStop(0, '#333')
        radGrad.addColorStop(0.5, '#444')
        radGrad.addColorStop(1, '#999')
        this.context2d.fillStyle = radGrad
        this.context2d.beginPath()
        this.context2d.arc(rad.x0, rad.y0, rad.r0, 0, Math.PI * 2, false)
        this.context2d.fill()
    }

    drawFootprints(x, y) {
        const rad = {
            x: x * this.rectWidth + this.rectWidth / 2,
            y: y * this.rectWidth + this.rectWidth / 2,
            r: this.rectWidth / 4,
        }
        this.context2d.fillStyle = '#999'
        this.context2d.beginPath()
        this.context2d.arc(rad.x, rad.y, rad.r, 0, Math.PI * 2, false)
        this.context2d.fill()
    }
}

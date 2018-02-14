class MapTip {
    static get STYLES() {
        return {
            BASE     : 'map',
            FLOOR    : 'map-floor',
            MT_LEFT  : 'map-mt-left',
            MT_TOP   : 'map-mt-top',
            MT_RIGHT : 'map-mt-right',
            MT_BOTTOM: 'map-mt-bottom',
            SKY      : 'map-sky'
        }
    }
    
    static get TYPES() {
        return {
            NONE: 'data-map-none',
            BLOCK: 'data-map-block'
        }
    }

    constructor(code, style, type) {
        this.code = code
        this.style = style
        this.type = type
        this.target = document.createElement('div')
        this.target.classList.add(MapTip.STYLES.BASE)
        this.target.classList.add(style)
        this.target.setAttribute(type, 1)
    }
    
    copy() {
        return new MapTip(this.code, this.style, this.type)
    }
}

class Map {
    static get TIPS() {
        return {
            FLOOR    : new MapTip('X', MapTip.STYLES.FLOOR,     MapTip.TYPES.BLOCK),
            MT_LEFT  : new MapTip('J', MapTip.STYLES.MT_LEFT,   MapTip.TYPES.NONE),
            MT_TOP   : new MapTip('A', MapTip.STYLES.MT_TOP,    MapTip.TYPES.NONE),
            MT_RIGHT : new MapTip('L', MapTip.STYLES.MT_RIGHT,  MapTip.TYPES.NONE),
            MT_BOTTOM: new MapTip('M', MapTip.STYLES.MT_BOTTOM, MapTip.TYPES.NONE),
            SKY      : new MapTip('_', MapTip.STYLES.SKY,       MapTip.TYPES.NONE)
        }
    }
    
    constructor(target, data) {
        this.target = target
        this.codes = data.trim().split("\n")
        for (let i = 0; i < this.codes.length; i++) {
            this.codes[i] = this.codes[i].trim()
        }
        
        for (let i = 0, line = this.codes[i]; i < this.codes.length; i++) {
            line = this.codes[i]
            for (let j = 0; j < line.length; j++) {
                const code = line.charAt(j)
                switch (code) {
                    case Map.TIPS.FLOOR.code:
                        let floor = Map.TIPS.FLOOR.copy().target
                        floor.style.left = (j * 16) + 'px'
                        floor.style.top = (i * 16) + 'px'
                        this.target.appendChild(floor)
                        break;
                    case Map.TIPS.MT_LEFT.code:
                        let mtLeft = Map.TIPS.MT_LEFT.copy().target
                        mtLeft.style.left = (j * 16) + 'px'
                        mtLeft.style.top = (i * 16) + 'px'
                        this.target.appendChild(mtLeft)
                        break;
                    case Map.TIPS.MT_TOP.code:
                        let mtTop = Map.TIPS.MT_TOP.copy().target
                        mtTop.style.left = (j * 16) + 'px'
                        mtTop.style.top = (i * 16) + 'px'
                        this.target.appendChild(mtTop)
                        break;
                    case Map.TIPS.MT_RIGHT.code:
                        let mtRight = Map.TIPS.MT_RIGHT.copy().target
                        mtRight.style.left = (j * 16) + 'px'
                        mtRight.style.top = (i * 16) + 'px'
                        this.target.appendChild(mtRight)
                        break;
                    case Map.TIPS.MT_BOTTOM.code:
                        let mtBottom = Map.TIPS.MT_BOTTOM.copy().target
                        mtBottom.style.left = (j * 16) + 'px'
                        mtBottom.style.top = (i * 16) + 'px'
                        this.target.appendChild(mtBottom)
                        break;
                    case Map.TIPS.SKY.code:
                        let sky = Map.TIPS.SKY.copy().target
                        sky.style.left = (j * 16) + 'px'
                        sky.style.top = (i * 16) + 'px'
                        this.target.appendChild(sky)
                        break;
                }
            }
        }
        
        target.style.display = 'block'
    }
    
    render() {
        // ..            
    }
}

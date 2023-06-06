import { makeAutoObservable } from "mobx";

export class Ship {
    // id = null
    y = null
    x = null
    // size = null
    // direction = null
    killed = false
    placed = false
    moving = false
    // left = null
    // top = null
    // startLeft = null
    // startTop = null

    constructor (id, size, direction, startLef, startTop) {
        this.id = id
        this.size = size
        this.direction = direction
        this.left = startLef
        this.top = startTop
        this.startLeft = startLef
        this.startTop = startTop
        makeAutoObservable(this)
    }

    setPosition(left, top) {
        this.left = left
        this.top = top
    }
}
import { makeAutoObservable } from "mobx";

export class Ship {
    y = null
    x = null
    killed = false
    placed = false
    moving = false

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
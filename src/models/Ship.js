import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from 'uuid';

export class Ship {
    y = null
    x = null
    placed = false
    moving = false
    animation = false

    constructor (size, direction, startLef, startTop) {
        this.id = uuidv4()
        this.size = size
        this.direction = direction
        this.left = startLef
        this.top = startTop
        this.startLeft = startLef
        this.startTop = startTop
        makeAutoObservable(this)
    }

    setCoordinates(y, x) {
        this.y = y
        this.x = x
    } 

    setMoving(boolean) {
        this.moving = boolean 
    }

    setPlaced(boolean) {
        this.placed = boolean
    }

    setPosition(left, top) {
        this.left = left
        this.top = top
    }

    setAnimation(boolean) {
        this.animation = boolean
    }

    setDirection(newDirection) {
        this.direction = newDirection
    }
}
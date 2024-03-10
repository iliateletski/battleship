import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

export class Ship {
	y = null
	x = null
	placed = false
	moving = false
	animation = false
	left = 0
	top = 0

	constructor(size, direction) {
		this.id = uuidv4()
		this.size = size
		this.direction = direction
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

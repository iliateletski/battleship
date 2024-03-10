import { COL_MARKERS } from '../utils/consts'
import { makeAutoObservable } from 'mobx'
import { inField, iterationAroundShip, shipIteration } from '../utils/additional'
import { Ship } from './Ship'

export class Board {
	board = []
	cells = []
	hits = new Map()
	ships = []

	constructor() {
		this.createBoard()
		makeAutoObservable(this)
	}

	createBoard() {
		const board = []

		for (let y = 0; y < 10; y++) {
			const row = []
			for (let x = 0; x < 10; x++) {
				const cell = { x, y, ship: null, free: true, shot: null, placedMarker: null, shipIds: [] }
				row.push(cell)
			}
			board.push(row)
		}

		for (let i = 0; i < 10; i++) {
			board[0][i].colMarker = COL_MARKERS[i]
			board[i][0].rowMarker = i + 1
		}

		for (const ship of this.ships) {
			if (!ship.placed) continue
			const { y, x } = ship
			board[y][x].ship = ship

			if (ship.moving) continue
			iterationAroundShip((y, x) => {
				if (inField(y, x)) {
					board[y][x].free = false
					board[y][x].shipIds.push(ship.id)
				}
			}, ship)
		}

		this.board = board
	}

	addShip(ship, y, x) {
		if (!this.ships.includes(ship)) {
			this.ships.push(ship)
		}

		if (inField(y, x)) {
			const shipInField = shipIteration(
				(y, x) => {
					if (!inField(y, x) || !this.board[y][x].free) {
						ship.setPosition('0', '0')
						ship.setMoving(false)
						this.createBoard()
						return false
					}
					return true
				},
				ship,
				{ x, y }
			)

			if (!shipInField) return false

			ship.setPlaced(true)
			ship.setMoving(false)
			ship.setCoordinates(y, x)
			ship.setPosition('0', '0')
			this.createBoard()
		}
		return true
	}

	shipPoints() {
		const shipPoints = { type: 'UserReady', ships: [] }
		for (const ship of this.ships) {
			if (!ship.placed) return null
			const points = []

			shipIteration((y, x) => {
				points.push({ y, x })
				return true
			}, ship)
			shipPoints.ships.push({ points })
		}
		return shipPoints
	}

	setCells(cell) {
		this.cells = [...this.cells, cell]
	}

	moveShip(ship) {
		ship.setMoving(true)
		this.createBoard()
	}

	rotateShip(ship) {
		if (!ship.placed) return false

		const setAnimation = () => {
			ship.setAnimation(true)
			setTimeout(() => {
				ship.setAnimation(false)
			}, 1000)
		}

		const newDirection = ship.direction === 'row' ? 'column' : 'row'

		const dRow = newDirection === 'row'
		const dColumn = newDirection === 'column'
		const { y, x } = ship

		let cX = x + (ship.size - 1) * dRow
		let cY = y + (ship.size - 1) * dColumn

		if (!inField(cY, cX)) {
			setAnimation()
			return false
		}

		const { shipIds } = this.board[cY][cX]

		if ((!shipIds.includes(ship.id) && shipIds.length) || shipIds.length > 1) {
			setAnimation()
			return false
		}

		ship.setDirection(newDirection)
		this.createBoard()
	}

	addShot(shotResult) {
		if (shotResult.hit) {
			const key = `y${shotResult.y}x${shotResult.x}`
			this.hits.set(key, shotResult)
		}
		const { y, x } = shotResult
		shotResult.kill && this.markKilledShip(y, x)
		this.board[y][x].shot = shotResult
	}

	markKilledShip(y, x) {
		let size = 1
		let shipPoint = { cY: y, cX: x }
		const dRow = this.hits.has(`y${y}x${x - 1}`) || this.hits.has(`y${y}x${x + 1}`)
		const dColumn = this.hits.has(`y${y - 1}x${x}`) || this.hits.has(`y${y + 1}x${x}`)
		const direction = dRow ? 'row' : 'column'

		const createShip = (y, x) => {
			let { ship } = this.board[y][x]
			if (!ship) {
				ship = new Ship(size, direction)
				ship.setCoordinates(y, x)
				this.board[y][x].ship = ship
			}
			return true
		}

		if (!dColumn && !dRow) return createShip(y, x)

		for (let i = 0, k = 1; i < 2; i++) {
			for (let i = 1; i < 4; i++) {
				let cY = y - i * k * dColumn
				let cX = x - i * k * dRow
				if (this.hits.has(`y${cY}x${cX}`)) {
					size++
					shipPoint = {
						cX: shipPoint.cX > cX ? cX : shipPoint.cX,
						cY: shipPoint.cY > cY ? cY : shipPoint.cY
					}
				} else break
			}
			k = -1
		}

		const { cY, cX } = shipPoint
		createShip(cY, cX)
	}
}

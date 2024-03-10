import { Board } from './Board'
import { Mouse } from './Mouse'
import { Preparation } from './Preparation'
import { makeAutoObservable } from 'mobx'
import { Game } from './Game'
import { WebSocketAPI } from '../http/WebSocketAPI'

export class Application {
	socket = null
	requestId = null
	isApp = false

	constructor() {
		makeAutoObservable(this)
	}

	start() {
		this.isApp = true
		this.player = new Board()
		this.rival = new Board()
		this.mouse = new Mouse(document.body)
		this.preparation = new Preparation(this)
		this.game = new Game(this)
		requestAnimationFrame(() => this.tick())
	}

	MouseStop() {
		cancelAnimationFrame(this.requestId)
		this.mouse.stop()
	}

	tick() {
		this.requestId = requestAnimationFrame(() => this.tick())
		this.preparation.update()
	}

	initWebSocket(roomId) {
		this.socket = new WebSocketAPI(roomId, this)
	}
}

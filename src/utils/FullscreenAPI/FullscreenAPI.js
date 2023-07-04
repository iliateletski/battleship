export class FullScreenAPI{

    constructor() {
        document.addEventListener('fullscreenerror', (e) => console.log(e))
    }

    toggleFullScreen() {
        if(document.fullscreenElement) {
            document.exitFullscreen()
        } else if(document.webkitFullscreenElement) {
            document.webkitExitFullscreen()
        } else if (document.mozFullScreenElement) {
            document.mozExitFullScreen()
        } else if (document.msFullscreenElement) {
            document.msExitFullscreen()
        } else {
            const element = document.documentElement
            if (element.requestFullscreen) {
                element.requestFullscreen()
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen()
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen()
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen()
            }
        }
    }
}
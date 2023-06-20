export const isUnderPoint = (point, element) => {
    const{x, y} = point
    const{left, top, height, width} = element.getBoundingClientRect()

    return left <= x && x <= left + width && top <= y && y <= top + height
}

export const inField = (y, x) => {
    if(!Number.isInteger(x) || !Number.isInteger(y)) {
        return false
    }
    return x >= 0 && x < 10 && y >= 0 && y < 10
}

export const iterationAroundShip = (callback, ship) => {
    const dRow = ship.direction === 'row'
    const dColumn = ship.direction === 'column'

    for(let y = ship.y - 1; y <= ship.y + ship.size * dColumn + dRow ; y++) {
        for(let x = ship.x - 1; x <= ship.x + ship.size * dRow + dColumn; x++) {
            callback(y, x, ship, dColumn, dRow)
        }   
    }
}

export const addEventListeners = (element, type, callback) => {
    element.addEventListener(type, callback)
    return () => element.removeEventListener(type, callback)
}

export const shipIteration = (callback, ship, {newDirection = '', y = null, x = null, count = 0} = {}) => {

    const dRow = newDirection ? newDirection ==='row' : ship.direction === 'row'
    const dColumn = newDirection ? newDirection ==='column' : ship.direction === 'column'
    
    const currentX = x != null ? x : ship.x
    const currentY = y != null ? y : ship.y
    
    for(let i = count; i < ship.size; i++) {

        const cX = currentX + dRow * i
        const cY = currentY + dColumn * i
        if(!callback(cY, cX)) return false
    }
    return true
}

export const markCells = (board, ship) => {
    const dx = ship.direction === 'row'
    const dy = ship.direction === 'column'
    for(let y = ship.y - 1; y <= ship.y + ship.size * dy + dx ; y++) {
        for(let x = ship.x - 1; x <= ship.x + ship.size * dx + dy; x++) {
            if(dy && (y >= ship.y && y < ship.y + ship.size)) {
                if(x === ship.x) x += dy
            }
            if(inField(y, x)) board[y][x].shot = {hit: false}
            if(dx && y === ship.y) x += ship.size
        }   
    }
}
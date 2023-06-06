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

export const changeCellState = (board, ship, boolean) => {
    const dx = ship.direction === 'row'
    const dy = ship.direction === 'column'
    console.log(ship)

    for(let y = ship.y - 1; y <= ship.y + ship.size * dy + dx ; y++) {
        for(let x = ship.x - 1; x <= ship.x + ship.size * dx + dy; x++) {
            if(inField(y, x)) {
                board[y][x].free = boolean
            }
        }   
    }
}
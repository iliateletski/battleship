export const isUnderPoint = (point, element) => {
    const{x, y} = point
    const{left, top, height, width} = element.getBoundingClientRect()

    return left <= x && x <= left + width && top <= y && y <= top + height
}
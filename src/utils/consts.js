export const HOME_ROUTE = '/'
export const GAME_ROUTE = '/game'
export const SHIPS_ROUTE = '/ships'

export const COL_MARKERS = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и']
export const ROW_MARKERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']


export const SHIPS = () => {
    const smallScreen = (window.innerWidth <= 740 && window.innerHeight <= 360) || (window.innerWidth <= 360 && window.innerHeight <= 740)
    
    return smallScreen ? [
        {startTop: '0', startLeft: '0', size: 4, direction: 'row'},
        {startTop: '44px', startLeft: '0', size: 3, direction: 'row'},
        {startTop: '44px', startLeft: '88px', size: 3, direction: 'row'},
        {startTop: '88px', startLeft: '0', size: 2, direction: 'row'},
        {startTop: '88px', startLeft: '66px', size: 2, direction: 'row'}, 
        {startTop: '88px', startLeft: '133px', size: 2, direction: 'row'},
        {startTop: '132px', startLeft: '0px', size: 1, direction: 'row'}, 
        {startTop: '132px', startLeft: '45px', size: 1, direction: 'row'}, 
        {startTop: '132px', startLeft: '89px', size: 1, direction: 'row'},
        {startTop: '132px', startLeft: '133px', size: 1, direction: 'row'}    
    ]
    : [
        {startTop: '0', startLeft: '0', size: 4, direction: 'row'},
        {startTop: '50px' , startLeft: '0', size: 3, direction: 'row'},
        {startTop: '50px' , startLeft: '100px', size: 3, direction: 'row'},
        {startTop: '100px', startLeft: '0', size: 2, direction: 'row'},
        {startTop: '100px', startLeft: '75px', size: 2, direction: 'row'}, 
        {startTop: '100px', startLeft: '150px', size: 2, direction: 'row'},
        {startTop: '150px', startLeft: '0px', size: 1, direction: 'row'}, 
        {startTop: '150px', startLeft: '50px', size: 1, direction: 'row'}, 
        {startTop: '150px', startLeft: '100px', size: 1, direction: 'row'},
        {startTop: '150px', startLeft: '150px', size: 1, direction: 'row'}
    ]
}

export const MESSAGE = {
    close: 'Соеденение разорвано.',
    SetShips: 'Ожидание соперника ...',
    WaitForSecondPlayer: 'Ожидание соперника ...',
    win_true: 'Вы победили!!!',
    win_false: 'Вы проиграли.',
}
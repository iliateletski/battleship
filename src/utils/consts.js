export const HOME_ROUTE = '/'
export const GAME_ROUTE = '/game'
export const SHIPS_ROUTE = '/ships'

export const COL_MARKERS = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и']
export const ROW_MARKERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']


export const SHIPS = [
    {startTop: '0', startLeft: '0', size: 4, direction: 'row'},
    {startTop: '0px' , startLeft: '0', size: 3, direction: 'row'},
    {startTop: '0px' , startLeft: '0px', size: 3, direction: 'row'},
    {startTop: '0px', startLeft: '0', size: 2, direction: 'row'},
    {startTop: '0px', startLeft: '0px', size: 2, direction: 'row'}, 
    {startTop: '0px', startLeft: '0px', size: 2, direction: 'row'},
    {startTop: '0px', startLeft: '0px', size: 1, direction: 'row'}, 
    {startTop: '0px', startLeft: '0px', size: 1, direction: 'row'}, 
    {startTop: '0px', startLeft: '0px', size: 1, direction: 'row'},
    {startTop: '0px', startLeft: '0px', size: 1, direction: 'row'}
]

export const MESSAGE = {
    close: 'Соеденение разорвано.',
    SetShips: 'Ожидание соперника ...',
    WaitForSecondPlayer: 'Ожидание соперника ...',
    win_true: 'Вы победили!!!',
    win_false: 'Вы проиграли.',

}
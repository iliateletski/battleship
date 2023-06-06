export const HOME_ROUTE = '/home'
export const GAME_ROUTE = '/game'
export const SHIPS_ROUTE = '/ships'

export const COL_MARKERS = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и']
export const ROW_MARKERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

export const ships = [
    {id: 1, startTop: '0', startLeft: '0', size: 4, direction: 'row'},
    {id: 2, startTop: '50px', startLeft: '0', size: 3, direction: 'row'},
    {id: 5, startTop: '50px', startLeft: '100px', size: 3, direction: 'row'},
    {id: 3, startTop: '100px', startLeft: '0', size: 2, direction: 'row'},
    {id: 6, startTop: '100px', startLeft: '75px', size: 2, direction: 'row'}, 
    {id: 8, startTop: '100px', startLeft: '150px', size: 2, direction: 'row'},
    {id: 7, startTop: '150px', startLeft: '0px', size: 1, direction: 'row'}, 
    {id: 9, startTop: '150px', startLeft: '50px', size: 1, direction: 'row'}, 
    {id: 4, startTop: '150px', startLeft: '100px', size: 1, direction: 'row'},
    {id: 10, startTop: '150px', startLeft: '150px', size: 1, direction: 'row'}
]
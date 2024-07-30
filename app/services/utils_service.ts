export default class UtilsService {
  async getRandomColor(): Promise<string> {
    const colors: { [key: string]: string } = {
      black: '000000',
      blue: '0078D0',
      green: '00A651',
      gray: '969696',
      brown: '996B4F',
      red: 'F0282D',
      orange: 'FFB114',
      pink: 'FF6D91',
      purple: '9B51E0',
    }

    const colorsIndex: string[] = [
      'black',
      'blue',
      'green',
      'gray',
      'brown',
      'red',
      'orange',
      'pink',
      'purple',
    ]

    const randomColorIndex = Math.floor(Math.random() * colorsIndex.length)

    return colors[colorsIndex[randomColorIndex]] || colors.blue
  }
}

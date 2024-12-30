const DEFAULT_WIDTH = 5

// Width of each character
const width = new Map<string, number>()
width.set('c', 4)
width.set('f', 4)
width.set('i', 2)
width.set('j', 4)
width.set('l', 3)
width.set('n', 4)

width.set('r', 4)
width.set('s', 6)
width.set('t', 4)
width.set('u', 4)
width.set('v', 4)
width.set('x', 4)
width.set('y', 4)
width.set('z', 4)

width.set('E', 4)
width.set('F', 4)
width.set('M', 7)
width.set('W', 7)

width.set(' ', 3)
width.set('.', 1)
width.set("'", 2)
width.set('!', 1)

export const getCharacterWidth = (char: string) => width.get(char) ?? DEFAULT_WIDTH

// Frames of each character
const frameMap = new Map<string, number>()
const characters = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789 __', ".!-,?'"]

characters
  .join('')
  .split('')
  .forEach((char, index) => {
    frameMap.set(char, index)
  })

export const getCharacterFrame = (char: string) => frameMap.get(char) ?? 0
export const gridCells = (n: number, p: number = 16) => n * p

export const hasCollision = (collisions?: Set<string>, x = 0, y = 0) => collisions?.has(`${x},${y}`)

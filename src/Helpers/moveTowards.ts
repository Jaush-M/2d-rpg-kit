import { GameObject } from '@/Classes/GameObject'
import { Vector2 } from '@/Classes/Vector2'

export const moveTowards = (player: GameObject, destinationPosition: Vector2, speed: number) => {
  const distanceToTravel = {
    x: destinationPosition.x - player.position.x,
    y: destinationPosition.y - player.position.y,
  }

  let distance = Math.sqrt(distanceToTravel.x ** 2 + distanceToTravel.y ** 2)

  if (Math.round(distance) <= 1.8) {
    // Snap to destination position if close enough
    player.position.x = destinationPosition.x
    player.position.y = destinationPosition.y
  } else {
    // Move towards the destination position by specified speed
    const normalizedX = distanceToTravel.x / distance
    const normalizedY = distanceToTravel.y / distance

    player.position.x += normalizedX * speed
    player.position.y += normalizedY * speed

    // Recalculate remaining distance after moving
    distanceToTravel.x = destinationPosition.x - player.position.x
    distanceToTravel.y = destinationPosition.y - player.position.y
    distance = Math.sqrt(distanceToTravel.x ** 2 + distanceToTravel.y ** 2)
  }

  return distance
}

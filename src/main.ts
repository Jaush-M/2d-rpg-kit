import './style.css'

import { GameLoop } from '@/Classes/GameLoop'
import { GameManager } from '@/Classes/GameManager'

import { CaveLevel1 } from '@/Levels/CaveLevel1'

// Initiate canvas
export const canvas = document.querySelector('canvas')!
export const ctx = canvas.getContext('2d')!

canvas.width = 320
canvas.height = 180

// Initiate root scene
const gameManager = new GameManager()
// gameManager.setLevel(new OutdoorLevel1())
gameManager.setLevel(new CaveLevel1())

// Establish update and render loops
const update = (delta: number) => {
  gameManager.stepEntry(delta, gameManager)
  gameManager.bindings.update()
}

const render = () => {
  // Clear stale frames
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  gameManager.drawBackground()
  // skySprite.drawImage(0, 0)

  // Save current state (for camera offset)
  ctx.save()

  // Offset by camera position
  ctx.translate(gameManager.camera.position.x, gameManager.camera.position.y)

  // Draw objects in mounted scene
  gameManager.drawObjects()

  // Restore state
  ctx.restore()

  // Draw anything above the game world
  gameManager.drawForeground()
}

// Start the game
const gameLoop = new GameLoop(update, render)
gameLoop.start()

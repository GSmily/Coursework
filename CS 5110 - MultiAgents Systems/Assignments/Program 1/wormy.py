# Wormy (a Nibbles clone)
# By Al Sweigart al@inventwithpython.com
# http://inventwithpython.com/pygame
# Released under a "Simplified BSD" license

# Modifications added by:
# Gavin Browning
# A01887359

import random, pygame, sys
from pygame.locals import *

FPS = 5
WINDOWWIDTH = 1280
WINDOWHEIGHT = 960
CELLSIZE = 20
assert WINDOWWIDTH % CELLSIZE == 0, "Window width must be a multiple of cell size."
assert WINDOWHEIGHT % CELLSIZE == 0, "Window height must be a multiple of cell size."
CELLWIDTH = int(WINDOWWIDTH / CELLSIZE)
CELLHEIGHT = int(WINDOWHEIGHT / CELLSIZE)

#                R    G    B
WHITE       = (255, 255, 255)
BLACK       = (  0,   0,   0)
RED         = (255,   0,   0)
GREEN       = (  0, 255,   0)
DARKGREEN   = (  0, 155,   0)
DARKGRAY    = ( 40,  40,  40)
ORANGE      = (255, 165,   0)
DARKORANGE  = (255, 100,   0)
STONEORANGE = (125,  75,  60)
BLUE        = (  0, 100, 225)
DARKBLUE    = (  0,   0, 225)
STONEBLUE   = ( 60,  90, 125)
BGCOLOR     = BLACK

UP = 'up'
DOWN = 'down'
LEFT = 'left'
RIGHT = 'right'

# syntactic sugar: index of the snake's head
HEAD = 0


def runGame():
    # Object lists
    snake_list = [Snake(DARKORANGE, ORANGE, STONEORANGE, RIGHT), Snake(DARKBLUE, BLUE, STONEBLUE, RIGHT)]
    laser_list = []
    stone_list = []

    # start the apples in a random place.
    apple1 = getRandomLocation()
    apple2 = getRandomLocation()

    # main game loop
    while True:
        # event handling loop
        for event in pygame.event.get():
            if event.type == QUIT:
                terminate()
            elif event.type == KEYDOWN:
                # snake 0 controls
                if (event.key == K_LEFT) and snake_list[0].direction != RIGHT:
                    snake_list[0].direction = LEFT
                elif (event.key == K_RIGHT) and snake_list[0].direction != LEFT:
                    snake_list[0].direction = RIGHT
                elif (event.key == K_UP) and snake_list[0].direction != DOWN:
                    snake_list[0].direction = UP
                elif (event.key == K_DOWN) and snake_list[0].direction != UP:
                    snake_list[0].direction = DOWN
                elif event.key == K_SLASH:
                    laser_list.append(laserDirection(snake_list[0]))

                # snake 1 controls
                if (event.key == K_a) and snake_list[1].direction != RIGHT:
                    snake_list[1].direction = LEFT
                elif (event.key == K_d) and snake_list[1].direction != LEFT:
                    snake_list[1].direction = RIGHT
                elif (event.key == K_w) and snake_list[1].direction != DOWN:
                    snake_list[1].direction = UP
                elif (event.key == K_s) and snake_list[1].direction != UP:
                    snake_list[1].direction = DOWN
                elif event.key == K_SPACE:
                    laser_list.append(laserDirection(snake_list[1]))

                # both snake's controls
                if (event.key == K_KP4) and snake_list[0].direction and snake_list[1].direction != RIGHT:
                    snake_list[0].direction = LEFT
                    snake_list[1].direction = LEFT
                elif (event.key == K_KP6) and snake_list[0].direction and snake_list[1].direction != LEFT:
                    snake_list[0].direction = RIGHT
                    snake_list[1].direction = RIGHT
                elif (event.key == K_KP8) and snake_list[0].direction and snake_list[1].direction != DOWN:
                    snake_list[0].direction = UP
                    snake_list[1].direction = UP
                elif (event.key == K_KP2) and snake_list[0].direction and snake_list[1].direction != UP:
                    snake_list[0].direction = DOWN
                    snake_list[1].direction = DOWN
                elif event.key == K_KP0:
                    laser_list.append(laserDirection(snake_list[0]))
                    laser_list.append(laserDirection(snake_list[1]))

                # terminate game
                if event.key == K_ESCAPE:
                    terminate()

        # snake collision detection and moving
        for snake in snake_list:
            # check if the snake has hit itself or another snake.
            for snakes in snake_list:
                for snakeBody in snakes.snakeCoords[1:]:
                    # snake hits itself
                    if snakeBody['x'] == snake.snakeCoords[HEAD]['x'] and snakeBody['y'] == snake.snakeCoords[HEAD]['y']:
                        # game over
                        return
                    # snake hits another snake
                    elif snakeBody['x'] == snakes.snakeCoords[HEAD]['x'] and snakeBody['y'] == snakes.snakeCoords[HEAD]['y']:
                        # game over
                        return

            # check if the snake has hit an edge
            if snake.snakeCoords[HEAD]['x'] == -1 or snake.snakeCoords[HEAD]['x'] == CELLWIDTH or snake.snakeCoords[HEAD]['y'] == -1 or snake.snakeCoords[HEAD]['y'] == CELLHEIGHT:
                # game over
                return

            # check if the snake has eaten an apple
            if snake.snakeCoords[HEAD]['x'] == apple1['x'] and snake.snakeCoords[HEAD]['y'] == apple1['y']:
                # set a new apple1 somewhere
                apple1 = getRandomLocation()
            elif snake.snakeCoords[HEAD]['x'] == apple2['x'] and snake.snakeCoords[HEAD]['y'] == apple2['y']:
                # set a new apple2 somewhere
                apple2 = getRandomLocation()
            else:
                # remove snake's tail segment
                del snake.snakeCoords[-1]

            # check if the snake was hit by a laser
            for laser in laser_list:
                hit = False
                for snakeTail in snake.snakeCoords[1:]:
                    if laser.laserCoords == snakeTail:
                        hit = True
                    # if hit by a laser, cut the snake there and turn the tail to stone
                    if hit == True:
                        stone_list.append(Stone(snake.stoneColor, snakeTail))
                        snake.snakeCoords.remove(snakeTail)

            # check if the snake hits a stone
            for stone in stone_list:
                if stone.stoneCoords == snake.snakeCoords[HEAD]:
                    # game over
                    return

            # move the snakes by adding a segment in the direction it is moving
            if snake.direction == UP:
                newHead = {'x': snake.snakeCoords[HEAD]['x'], 'y': snake.snakeCoords[HEAD]['y'] - 1}
            elif snake.direction == DOWN:
                newHead = {'x': snake.snakeCoords[HEAD]['x'], 'y': snake.snakeCoords[HEAD]['y'] + 1}
            elif snake.direction == LEFT:
                newHead = {'x': snake.snakeCoords[HEAD]['x'] - 1, 'y': snake.snakeCoords[HEAD]['y']}
            elif snake.direction == RIGHT:
                newHead = {'x': snake.snakeCoords[HEAD]['x'] + 1, 'y': snake.snakeCoords[HEAD]['y']}

            snake.snakeCoords.insert(0, newHead)

        # move the lasers by adding a segment in the direction it is moving
        for laser in laser_list:
            if laser.direction == UP:
                laser.laserCoords = {'x': laser.laserCoords['x'], 'y': laser.laserCoords['y'] - 1}
            elif laser.direction == DOWN:
                laser.laserCoords = {'x': laser.laserCoords['x'], 'y': laser.laserCoords['y'] + 1}
            elif laser.direction == LEFT:
                laser.laserCoords = {'x': laser.laserCoords['x'] - 1, 'y': laser.laserCoords['y']}
            elif laser.direction == RIGHT:
                laser.laserCoords = {'x': laser.laserCoords['x'] + 1, 'y': laser.laserCoords['y']}

            # remove the laser if it goes out of bounds
            if laser.laserCoords['x'] == -1 or laser.laserCoords['x'] == CELLWIDTH or laser.laserCoords['y'] == -1 or laser.laserCoords['y'] == CELLHEIGHT:
                laser_list.remove(laser)

        DISPLAYSURF.fill(BGCOLOR)
        drawGrid()
        drawSnakes(snake_list)
        drawApple(apple1)
        drawApple(apple2)
        drawScore1(len(snake_list[0].snakeCoords) - 3)
        drawScore2(len(snake_list[1].snakeCoords) - 3)
        drawLasers(laser_list)
        drawStones(stone_list)
        pygame.display.update()
        FPSCLOCK.tick(FPS)


def drawPressKeyMsg():
    pressKeySurf = BASICFONT.render('Press a key to play.', True, DARKGRAY)
    pressKeyRect = pressKeySurf.get_rect()
    pressKeyRect.topleft = (WINDOWWIDTH - 200, WINDOWHEIGHT - 30)
    DISPLAYSURF.blit(pressKeySurf, pressKeyRect)


def checkForKeyPress():
    if len(pygame.event.get(QUIT)) > 0:
        terminate()

    keyUpEvents = pygame.event.get(KEYUP)
    if len(keyUpEvents) == 0:
        return None
    if keyUpEvents[0].key == K_ESCAPE:
        terminate()
    return keyUpEvents[0].key


def showStartScreen():
    titleFont = pygame.font.Font('freesansbold.ttf', 100)
    titleSurf1 = titleFont.render('Snake!', True, WHITE, BLUE)
    titleSurf2 = titleFont.render('Snake!', True, ORANGE)

    degrees1 = 0
    degrees2 = 0
    while True:
        DISPLAYSURF.fill(BGCOLOR)
        rotatedSurf1 = pygame.transform.rotate(titleSurf1, degrees1)
        rotatedRect1 = rotatedSurf1.get_rect()
        rotatedRect1.center = (WINDOWWIDTH / 2, WINDOWHEIGHT / 2)
        DISPLAYSURF.blit(rotatedSurf1, rotatedRect1)

        rotatedSurf2 = pygame.transform.rotate(titleSurf2, degrees2)
        rotatedRect2 = rotatedSurf2.get_rect()
        rotatedRect2.center = (WINDOWWIDTH / 2, WINDOWHEIGHT / 2)
        DISPLAYSURF.blit(rotatedSurf2, rotatedRect2)

        drawPressKeyMsg()

        if checkForKeyPress():
            # clear event queue
            pygame.event.get()
            return
        pygame.display.update()
        FPSCLOCK.tick(FPS)
        # rotate by 3 degrees each frame
        degrees1 += 3
        # rotate by 7 degrees each frame
        degrees2 += 7


def terminate():
    pygame.quit()
    sys.exit()


def getRandomLocation():
    return {'x': random.randint(0, CELLWIDTH - 1), 'y': random.randint(0, CELLHEIGHT - 1)}


def showGameOverScreen():
    gameOverFont = pygame.font.Font('freesansbold.ttf', 150)
    gameSurf = gameOverFont.render('Game', True, WHITE)
    overSurf = gameOverFont.render('Over', True, WHITE)
    gameRect = gameSurf.get_rect()
    overRect = overSurf.get_rect()
    gameRect.midtop = (WINDOWWIDTH / 2, 10)
    overRect.midtop = (WINDOWWIDTH / 2, gameRect.height + 10 + 25)

    DISPLAYSURF.blit(gameSurf, gameRect)
    DISPLAYSURF.blit(overSurf, overRect)
    drawPressKeyMsg()
    pygame.display.update()
    pygame.time.wait(500)
    # clear out any key presses in the event queue
    checkForKeyPress()

    while True:
        if checkForKeyPress():
            # clear event queue
            pygame.event.get()
            return


def drawScore1(score):
    scoreSurf = BASICFONT.render('Score: %s' % (score), True, ORANGE)
    scoreRect = scoreSurf.get_rect()
    scoreRect.topleft = (WINDOWWIDTH - 112, 10)
    DISPLAYSURF.blit(scoreSurf, scoreRect)


def drawScore2(score):
    scoreSurf = BASICFONT.render('Score: %s' % (score), True, BLUE)
    scoreRect = scoreSurf.get_rect()
    scoreRect.topleft = (WINDOWWIDTH - 1240, 10)
    DISPLAYSURF.blit(scoreSurf, scoreRect)


def drawSnakes(snakes):
    for snake in snakes:
        for coord in snake.snakeCoords:
            x = coord['x'] * CELLSIZE
            y = coord['y'] * CELLSIZE
            snakeSegmentRect = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
            pygame.draw.rect(DISPLAYSURF, snake.color, snakeSegmentRect)
            snakeInnerSegmentRect = pygame.Rect(x + 4, y + 4, CELLSIZE - 8, CELLSIZE - 8)
            pygame.draw.rect(DISPLAYSURF, snake.innerColor, snakeInnerSegmentRect)


def drawApple(coord):
    x = coord['x'] * CELLSIZE
    y = coord['y'] * CELLSIZE
    appleRect = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
    pygame.draw.rect(DISPLAYSURF, RED, appleRect)


def drawLasers(lasers):
    for laser in lasers:
        x = laser.laserCoords["x"] * CELLSIZE
        y = laser.laserCoords["y"] * CELLSIZE
        rectangle = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
        pygame.draw.rect(DISPLAYSURF, laser.color, rectangle)


def laserDirection(snake):
    if snake.direction == UP:
        coords = {'x': snake.snakeCoords[HEAD]['x'], 'y': snake.snakeCoords[HEAD]['y'] - 1}
    elif snake.direction == DOWN:
        coords = {'x': snake.snakeCoords[HEAD]['x'], 'y': snake.snakeCoords[HEAD]['y'] + 1}
    elif snake.direction == LEFT:
        coords = {'x': snake.snakeCoords[HEAD]['x'] - 1, 'y': snake.snakeCoords[HEAD]['y']}
    elif snake.direction == RIGHT:
        coords = {'x': snake.snakeCoords[HEAD]['x'] + 1, 'y': snake.snakeCoords[HEAD]['y']}

    return Laser(snake.innerColor, snake.direction, coords)


def drawStones(stones):
    for stone in stones:
        x = stone.stoneCoords["x"] * CELLSIZE
        y = stone.stoneCoords["y"] * CELLSIZE
        rectangle = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
        pygame.draw.rect(DISPLAYSURF, stone.color, rectangle)


def drawGrid():
    # draw vertical lines
    for x in range(0, WINDOWWIDTH, CELLSIZE):
        pygame.draw.line(DISPLAYSURF, DARKGRAY, (x, 0), (x, WINDOWHEIGHT))
    # draw horizontal lines
    for y in range(0, WINDOWHEIGHT, CELLSIZE):
        pygame.draw.line(DISPLAYSURF, DARKGRAY, (0, y), (WINDOWWIDTH, y))


class Snake:
    def __init__(self, color, innerColor, stoneColor, direction):
        self.color = color
        self.innerColor = innerColor
        self.stoneColor = stoneColor
        self.direction = direction

        startx = random.randint(5, CELLWIDTH - 6)
        starty = random.randint(5, CELLHEIGHT - 6)

        self.snakeCoords = [{'x': startx,    'y': starty},
                           {'x': startx - 1, 'y': starty},
                           {'x': startx - 2, 'y': starty}]


class Laser:
    def __init__(self, color, direction, laserCoords):
        self.color = color
        self.direction = direction
        self.laserCoords = laserCoords


class Stone:
    def __init__(self, color, stoneCoords):
        self.color = color
        self.stoneCoords = stoneCoords


def main():
    global FPSCLOCK, DISPLAYSURF, BASICFONT

    pygame.init()
    FPSCLOCK = pygame.time.Clock()
    DISPLAYSURF = pygame.display.set_mode((WINDOWWIDTH, WINDOWHEIGHT))
    BASICFONT = pygame.font.Font('freesansbold.ttf', 18)
    pygame.display.set_caption('Snake')

    showStartScreen()
    while True:
        runGame()
        showGameOverScreen()


if __name__ == '__main__':
    main()
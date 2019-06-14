# CS5110 - Program #2
# Gavin Browning
# A01887359

import random, pygame, sys
from pygame.locals import *

FPS = 60
WINDOWWIDTH = 1280
WINDOWHEIGHT = 720
CELLSIZE = 20
assert WINDOWWIDTH % CELLSIZE == 0, "Window width must be a multiple of cell size."
assert WINDOWHEIGHT % CELLSIZE == 0, "Window height must be a multiple of cell size."
CELLWIDTH = int(WINDOWWIDTH / CELLSIZE)
CELLHEIGHT = int(WINDOWHEIGHT / CELLSIZE)

#                R    G    B
WHITE       = (255, 255, 255)
BLACK       = (  0,   0,   0)
RED         = (255,   0,   0)
DARKRED     = ( 35,   0,   0)
TAN         = (210, 180, 140)
GREEN       = (  0, 255,   0)
DARKGREEN   = (  0, 155,   0)
DARKGRAY    = ( 40,  40,  40)
ORANGE      = (255, 165,   0)
DARKORANGE  = (255, 100,   0)
STONEORANGE = (125,  75,  60)
BLUE        = (  0, 100, 225)
DARKBLUE    = (  0,   0, 225)
STONEBLUE   = ( 60,  90, 125)
GREY        = (105, 105, 105)
BGCOLOR     = BLACK

UP = 'up'
DOWN = 'down'
LEFT = 'left'
RIGHT = 'right'

random.seed(0)


# Create empty coordinates array
empty_coordinates = []
for x in range(0, CELLWIDTH):
    for y in range(0, CELLHEIGHT):
        empty_coordinates.append({'x': x, 'y': y})


def run_game():
    # Object lists
    roomba_list = [Roomba(DARKORANGE, ORANGE, UP, 1, 35), Roomba(DARKBLUE, BLUE, UP, 62, 35), Roomba(DARKGREEN, GREEN, UP, 1, 1)]
    obstacle_list, drop_list, heavy_dust_list, dust_list = draw_room()

    goUp = False
    goDown = False
    goLeft = False
    goRight = False

    # main game loop
    while True:
        for event in pygame.event.get(): # event handling loop

            if event.type == QUIT:
                terminate()
            elif event.type == KEYDOWN:
                pass

        # Loop to slow down roombas on heavy dust
        for roomba in roomba_list:
            if roomba.dustMeter > 0:
                roomba.dustMeter -= 1
                continue

            current_direction = roomba.direction

            # Obstacle checking
            for obstacle in obstacle_list:
                goDown, goLeft, goRight, goUp = avoid_obstacle(goDown, goLeft, goRight, goUp, obstacle, roomba)

            # Drop checking
            for drop in drop_list:
                goDown, goLeft, goRight, goUp = avoid_obstacle(goDown, goLeft, goRight, goUp, drop, roomba)

            if current_direction != roomba.direction:
                continue

            # Prioritize finding dust and moving there
            for dust in dust_list + heavy_dust_list:
                find_dust(roomba, dust)

            new_head = roomba_movement(roomba)

            # Randomly rotate roomba 5% of the time
            if random.uniform(0, 1) <= 0.05:
                for _ in range(random.randint(1, 4)):
                    rotate(roomba)

            # When roomba goes over normal dust remove it
            for dust in dust_list:
                if roomba.roombaCoords == dust.coord:
                    dust_list.remove(dust)
                    empty_coordinates.append(dust)

            # When roomba goes over heavy dust remove it and slow down
            for heavyDust in heavy_dust_list:
                if roomba.roombaCoords['x'] == heavyDust.coord['x'] and roomba.roombaCoords['y'] == heavyDust.coord['y']:
                    heavy_dust_list.remove(heavyDust)
                    empty_coordinates.append(heavyDust)
                    roomba.dustMeter = 30
                    new_head = roomba.roombaCoords

            roomba.roombaCoords = new_head

        DISPLAYSURF.fill(BGCOLOR)
        draw_grid()
        draw_obstacles(obstacle_list)
        draw_drops(drop_list)
        draw_heavy_dust(heavy_dust_list)
        draw_dust(dust_list)
        draw_roombas(roomba_list)
        pygame.display.update()
        FPSCLOCK.tick(FPS)


# Find dust around roomba and move there
def find_dust(roomba, dust):
    if {"x": roomba.roombaCoords["x"], "y": roomba.roombaCoords["y"] - 1} == dust.coord:
        roomba.direction = UP
    elif {"x": roomba.roombaCoords["x"], "y": roomba.roombaCoords["y"] + 1} == dust.coord:
        roomba.direction = DOWN
    elif {"x": roomba.roombaCoords["x"] - 1, "y": roomba.roombaCoords["y"]} == dust.coord:
        roomba.direction = LEFT
    elif {"x": roomba.roombaCoords["x"] + 1, "y": roomba.roombaCoords["y"] - 1} == dust.coord:
        roomba.direction = RIGHT


# Moving the roomba
def roomba_movement(roomba):
    if roomba.direction == UP:
        new_head = {'x': roomba.roombaCoords['x'], 'y': roomba.roombaCoords['y'] - 1}
    elif roomba.direction == DOWN:
        new_head = {'x': roomba.roombaCoords['x'], 'y': roomba.roombaCoords['y'] + 1}
    elif roomba.direction == LEFT:
        new_head = {'x': roomba.roombaCoords['x'] - 1, 'y': roomba.roombaCoords['y']}
    elif roomba.direction == RIGHT:
        new_head = {'x': roomba.roombaCoords['x'] + 1, 'y': roomba.roombaCoords['y']}
    return new_head


# Avoid obstacles by rotating randomly and going counter clockwise
def avoid_obstacle(goDown, goLeft, goRight, goUp, obstacle, roomba):
    if roomba.direction == UP:
        # obstacle above the roomba
        if {"x": roomba.roombaCoords["x"], "y": roomba.roombaCoords["y"] - 1} == obstacle.coord:
            rotate(roomba)
            goLeft = True

    elif roomba.direction == DOWN:
        # obstacle below the roomba
        if {"x": roomba.roombaCoords["x"], "y": roomba.roombaCoords["y"] + 1} == obstacle.coord:
            rotate(roomba)
            goRight = True

    elif roomba.direction == LEFT:
        # obstacle left of the roomba
        if {"x": roomba.roombaCoords["x"] - 1, "y": roomba.roombaCoords["y"]} == obstacle.coord:
            rotate(roomba)
            goDown = True

    elif roomba.direction == RIGHT:
        # obstacle right of the roomba
        if {"x": roomba.roombaCoords["x"] + 1, "y": roomba.roombaCoords["y"]} == obstacle.coord:
            rotate(roomba)
            goUp = True
    return goDown, goLeft, goRight, goUp


# Quit game
def terminate():
    pygame.quit()
    sys.exit()


# get a random empty coordinate
def get_random_coordinate():
    coordinate = random.choice(empty_coordinates)
    empty_coordinates.remove(coordinate)
    return coordinate


# Rotate the roomba in a counter clockwise fashion
def rotate(roomba):
    if roomba.direction == LEFT:
        roomba.direction = DOWN
    elif roomba.direction == UP:
        roomba.direction = LEFT
    elif roomba.direction == RIGHT:
        roomba.direction = UP
    else:
        roomba.direction = RIGHT


# Draws all obstacles, drops, and dust which then get removed from empty_coordinates[]
def draw_room():
    obstacle_list = []
    drop_list = []

    # Border Wall
    for x in range(0, CELLWIDTH):
        obstacle_list.append(Obstacle({'x': x, 'y': 0}))
        obstacle_list.append(Obstacle({'x': x, 'y': CELLHEIGHT - 1}))
        empty_coordinates.remove({'x': x, 'y': 0})
        empty_coordinates.remove({'x': x, 'y': CELLHEIGHT - 1})
    for y in range(1, CELLHEIGHT - 1):
        obstacle_list.append(Obstacle({'x': 0, 'y': y}))
        obstacle_list.append(Obstacle({'x': CELLWIDTH - 1, 'y': y}))
        empty_coordinates.remove({'x': 0, 'y': y})
        empty_coordinates.remove({'x': CELLWIDTH - 1, 'y': y})

    # Bottom-right Room
    for x in range(CELLWIDTH - 15, CELLWIDTH - 1):
        obstacle_list.append(Obstacle({'x': x, 'y': CELLHEIGHT - 15}))
        empty_coordinates.remove({'x': x, 'y': CELLHEIGHT - 15})
    for x in range(CELLWIDTH - 15, CELLWIDTH - 1):
        obstacle_list.append(Obstacle({'x': x, 'y': CELLHEIGHT - 14}))
        empty_coordinates.remove({'x': x, 'y': CELLHEIGHT - 14})
    for y in range(CELLHEIGHT - 15, CELLHEIGHT - 1):
        obstacle_list.append(Obstacle({'x': CELLWIDTH - 20, 'y': y}))
        empty_coordinates.remove({'x': CELLWIDTH - 20, 'y': y})
    for y in range(CELLHEIGHT - 15, CELLHEIGHT - 1):
        obstacle_list.append(Obstacle({'x': CELLWIDTH - 21, 'y': y}))
        empty_coordinates.remove({'x': CELLWIDTH - 21, 'y': y})

    # Staircase Wall
    for y in range(1, CELLHEIGHT - 28):
        obstacle_list.append(Obstacle({'x': CELLWIDTH - 11, 'y': y}))
        empty_coordinates.remove({'x': CELLWIDTH - 11, 'y': y})
    for y in range(1, CELLHEIGHT - 28):
        obstacle_list.append(Obstacle({'x': CELLWIDTH - 10, 'y': y}))
        empty_coordinates.remove({'x': CELLWIDTH - 10, 'y': y})

    # Staircase Drop
    for x in range(CELLWIDTH - 9, CELLWIDTH - 1):
        for y in range(1, CELLHEIGHT - 28):
            drop_list.append(Obstacle({'x': x, 'y': y}))
            empty_coordinates.remove({'x': x, 'y': y})

    # Top left TV
    for y in range(4, CELLHEIGHT - 25):
        obstacle_list.append(Obstacle({'x': CELLWIDTH - 60, 'y': y}))
        empty_coordinates.remove({'x': CELLWIDTH - 60, 'y': y})

    # Top left Couch
    for x in range(11, CELLWIDTH - 51):
        obstacle_list.append(Obstacle({'x': x, 'y': 4}))
        empty_coordinates.remove({'x': x, 'y': 4})
    for x in range(11, CELLWIDTH - 51):
        obstacle_list.append(Obstacle({'x': x, 'y': 10}))
        empty_coordinates.remove({'x': x, 'y': 10})
    for y in range(4, CELLHEIGHT - 25):
        obstacle_list.append(Obstacle({'x': CELLWIDTH - 50, 'y': y}))
        empty_coordinates.remove({'x': CELLWIDTH - 50, 'y': y})
    for y in range(4, CELLHEIGHT - 25):
        obstacle_list.append(Obstacle({'x': CELLWIDTH - 51, 'y': y}))
        empty_coordinates.remove({'x': CELLWIDTH - 51, 'y': y})

    # Bottom Left Kitchen Counter
    for x in range(1, CELLWIDTH - 45):
        obstacle_list.append(Obstacle({'x': x, 'y': CELLHEIGHT - 9}))
        empty_coordinates.remove({'x': x, 'y': CELLHEIGHT - 9})
    for x in range(1, CELLWIDTH - 45):
        obstacle_list.append(Obstacle({'x': x, 'y': CELLHEIGHT - 8}))
        empty_coordinates.remove({'x': x, 'y': CELLHEIGHT - 8})

    # Bottom Left Bar Stools
    for x in range(2, CELLWIDTH - 45, 3):
        obstacle_list.append(Obstacle({'x': x, 'y': CELLHEIGHT - 12}))
        empty_coordinates.remove({'x': x, 'y': CELLHEIGHT - 12})

    # Heavy Dust
    heavy_dust_list = [HeavyDust(get_random_coordinate()) for _ in range(20)]

    # Dust
    dust_list = [HeavyDust(get_random_coordinate()) for _ in range(200)]

    return obstacle_list, drop_list, heavy_dust_list, dust_list


# Draw the roombas
def draw_roombas(roombas):
    for roomba in roombas:
        x = roomba.roombaCoords['x'] * CELLSIZE
        y = roomba.roombaCoords['y'] * CELLSIZE
        roombaSegmentRect = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
        pygame.draw.rect(DISPLAYSURF, roomba.color, roombaSegmentRect)
        roombaInnerSegmentRect = pygame.Rect(x + 4, y + 4, CELLSIZE - 8, CELLSIZE - 8)
        pygame.draw.rect(DISPLAYSURF, roomba.innerColor, roombaInnerSegmentRect)


# Draw the obstacles
def draw_obstacles(obstacles):
    for obstacle in obstacles:
        x = obstacle.coord['x'] * CELLSIZE
        y = obstacle.coord['y'] * CELLSIZE
        obstacleRect = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
        pygame.draw.rect(DISPLAYSURF, GREY, obstacleRect)


# Draw the drops
def draw_drops(drops):
    for drop in drops:
        x = drop.coord['x'] * CELLSIZE
        y = drop.coord['y'] * CELLSIZE
        dropRect = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
        pygame.draw.rect(DISPLAYSURF, RED, dropRect)


# Draw the dust
def draw_dust(dusts):
    for dust in dusts:
        x = dust.coord['x'] * CELLSIZE
        y = dust.coord['y'] * CELLSIZE
        dustRect = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
        pygame.draw.rect(DISPLAYSURF, TAN, dustRect)


# Draw the heavy dust
def draw_heavy_dust(dusts):
    for dust in dusts:
        x = dust.coord['x'] * CELLSIZE
        y = dust.coord['y'] * CELLSIZE
        dustRect = pygame.Rect(x, y, CELLSIZE, CELLSIZE)
        pygame.draw.rect(DISPLAYSURF, DARKRED, dustRect)


# Draw the grid
def draw_grid():
    # draw vertical lines
    for x in range(0, WINDOWWIDTH, CELLSIZE):
        pygame.draw.line(DISPLAYSURF, DARKGRAY, (x, 0), (x, WINDOWHEIGHT))
    # draw horizontal lines
    for y in range(0, WINDOWHEIGHT, CELLSIZE):
        pygame.draw.line(DISPLAYSURF, DARKGRAY, (0, y), (WINDOWWIDTH, y))


class Roomba:
    def __init__(self, color, innerColor, direction, startx, starty):
        self.color = color
        self.innerColor = innerColor
        self.direction = direction
        self.roombaCoords = {'x': startx, 'y': starty}
        self.dustMeter = 0


class Obstacle:
    def __init__(self, coord):
        self.coord = coord


class Drop:
    def __init__(self, coord):
        self.coord = coord


class HeavyDust:
    def __init__(self, coord):
        self.coord = coord


class Dust:
    def __init__(self, coord):
        self.coord = coord


def main():
    global FPSCLOCK, DISPLAYSURF, BASICFONT

    pygame.init()
    FPSCLOCK = pygame.time.Clock()
    DISPLAYSURF = pygame.display.set_mode((WINDOWWIDTH, WINDOWHEIGHT))
    BASICFONT = pygame.font.Font('freesansbold.ttf', 18)
    pygame.display.set_caption('Roomba')

    while True:
        run_game()


if __name__ == '__main__':
    main()
# Gavin Browning
# Final Project Code

import random
import pygame
import sys
import math
import numpy as np
import matplotlib.pyplot as plt
from pygame.locals import *


FPS = 100
WINDOW_WIDTH = 720
WINDOW_HEIGHT = 720
CELL_SIZE = 10
assert WINDOW_WIDTH % CELL_SIZE == 0, "Window width must be a multiple of cell size."
assert WINDOW_HEIGHT % CELL_SIZE == 0, "Window height must be a multiple of cell size."
CELL_WIDTH = int(WINDOW_WIDTH / CELL_SIZE)
CELL_HEIGHT = int(WINDOW_HEIGHT / CELL_SIZE)

#         R    G    B
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
DARKRED = (35, 0, 0)
TAN = (210, 180, 140)
GREEN = (0, 255, 0)
DARKGREEN = (0, 155, 0)
DARKGRAY = (40, 40, 40)
ORANGE = (255, 165, 0)
DARKORANGE = (255, 100, 0)
STONEORANGE = (125, 75, 60)
BLUE = (0, 100, 225)
DARKBLUE = (0, 0, 225)
STONEBLUE = (60, 90, 125)
GREY = (105, 105, 105)
PURPLE = (128, 0, 128)
BGCOLOR = BLACK

UP = "up"
DOWN = "down"
LEFT = "left"
RIGHT = "right"

board = {}
unoccupied_locations = []
for x in range(0, CELL_WIDTH):
    for y in range(0, CELL_HEIGHT):
        board[(x, y)] = "empty"
        unoccupied_locations.append({"x": x, "y": y})


def get_random_location():
    location = random.choice(unoccupied_locations)
    unoccupied_locations.remove(location)
    return location


class Car:
    def __init__(self, direction, coordinate, chargers, method_used):
        self.direction = direction
        self.color = color
        self.coordinate = coordinate
        self.chargers = chargers
        self.charge = random.randrange(100, 1000)
        self.method_used = method_used
        board[(self.coordinate["x"], self.coordinate["y"])] = "car"

    def update(self):
        if self.is_on_charger() and self.charge <= 750:
            self.charge += 10
            new_location = self.coordinate

        elif self._check_in_front() == "obstacle" or self._check_in_front() == "car":
            self._rotate()
            new_location = self.coordinate

        elif self.charge < 100:
            if self.method_used == "Static" or self.method_used == "Dynamic_Close":
                new_location = self._move_to_closest_charger()
            elif self.method_used == "Dynamic_Cheap":
                new_location = self._move_to_cheapest_charger()
            elif self.method_used == "Dynamic_Close_Cheap":
                new_location = self._move_to_closest_cheapest_charger()

        else:
            new_location = self._move_forward()
            # Move straight most of the time but turn every once and a while
            if random.random() <= 0.2:
                for _ in range(random.randint(0, 3)):
                    self._rotate()

        self.charge -= 1

        self.color = BLUE

        self._move(new_location)

    def is_on_charger(self):
        for charger in self.chargers:
            if charger.revenue_ratio >= 8:
                continue
            if (
                self.coordinate["x"] == charger.coordinate["x"]
                and self.coordinate["y"] == charger.coordinate["y"]
            ):
                charger.update()
                return True
        return False

    @staticmethod
    def get_closest_charger(car_coordinate, chargers_const):
        car_coordinate = [(car_coordinate["x"], car_coordinate["y"])]

        chargers_list = []

        chargers = chargers_const[:]

        for i in range(3):
            chargers_list.append(
                (chargers[i].coordinate["x"], chargers[i].coordinate["y"])
            )

        chargers = np.asarray(chargers_list)
        dist_2 = np.sum((chargers - car_coordinate) ** 2, axis=1)

        closest_point = chargers_list[np.argmin(dist_2)]

        return closest_point

    def _move_to_closest_charger(self):
        next_location = self._move_forward()

        closest_charger = self.get_closest_charger(self.coordinate, self.chargers)

        if closest_charger[1] > next_location["y"]:
            self.direction = DOWN
        elif closest_charger[1] < next_location["y"]:
            self.direction = UP
        elif closest_charger[0] > next_location["x"]:
            self.direction = RIGHT
        elif closest_charger[0] < next_location["x"]:
            self.direction = LEFT

        return next_location

    @staticmethod
    def get_cheapest_charger(chargers):
        charger_cost = []
        for charger in chargers:
            charger_cost.append(charger.revenue_ratio)

        return charger_cost.index(min(charger_cost))

    def _move_to_cheapest_charger(self):
        next_location = self._move_forward()

        cheapest_charger = self.get_cheapest_charger(self.chargers)

        if self.chargers[cheapest_charger].coordinate["y"] > next_location["y"]:
            self.direction = DOWN
        elif self.chargers[cheapest_charger].coordinate["y"] < next_location["y"]:
            self.direction = UP
        elif self.chargers[cheapest_charger].coordinate["x"] > next_location["x"]:
            self.direction = RIGHT
        elif self.chargers[cheapest_charger].coordinate["x"] < next_location["x"]:
            self.direction = LEFT

        return next_location

    def get_closest_cheapest_charger(self, car_coordinate, chargers_const):
        car_coordinate = [(car_coordinate["x"], car_coordinate["y"])]

        chargers_list = []

        chargers = chargers_const[:]

        for i in range(3):
            chargers_list.append(
                (chargers[i].coordinate["x"], chargers[i].coordinate["y"])
            )

        chargers = np.asarray(chargers_list)
        dist_2 = np.sum((chargers - car_coordinate) ** 2, axis=1)

        for i in range(3):
            current_charge = self.charge - dist_2[i]
            fill_up = 750 - current_charge
            cost = chargers_const[i].revenue_ratio
            dist_2[i] = fill_up * cost

        closest_point = chargers_list[np.argmin(dist_2)]

        return closest_point


    def _move_to_closest_cheapest_charger(self):
        next_location = self._move_forward()

        closest_cheapest_charger = self.get_closest_cheapest_charger(self.coordinate, self.chargers)

        if closest_cheapest_charger[1] > next_location["y"]:
            self.direction = DOWN
        elif closest_cheapest_charger[1] < next_location["y"]:
            self.direction = UP
        elif closest_cheapest_charger[0] > next_location["x"]:
            self.direction = RIGHT
        elif closest_cheapest_charger[0] < next_location["x"]:
            self.direction = LEFT

        return next_location

    def _move_forward(self):
        intended_new_location = {"x": self.coordinate["x"], "y": self.coordinate["y"]}

        if self.direction == LEFT:
            intended_new_location["x"] -= 1
        elif self.direction == RIGHT:
            intended_new_location["x"] += 1
        elif self.direction == UP:
            intended_new_location["y"] -= 1
        elif self.direction == DOWN:
            intended_new_location["y"] += 1

        return intended_new_location

    def _check_in_front(self):
        if self.direction == LEFT:
            return board[(self.coordinate["x"] - 1, self.coordinate["y"])]
        elif self.direction == RIGHT:
            return board[(self.coordinate["x"] + 1, self.coordinate["y"])]
        elif self.direction == UP:
            return board[(self.coordinate["x"], self.coordinate["y"] - 1)]
        elif self.direction == DOWN:
            return board[(self.coordinate["x"], self.coordinate["y"] + 1)]
        return None

    def _rotate(self):
        if self.direction == LEFT:
            self.direction = UP
        elif self.direction == UP:
            self.direction = RIGHT
        elif self.direction == RIGHT:
            self.direction = DOWN
        else:
            self.direction = LEFT

    def _move(self, new_location):
        unoccupied_locations.append(self.coordinate)
        if new_location in unoccupied_locations:
            unoccupied_locations.remove(new_location)
        board[(self.coordinate["x"], self.coordinate["y"])] = "empty"
        board[(new_location["x"], new_location["y"])] = "car"
        self.coordinate = new_location


class Charger:
    def __init__(self, coordinate, method_used):
        self.coordinate = coordinate
        self.method_used = method_used
        board[(self.coordinate["x"], self.coordinate["y"])] = "charger"
        self.revenue = 0
        self.revenue_ratio = 1

    def update(self):
        if self.method_used == "Static":
            self.revenue += 3
        elif self.method_used == "Dynamic_Close" or self.method_used == "Dynamic_Cheap" or self.method_used == "Dynamic_Close_Cheap":
            self.revenue_ratio += 0.25
            self.revenue += self.revenue_ratio

    def ratio_decrement(self):
        self.revenue_ratio = max(0, self.revenue_ratio - 0.1)

    def get_ratio(self):
        return self.revenue_ratio


class Obstacle:
    def __init__(self, coordinate=None, color=GREY):
        self.color = color
        self.coordinate = get_random_location() if coordinate is None else coordinate
        board[(self.coordinate["x"], self.coordinate["y"])] = "obstacle"


def main():
    global FPS_CLOCK, DISPLAY_SURF, BASIC_FONT

    pygame.init()
    FPS_CLOCK = pygame.time.Clock()
    DISPLAY_SURF = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
    BASIC_FONT = pygame.font.Font("freesansbold.ttf", 18)
    pygame.display.set_caption("Roomba Sim")

    run_game()


def run_game():
    # (1 or 2)
    city_scape = 1

    method_used = "Static"
    # method_used = "Dynamic_Close"
    # method_used = "Dynamic_Cheap"
    # method_used = "Dynamic_Close_Cheap"

    if city_scape == 1:
        obstacles = draw_city_1()
        chargers = build_chargers_1(method_used)
        cars = build_cars(chargers, method_used)
    elif city_scape == 2:
        obstacles = draw_city_2()
        chargers = build_chargers_2(method_used)
        cars = build_cars(chargers, method_used)
    else:
        print("city_scape must be 1, or 2")

    r1, r2, r3 = [], [], []

    for _ in range(FPS * 180):
        check_for_key_press(city_scape, method_used, chargers)
        update_board([cars])

        for charger in chargers:
            charger.ratio_decrement()

        render_room([chargers, obstacles, cars])

        pygame.display.update()
        FPS_CLOCK.tick(FPS)

        r1.append(chargers[0].revenue)
        r2.append(chargers[1].revenue)
        r3.append(chargers[2].revenue)

    x = range(1, len(r1) + 1)
    plt.figure(figsize=(16, 9))
    plt.plot(
        x,
        r1,
        marker="",
        color="#e6bbad",
        linewidth=2,
        label="Charger 1",
    )
    plt.plot(
        x,
        r2,
        marker="",
        color="#bbade6",
        linewidth=2,
        label="Charger 2",
    )
    plt.plot(
        x,
        r3,
        marker="",
        color="#ade6bb",
        linewidth=2,
        label="Charger 3",
    )
    plt.legend()
    plt.xlabel("Frames")
    plt.ylabel("Charger Revenue ($)")
    plt.title("City " + str(city_scape) + ": " + method_used + " Charger Revenue per Frame")
    plt.show()

    # plt.savefig(f"{'.'}/city2_dynamic_close_cheap.png")
    # plt.close()


    print("\nCity scape :", city_scape)
    print("Method Used:", method_used)
    print("Charger 1's (Red) Total Revenue: ", chargers[0].revenue)
    print("Charger 2's (Purple) Total Revenue: ", chargers[1].revenue)
    print("Charger 3's (Green) Total Revenue: ", chargers[2].revenue)
    print("Total Revenue: ", chargers[0].revenue + chargers[1].revenue + chargers[2].revenue)


def check_for_key_press(city_scape, method_used, chargers):
    if len(pygame.event.get(QUIT)) > 0:
        terminate(city_scape, method_used, chargers)

    key_up_events = pygame.event.get(KEYUP)
    if len(key_up_events) == 0:
        return None
    if key_up_events[0].key == K_ESCAPE:
        terminate(city_scape, method_used, chargers)
    return key_up_events[0].key


def terminate(city_scape, method_used, chargers):
    print("\nCity scape :", city_scape)
    print("Method Used:", method_used)
    print("Charger 1's (Red) Total Revenue: ", chargers[0].revenue)
    print("Charger 2's (Purple) Total Revenue: ", chargers[1].revenue)
    print("Charger 3's (Green) Total Revenue: ", chargers[2].revenue)
    print("Total Revenue: ", chargers[0].revenue + chargers[1].revenue + chargers[2].revenue)
    pygame.quit()
    sys.exit()


def update_board(objects_in_room):
    for items in objects_in_room:
        for item in items:
            item.update()


def render_room(objects_in_room):
    DISPLAY_SURF.fill(BGCOLOR)
    draw_grid()
    for objects in objects_in_room:
        draw_objects(objects)


def draw_objects(objects):
    for item in objects:
        draw_object(item)


def draw_object(item):
    x = item.coordinate["x"] * CELL_SIZE
    y = item.coordinate["y"] * CELL_SIZE
    rectangle = pygame.Rect(x, y, CELL_SIZE, CELL_SIZE)
    pygame.draw.rect(DISPLAY_SURF, item.color, rectangle)


def draw_grid():
    for x in range(0, WINDOW_WIDTH, CELL_SIZE):
        pygame.draw.line(DISPLAY_SURF, GREY, (x, 0), (x, WINDOW_HEIGHT))
    for y in range(0, WINDOW_HEIGHT, CELL_SIZE):
        pygame.draw.line(DISPLAY_SURF, GREY, (0, y), (WINDOW_WIDTH, y))


def build_cars(chargers, method_used):
    cars = []

    for _ in range(15):
        cars.append(Car(UP, get_random_location(), chargers, method_used))

    return cars


def build_chargers_1(method_used):
    chargers = []

    charger_1_location = {"x": 1, "y": CELL_HEIGHT - 2}
    board[(charger_1_location["x"], charger_1_location["y"])] = "charger"
    unoccupied_locations.remove(charger_1_location)
    chargers.append(Charger(charger_1_location, method_used))
    chargers[0].color = RED

    charger_2_location = {"x": CELL_WIDTH - 2, "y": 1}
    board[(charger_2_location["x"], charger_2_location["y"])] = "charger"
    unoccupied_locations.remove(charger_2_location)
    chargers.append(Charger(charger_2_location, method_used))
    chargers[1].color = PURPLE

    charger_3_location = {"x": CELL_WIDTH // 2, "y": CELL_HEIGHT // 2}
    board[(charger_3_location["x"], charger_3_location["y"])] = "charger"
    unoccupied_locations.remove(charger_3_location)
    chargers.append(Charger(charger_3_location, method_used))
    chargers[2].color = GREEN

    return chargers


def build_chargers_2(method_used):
    chargers = []

    charger_1_location = {"x": 12, "y": 12}
    board[(charger_1_location["x"], charger_1_location["y"])] = "charger"
    unoccupied_locations.remove(charger_1_location)
    chargers.append(Charger(charger_1_location, method_used))
    chargers[0].color = RED

    charger_2_location = {"x": 59, "y": 59}
    board[(charger_2_location["x"], charger_2_location["y"])] = "charger"
    unoccupied_locations.remove(charger_2_location)
    chargers.append(Charger(charger_2_location, method_used))
    chargers[1].color = PURPLE

    charger_3_location = {"x": CELL_WIDTH // 2 - 1, "y": CELL_HEIGHT // 2 - 1}
    board[(charger_3_location["x"], charger_3_location["y"])] = "charger"
    unoccupied_locations.remove(charger_3_location)
    chargers.append(Charger(charger_3_location, method_used))
    chargers[2].color = GREEN

    return chargers


def draw_city_1():
    obstacles = []

    for x in range(6, CELL_WIDTH - 4, 4):
        for y in range(5, CELL_HEIGHT // 2 - 2):
            obstacles.append(Obstacle({"x": x, "y": y}))
            unoccupied_locations.remove({"x": x, "y": y})

    for x in range(6, CELL_WIDTH - 4, 4):
        for y in range(CELL_HEIGHT // 2 + 3, CELL_HEIGHT - 5):
            obstacles.append(Obstacle({"x": x, "y": y}))
            unoccupied_locations.remove({"x": x, "y": y})

    for x in range(CELL_WIDTH):
        obstacles.append(Obstacle({"x": x, "y": 0}, GREY))
        unoccupied_locations.remove({"x": x, "y": 0})
        obstacles.append(Obstacle({"x": x, "y": CELL_HEIGHT - 1}, GREY))
        unoccupied_locations.remove({"x": x, "y": CELL_HEIGHT - 1})

    for y in range(1, CELL_HEIGHT - 1):
        obstacles.append(Obstacle({"x": 0, "y": y}, GREY))
        unoccupied_locations.remove({"x": 0, "y": y})
        obstacles.append(Obstacle({"x": CELL_WIDTH - 1, "y": y}, GREY))
        unoccupied_locations.remove({"x": CELL_WIDTH - 1, "y": y})

    return obstacles


def draw_city_2():
    obstacles = []

    for x in range(4, CELL_WIDTH - 2, 3):
        for y in range(4, CELL_HEIGHT - 4, 3):
            obstacles.append(Obstacle({"x": x, "y": y}))
            unoccupied_locations.remove({"x": x, "y": y})

    for x in range(CELL_WIDTH):
        obstacles.append(Obstacle({"x": x, "y": 0}, GREY))
        unoccupied_locations.remove({"x": x, "y": 0})
        obstacles.append(Obstacle({"x": x, "y": CELL_HEIGHT - 1}, GREY))
        unoccupied_locations.remove({"x": x, "y": CELL_HEIGHT - 1})

    for y in range(1, CELL_HEIGHT - 1):
        obstacles.append(Obstacle({"x": 0, "y": y}, GREY))
        unoccupied_locations.remove({"x": 0, "y": y})
        obstacles.append(Obstacle({"x": CELL_WIDTH - 1, "y": y}, GREY))
        unoccupied_locations.remove({"x": CELL_WIDTH - 1, "y": y})

    return obstacles



if __name__ == "__main__":
    main()

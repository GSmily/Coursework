# Gavin Browning - A01887359
# CS 5050 - Assignment 9 - NP Complete Problem TSP
# Python 3

import random
import time
import math


KILL_TIME = 300


# Backtracking recursive TSP algorithm.
def backtracking_tsp_r(current_city, remaining_cities, total_cost, start_time):
    if len(remaining_cities) == 0:
        return 0
    if len(remaining_cities) == 1:
        return dist_squared(remaining_cities[0], current_city) + total_cost
    best = math.inf

    for city in remaining_cities:
        new_city_list = remaining_cities[:]
        new_city_list.remove(city)

        if time.time() - start_time >= KILL_TIME:
            return best

        current = backtracking_tsp_r(
            city,
            new_city_list,
            total_cost + dist_squared(current_city, city),
            start_time,
        )
        best = current if current < best else best

    return best


# Backtracking TSP algorithm.
def backtracking_tsp(city_list):
    start = time.time()
    best = math.inf
    for city in city_list:
        new_city_list = city_list[:]
        new_city_list.remove(city)

        if time.time() - start >= KILL_TIME:
            return best

        current = backtracking_tsp_r(city, new_city_list, 0, start)
        best = current if current < best else best
    return best


# Branch and Bound recursive TSP algorithm.
def branch_and_bound_tsp_r(current_city, remaining_cities, total_cost, best_cost, start_time):
    if len(remaining_cities) == 0:
        return 0
    if len(remaining_cities) == 1:
        return dist_squared(remaining_cities[0], current_city) + total_cost
    best = math.inf

    # Branch and bound added
    if total_cost > best_cost:
        return best

    for city in remaining_cities:
        new_city_list = remaining_cities[:]
        new_city_list.remove(city)

        if time.time() - start_time >= KILL_TIME:
            return best

        current = branch_and_bound_tsp_r(
            city,
            new_city_list,
            total_cost + dist_squared(current_city, city),
            best,
            start_time,
        )
        best = current if current < best else best

    return best


# Branch and Bound TSP algorithm.
def branch_and_bound_tsp(city_list):
    start = time.time()
    best = math.inf
    for city in city_list:
        new_city_list = city_list[:]
        new_city_list.remove(city)

        if time.time() - start >= KILL_TIME:
            return best

        current = branch_and_bound_tsp_r(city, new_city_list, 0, best, start)
        best = current if current < best else best
    return best


# Greedy recursive TSP algorithm.
def greedy_tsp_r(current_city, remaining_cities, total_cost, best_cost, start_time):
    if len(remaining_cities) == 0:
        return 0
    if len(remaining_cities) == 1:
        return dist_squared(remaining_cities[0], current_city) + total_cost
    best = math.inf
    if total_cost > best_cost:
        return best

    # Greedy sort added
    sort_city_list(current_city, remaining_cities)
    for city in remaining_cities:
        new_city_list = remaining_cities[:]
        new_city_list.remove(city)

        if time.time() - start_time >= KILL_TIME:
            return best

        current = greedy_tsp_r(
            city,
            new_city_list,
            total_cost + dist_squared(current_city, city),
            best,
            start_time,
        )
        best = current if current < best else best

    return best


# Greedy TSP algorithm.
def greedy_tsp(city_list):
    start = time.time()
    best = math.inf
    for city in city_list:
        new_city_list = city_list[:]
        new_city_list.remove(city)

        if time.time() - start >= KILL_TIME:
            return best

        current = greedy_tsp_r(city, new_city_list, 0, best, start)
        best = current if current < best else best
    return best


# Function that sorts the city list by distance to each other.
def sort_city_list(city, city_list):
    city_list.sort(key=lambda x: dist_squared(city, x))


# Function that shuffles the city list indexes.
def init_random_path(city_list):
    random.shuffle(city_list)
    return city_list


# Hill climbing TSP algorithm.
# What mutation operator is passed in determines which algorithm runs (swap or reverse).
def hill_climb_tsp(mutation_operator, start, random_path, objective_function):
    best = random_path
    best_score = objective_function(best)

    num_evaluations = 1

    while time.time() - start < KILL_TIME:
        # examine moves around our current position
        move_made = False
        for next in mutation_operator(best):
            if time.time() - start >= KILL_TIME:
                break

            # see if this move is better than the current
            next_score = objective_function(next)
            num_evaluations += 1
            if next_score < best_score:
                best = next
                best_score = next_score
                move_made = True
                break  # depth first search

        if not move_made:
            break  # we couldn't find a better move

    return best_score


# Function that generates all i, j pairs for i, j from 0-size uses shuffle to randomize
def all_pairs(size, shuffle=random.shuffle):
    r1 = [index for index in range(size)]
    r2 = [index for index in range(size)]
    if shuffle:
        shuffle(r1)
        shuffle(r2)
    for i in r1:
        for j in r2:
            yield (i, j)


# Generator function to return all possible variations where the section between two cities are swapped
def reversed_sections(path):
    for i, j in all_pairs(len(path)):
        if i != j:
            copy = path[:]
            if i < j:
                copy[i : j + 1] = reversed(path[i : j + 1])
            else:
                copy[i + 1 :] = reversed(path[:j])
                copy[:j] = reversed(path[i + 1 :])
            if copy != path:  # no point returning the same tour
                yield copy


# Generator function to create all possible variations where two cities have been swapped
def swapped_cities(path):
    for i, j in all_pairs(len(path)):
        if i < j:
            copy = path[:]
            copy[i], copy[j] = path[j], path[i]
            yield copy


# Function to find the distance squared of two cities
def dist_squared(p1, p2):
    f1 = p2[0] - p1[0]
    f2 = p2[1] - p1[1]
    return math.sqrt(f1 ** 2 + f2 ** 2)


# Function to calculate the length between two cities
def calc_length(city_list):
    length = 0
    for city_index in range(1, len(city_list)):
        length += dist_squared(city_list[city_index - 1], city_list[city_index])
    return length


def main():
    cities = []

    # Opens data file and appends it as a list of x y coordinates
    with open("data/xqf131.txt") as f:
        lines = f.readlines()
        for line in lines:
            if line == "":
                continue
            a, b = line.split("\t")
            a = int(a)
            b = int(b.strip("\n"))
            cities.append((a, b))

    # Uncomment which hill climbing mutation operator to run

    # Hill Climbing swap two cities operator
    # mutation_operator = swapped_cities

    # Hill Climbing reverse sub-tour operator
    mutation_operator = reversed_sections

    random_path = init_random_path(cities)
    objective_function = calc_length

    start = time.time()

    # Uncomment which algorithm to test
    # path_length = backtracking_tsp(cities)
    # path_length = branch_and_bound_tsp(cities)
    # path_length = greedy_tsp(cities)
    path_length = hill_climb_tsp(mutation_operator, start, random_path, objective_function)

    # Empirical study for hill climb that calculates the path length 10 times and takes an average
    # path_length = sum([hill_climb_tsp(mutation_operator, time.time(), random_path, objective_function) for _ in range(10)])/10.0

    print(path_length)


if __name__ == "__main__":
    main()

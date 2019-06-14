#!/usr/bin/env python3

# Gavin Browning - A01887359
# Homework 2
import signal

import numpy
import time

CACHE = {}


# Recursive knapsack function
def knap_recursive(knapsack_1, knapsack_2, item_bag):
    if knapsack_1 == knapsack_2 == 0:
        return True
    if knapsack_1 < 0 or knapsack_2 < 0:
        return False
    if item_bag is None:
        return False

    for item in item_bag:
        bag = item_bag[:]
        bag.remove(item)
        if knap_recursive(knapsack_1 - item, knapsack_2, bag):
            return True

    for item in item_bag:
        bag = item_bag[:]
        bag.remove(item)
        if knap_recursive(knapsack_1, knapsack_2 - item, bag):
            return True

    return False


# Memo function that adds a cache to the recursive solution
def knap_memo(knapsack_1, knapsack_2, item_bag):
    if item_bag is None:
        item_bag = []

    if CACHE.get((knapsack_1, knapsack_2, len(item_bag))):
        return CACHE[(knapsack_1, knapsack_2, len(item_bag))]

    if knapsack_1 == knapsack_2 == 0:
        CACHE[(knapsack_1, knapsack_2, len(item_bag))] = True
        return True
    if knapsack_1 < 0 or knapsack_2 < 0:
        CACHE[(knapsack_1, knapsack_2, len(item_bag))] = False
        return False
    if len(item_bag) == 0:
        CACHE[(knapsack_1, knapsack_2, len(item_bag))] = False
        return False

    for item in item_bag:
        bag = item_bag[:]
        bag.remove(item)
        if knap_memo(knapsack_1 - item, knapsack_2, bag):
            CACHE[(knapsack_1, knapsack_2, len(item_bag))] = True
            return True

    for item in item_bag:
        bag = item_bag[:]
        bag.remove(item)
        if knap_memo(knapsack_1, knapsack_2 - item, bag):
            CACHE[(knapsack_1, knapsack_2, len(item_bag))] = True
            return True

    CACHE[(knapsack_1, knapsack_2, len(item_bag))] = False
    return False


# Uniformly random integer generator function
def problem_generator(n, m):
    return numpy.random.random_integers(1, m - 1, n).tolist()


# Test function that also reports the runtime.
def test(knap, knapsack_1, knapsack_2, m, id):
    for n in range(10, 210, 10):
        average = 0.0
        for _ in range(10):
            start = time.time()
            knap(knapsack_1, knapsack_2, problem_generator(n, m))
            end = time.time()
            average += (end - start)
        average /= 10
        print("The average time with '%s' for %d objects is %f seconds." % (id, n, average))


# Main, Uncomment which test to run
if __name__ == "__main__":
    test(knap_recursive, 100, 100, 50, "Knap Recursive")
    #test(knap_memo, 100, 100, 50, "Knap Memo")
    #test(knap_memo, 200, 200, 100, "Knap Memo 2")

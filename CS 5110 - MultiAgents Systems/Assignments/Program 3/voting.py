# CS5110 - Program #3
# Gavin Browning
# A01887359

import random
from itertools import permutations

from input_output import *

PREFERENCE = 0
WEIGHT = 1


def main():

    matrix = menu()

    display_majority_table(matrix)

    slater_ranking = create_slater_rank(matrix)
    bucklin_ranking = create_bucklin_rank(matrix)

    stv_ranking = create_single_transferable_vote_rank(matrix)

    display_ranks(stv_ranking, slater_ranking, [bucklin_ranking] * 7)


# Didn't finish
def create_slater_rank(matrix):
    slater_list = []

    for x in range(7):
        slater_list.append(index_to_name(matrix[0][PREFERENCE][x] - 1))

    return slater_list


def create_bucklin_rank(matrix):
    scores = {
        "Alex": 0,
        "Bart": 0,
        "Cindy": 0,
        "David": 0,
        "Erik": 0,
        "Frank": 0,
        "Greg": 0
    }

    total_weights = 0

    for x in range(4):
        total_weights += matrix[x][WEIGHT]

    k = 0
    for candidate in range(7):
        scores[index_to_name(matrix[0][PREFERENCE][candidate] - 1)] += matrix[0][WEIGHT]
        scores[index_to_name(matrix[1][PREFERENCE][candidate] - 1)] += matrix[1][WEIGHT]
        scores[index_to_name(matrix[2][PREFERENCE][candidate] - 1)] += matrix[2][WEIGHT]
        scores[index_to_name(matrix[3][PREFERENCE][candidate] - 1)] += matrix[3][WEIGHT]

        k += 1
        for key in scores:
            if scores[key] >= total_weights / 2:
                return str(key) + " k:" + str(k)


def remove_lowest_candidate(matrix, ordering, scores, candidate):
    for voter in matrix:
        order = voter[0]
        weight = voter[1]

        for candidate in range(len(order)):
            scores[order[candidate]] += weight * (len(scores) - candidate)

    lowest_candidate = min(scores, key=scores.get)
    ordering[6 - candidate] = lowest_candidate
    del scores[lowest_candidate]

    for voter in matrix:
        order = voter[0]
        if lowest_candidate in order:
            order.remove(lowest_candidate)


def create_single_transferable_vote_rank(matrix):
    ordering = [0] * 7

    scores = {
        "Alex": 0,
        "Bart": 0,
        "Cindy": 0,
        "David": 0,
        "Erik": 0,
        "Frank": 0,
        "Greg": 0
    }

    for voter in range(4):
        for preference in range(7):
            matrix[voter][PREFERENCE][preference] = index_to_name(preference)

    for candidate in range(7):
        remove_lowest_candidate(matrix, ordering, scores, candidate)

    return ordering


def menu():
    print("Menu:\n"
          "1: Pre-existing voter matrix\n"
          "2: User defined weights and preferences\n"
          "3: Random preferences and weights\n"
          "4: User pairwise defined relationship that all voters adhere to\n"
          "5: User multiple defined relationship that all voters adhere to \n\n")

    choice = int(input("Choose (1-5): "))

    if choice == 1:
        matrix = create_default_matrix()
    elif choice == 2:
        matrix = create_user_matrix()
    elif choice == 3:
        matrix = create_random_matrix()
    elif choice == 4:
        matrix = create_same_preference_matrix()
    elif choice == 5:
        matrix = create_interesting_matrix()
    else:
        print("Please choose a number between 1 and 5.")
        return menu()

    return matrix


if __name__ == '__main__':
    main()
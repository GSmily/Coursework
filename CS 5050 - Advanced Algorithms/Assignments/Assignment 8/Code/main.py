# Gavin Browning - A01887359
# CS 5050 - Assignment 8 - String Matching
# Python 3

import random
import time


# Function for the Naive string searching algorithm
def naive_search(pattern, text):
    match = []
    m = len(pattern)
    n = len(text)

    # Shifts the index of the pattern with respect to the text.
    for i in range(0, n - m + 1):
        # Checks if the pattern matches at current index i.
        for j in range(0, m):
            if text[i + j] != pattern[j]:
                break
            j += 1

        # Append the index to the match list.
        if j == m:
            match.append(i)

    return match


# Function for the KMP string searching algorithm
def kmp_search(pattern, text):
    match = []
    m = len(pattern)
    n = len(text)

    # Create the longest prefix list to the size of the pattern
    longest_prefix = [0] * m
    create_longest_prefix_array(pattern, m, longest_prefix)

    j = 0

    # Shifts the index with respect to the length of text.
    for i in range(0, n):
        # When pattern index equals text index increment both indexes.
        if pattern[j] == text[i]:
            i += 1
            j += 1

        # Append the index to the match list.
        if j == m:
            match.append(i-j)
            j = longest_prefix[j - 1]

    return match


# Function that creates the longest prefix array
def create_longest_prefix_array(pattern, m, longest_prefix):
    previous_length = 0

    # From i = 1 to length of the text (m), calculate the longest prefix array
    for i in range(1, m):
        # When the pattern at index i equals the pattern at the previous
        # longest prefix length, increment the previous length and i.
        # Also set the longest prefix array at index i equal the previous length.
        if pattern[i] == pattern[previous_length]:
            previous_length += 1
            longest_prefix[i] = previous_length
            i += 1

        else:
            if previous_length != 0:
                previous_length = longest_prefix[previous_length - 1]

            # Set the longest prefix array at i to equal 0 and increment i by 1.
            else:
                longest_prefix[i] = 0
                i += 1


# Function for the BM string searching algorithm
def bm_search(pattern, text):
    match = []
    m = len(pattern)
    n = len(text)

    # Create the bad character list for a given pattern.
    bad_character = bad_character_heuristic(pattern, m)

    # Shifts the index of the pattern with respect to the text.
    for i in range(0, n - m + 1):
        j = m - 1

        # Reduces the index j of a pattern when the pattern
        # and text match up.
        while j >= 0 and pattern[j] == text[i + j]:
            j -= 1

        # Append to the match list if the pattern is found at the current shift.
        if j < 0:
            match.append(i)

            # Shifts pattern so that the last character of the pattern
            # matches up with the next character in the text.
            # Includes the case when the pattern matches up at the end of the text.
            i += (m - bad_character[ord(text[i + m])] if i + m < n else 1)

        # Shifts pattern so that the last character of the pattern matches
        # the bad character in the text.
        else:
            i += max(1, j - bad_character[ord(text[i + j])])

    return match


# Function to pre-process the Boyer Moore's algorithm
# bad character heuristic
def bad_character_heuristic(pattern, m):

    # Sets the values of the list to -1
    # Has to be a large list in order to fit all of
    # the different study strings.
    bad_character = [-1] * 10000000

    # Adds the real value of last character to the list.
    for i in range(m):
        bad_character[ord(pattern[i])] = i;

    return bad_character


# Function to show that the three algorithms work correctly
# in a solution trace that uses 3 different test strings and patterns.
def solution_trace():
    text_1 = "AABAACAADAABAABA"
    pattern_1 = "AABA"

    text_2 = "AAAAAAAAAAAAAAAB"
    pattern_2 = "AAAB"

    text_3 = "AAAAAAAAAAAAAAAA"
    pattern_3 = "AAAA"

    print("Naive Algorithm: Test Case 1")
    print("Pattern matches text at indexes: ", naive_search(pattern_1, text_1))
    print("")

    print("KMP Algorithm: Test Case 1")
    print("Pattern matches text at indexes: ", kmp_search(pattern_1, text_1))
    print("")

    print("BM Algorithm: Test Case 1")
    print("Pattern matches text at indexes: ", bm_search(pattern_1, text_1))
    print("")

    print("Naive Algorithm: Test Case 2")
    print("Pattern matches text at indexes: ", naive_search(pattern_2, text_2))
    print("")

    print("KMP Algorithm: Test Case 2")
    print("Pattern matches text at indexes: ", kmp_search(pattern_2, text_2))
    print("")

    print("BM Algorithm: Test Case 2")
    print("Pattern matches text at indexes: ", bm_search(pattern_2, text_2))
    print("")

    print("Naive Algorithm: Test Case 3")
    print("Pattern matches text at indexes: ", naive_search(pattern_3, text_3))
    print("")

    print("KMP Algorithm: Test Case 3")
    print("Pattern matches text at indexes: ", kmp_search(pattern_3, text_3))
    print("")

    print("BM Algorithm: Test Case 3")
    print("Pattern matches text at indexes: ", bm_search(pattern_3, text_3))


# Function that reads from a file and converts it to a string
# Removes newlines and replaces them with spaces
def read_file_to_string(file):
    file = open(file, "r", encoding="utf-8")
    string = file.read().replace("\n", " ")
    file.close()

    return string


# Function that creates a random binary string with a probability of 0.5
# for changing states and writes the string to a file
def random_binary_string_to_file():
    binary_string = [str(random.randint(0, 1)) for _ in range(10 ** 7)]
    binary_string = "".join(binary_string)

    with open('Data/random_binary.txt', 'a') as f:
        f.write(binary_string)
        f.close()


# Function that creates a regular binary string with a probability of 0.999
# for changing states and writes the string to a file
def regular_binary_string_to_file():
    binary_string = [random.randint(0, 1)]  # start array as [0,] or [1,]

    for x in range(1, 10 ** 7):
        binary_string.append(binary_string[x - 1] if random.randint(1, 1000) != 1 else binary_string[x - 1] ^ 1)

    binary_string = "".join(str(x) for x in binary_string)

    with open('Data/regular_binary.txt', 'a') as f:
        f.write(binary_string)
        f.close()


def main():
    # Function call for the solution trace
    solution_trace()

    # # Function calls to generate the binary string files:
    # random_binary_string_to_file()
    # regular_binary_string_to_file()

    # # Empirical Studies Code:
    # n = 1

    # shakespeare_text = read_file_to_string("Data/shakespeare.txt")
    # shakespeare_pattern = shakespeare_text[-n:]
    #
    # dna_text = read_file_to_string("Data/dna.txt")
    # dna_pattern = dna_text[-n:]
    #
    # random_text = read_file_to_string("Data/random_binary.txt")
    # random_pattern = random_text[-n:]
    #
    # regular_text = read_file_to_string("Data/regular_binary.txt")
    # regular_pattern = regular_text[-n:]

    # start = time.time()
    #
    # naive_search(regular_pattern, regular_text)
    #
    # total_time = time.time() - start

    # # Print pattern size and run time to console
    # print("Pattern Size: " + str(n))
    # print("\nRun Time: ", total_time, " seconds")

    # # Writes data to files
    # with open('Data/normal_data/regular_naive_data.txt', 'a') as f:
    #     f.write("Pattern Size: " + str(n))
    #     f.write("\nRun Time: " + str(total_time) + " seconds\n\n")
    #     f.close()
    #
    # with open('Data/graph_data/regular_naive_raw_data.txt', 'a') as f:
    #     f.write(str(n) + "  " + str(total_time) + "\n")
    #     f.close()


if __name__ == "__main__":
    main()

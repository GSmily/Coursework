# Gavin Browning - A01887359
# CS 5050 - DNA alignment algorithm
# Python 3
import glob
import os
import time
import numpy


# Opens a file and returns the file as a string,
# excluding the first column, spaces, and newlines.
def get_dna_sequence_from_data_file(file_name) -> str:
    dna_sequence = ""
    with open(file_name, "r") as file:
        for line in file:
            dna_sequence += "".join(
                [word.strip("\n").replace("n", "a") for word in line.split(" ")][1:]
            )

    return dna_sequence


# Accepts two strings and constructs a matrix based on their lengths.
def construct_grid(row: str, column: str) -> numpy.array:
    return numpy.empty((len(row) + 1, len(column) + 1), dtype=numpy.int16)


# Accepts two protein codes and returns a similarity score.
def score_pair_generator():
    protein = {"a": 0, "c": 1, "g": 2, "t": 3, "-": 4}
    score_map = numpy.array(
        [
            [5, -1, -2, -1, -3],
            [-1, 5, -3, -2, -4],
            [-2, -3, 5, -2, -2],
            [-1, -2, -2, 5, -1],
            [-3, -4, -2, -1, 0],
        ]
    )

    return lambda a, b: score_map[protein[a]][protein[b]]


# Computes and stores the score of each element in the grid.
def fill_grid(grid: numpy.array, row: str, column: str) -> None:
    gap_penalty = -5
    score_pair = score_pair_generator()
    m = grid.shape[0]
    n = grid.shape[1]

    for i in range(m):
        grid[i][0] = gap_penalty * i

    for j in range(n):
        grid[0][j] = gap_penalty * j

    for i in range(1, m):
        for j in range(1, n):
            top = grid[i][j - 1] + gap_penalty
            top_left = grid[i - 1][j - 1] + score_pair(row[i - 1], column[j - 1])
            left = grid[i - 1][j] + gap_penalty

            grid[i][j] = max(top, top_left, left)


# Returns the shortest path with the highest score.
def traceback(grid: numpy.array, row: str, column: str) -> str:
    sequence1, sequence2 = "", ""
    i, j = grid.shape[0] - 1, grid.shape[1] - 1
    score_pair = score_pair_generator()
    gap_penalty = -5

    # Starting at the bottom right corner -> Ending on the left edge or top edge.
    while i > 0 and j > 0:
        if grid[i][j] == grid[i - 1][j - 1] + score_pair(row[i - 1], column[j - 1]):
            sequence1 += row[i - 1]
            sequence2 += column[j - 1]
            i -= 1
            j -= 1

        elif grid[i][j] == grid[i - 1][j] + gap_penalty:
            sequence1 += row[i - 1]
            sequence2 += "-"
            i -= 1

        elif grid[i][j] == grid[i][j - 1] + gap_penalty:
            sequence1 += "-"
            sequence2 += column[j - 1]
            j -= 1

    # Finish at the top left corner
    while i > 0:
        sequence1 += row[i - 1]
        sequence2 += "-"
        i -= 1
    while j > 0:
        sequence1 += "-"
        sequence2 += column[j - 1]
        j -= 1

    print_traceback(sequence1, sequence2)


# Prints the traceback to both the console and to a file.
def print_traceback(sequence1, sequence2):

    # Reverse the sequences.
    sequence1 = sequence1[::-1]
    sequence2 = sequence2[::-1]

    score_pair = score_pair_generator()

    alignment = ""
    score = 0
    gap_penalty = -5

    for i in range(len(sequence1)):
        # If two characters are the same, output the character
        if sequence1[i] == sequence2[i]:
            alignment = alignment + sequence1[i]
            score += score_pair(sequence1[i], sequence2[i])

        # If two characters are not the same and no gaps, output a space
        elif (
            sequence1[i] != sequence2[i] and sequence1[i] != "-" and sequence2[i] != "-"
        ):
            score += score_pair(sequence1[i], sequence2[i])
            alignment += " "

        # If one of the characters is a gap, output a space and add the gap penalty.
        elif sequence1[i] == "-" or sequence2[i] == "-":
            alignment += " "
            score += gap_penalty

    # Output Sequences, Alignment, Gap Penalty, and Score to file.
    # with open('data/output/study1.txt', 'w') as f:
    #     f.write("Study 3:")
    #     f.write("\n\nSequence 1: ")
    #     f.write(sequence1)
    #     f.write("\nSequence 2: ")
    #     f.write(sequence2)
    #     f.write("\nAlignment:  ")
    #     f.write(alignment)
    #     f.write("\n\nGap Penalty: ")
    #     f.write(str(gap_penalty))
    #     f.write("\nDistance Between The Two Sequences (Score) = ")
    #     f.write(str(score))

    # Print Sequences, Alignment, Gap Penalty, and Score to console.
    print("Sequence 1:", sequence1)
    print("Sequence 2:", sequence2)
    print("Alignment: ", alignment)
    print("\nGap Penalty: ", gap_penalty)
    print("Distance Between The Two Sequences (Score) = ", score)


# Load all files in a directory and return them as a list of strings.
def load_protein_sequences(path: str) -> list:
    protein_sequences = []

    for file_name in glob.glob(os.path.join(path, "*.txt")):
        protein_sequences.append(get_dna_sequence_from_data_file(file_name))

    return protein_sequences


def main():
    start = time.time()

    sequences = load_protein_sequences("data/study1")
    row = sequences[0]
    col = sequences[1]

    grid = construct_grid(row, col)
    fill_grid(grid, row, col)
    traceback(grid, row, col)

    total_time = time.time() - start

    # Print run time to console
    print("\nRun Time: ", total_time, " seconds")

    # Output run time to file.
    # with open('data/output/study1.txt', 'a') as f:
    #     f.write("\n\nRun time: ")
    #     f.write(str(total_time))
    #     f.write(" seconds")
    #     f.close()


if __name__ == "__main__":
    main()

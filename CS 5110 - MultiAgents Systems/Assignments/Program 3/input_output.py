import random

PREFERENCE = 0
WEIGHT = 1


def create_default_matrix():
    return [
        [[3, 1, 2, 4, 6, 5, 7], 5],
        [[1, 2, 3, 7, 5, 6, 4], 4],
        [[2, 5, 7, 6, 3, 1, 4], 3],
        [[4, 7, 3, 6, 1, 2, 5], 6]
    ]


def create_user_matrix():
    matrix = create_default_matrix()

    print("Please create a user defined voting matrix")

    for voter in range(4):
        print("Input the weight for voter: " + str(voter))
        matrix[voter][WEIGHT] = int(input("weight: "))

    for voter in range(4):
        print("Input the rank for the candidate for voter: " + str(voter))
        for preference in range(7):
            matrix[voter][PREFERENCE][preference] = int(input(index_to_name(preference) + ": "))

    return matrix


def create_random_matrix():
    lower_weight_bound = 0.0
    upper_weight_bound = 10.0

    random_matrix = []

    for vote in range(4):
        random_weight = random.randint(lower_weight_bound, upper_weight_bound)
        random_prerferences = [preference + 1 for preference in range(7)]
        random.shuffle(random_prerferences)
        random_matrix.append([random_prerferences, random_weight])

    return random_matrix


def create_same_preference_matrix():
    matrix = create_default_matrix()

    print("Please input two specific candidate voting preferences")
    print("Possible candidates: Alex, Bart, Cindy, David, Erik, Frank, Greg")
    winner = name_to_index(input("Pairwise Winner: "))
    loser = name_to_index(input("Pairwise Loser: "))

    for voter in range(4):
        for preference in range(7):
            if matrix[voter][PREFERENCE][winner] > matrix[voter][PREFERENCE][loser]:
                matrix[voter][PREFERENCE][winner], matrix[voter][PREFERENCE][loser] = \
                    matrix[voter][PREFERENCE][loser], matrix[voter][PREFERENCE][winner]

    return matrix


def create_interesting_matrix():
    matrix = create_default_matrix()

    print("Please input three specific candidate voting preferences")
    print("Possible candidates: Alex, Bart, Cindy, David, Erik, Frank, Greg")
    winner = name_to_index(input("Pairwise Winner: "))
    middle = name_to_index(input("Pairwise Middle: "))
    loser = name_to_index(input("Pairwise Loser: "))

    for voter in range(4):
        for preference in range(7):
            if matrix[voter][PREFERENCE][winner] > matrix[voter][PREFERENCE][middle] > matrix[voter][PREFERENCE][loser]:
                matrix[voter][PREFERENCE][winner], matrix[voter][PREFERENCE][middle], matrix[voter][PREFERENCE][loser] = \
                    matrix[voter][PREFERENCE][loser], matrix[voter][PREFERENCE][middle], matrix[voter][PREFERENCE][winner]

    return matrix


def index_to_name(index):
    names = {
        0: "Alex",
        1: "Bart",
        2: "Cindy",
        3: "David",
        4: "Erik",
        5: "Frank",
        6: "Greg"
    }

    return names[index]


def name_to_index(name):
    indices = {
        "Alex": 0,
        "Bart": 1,
        "Cindy": 2,
        "David": 3,
        "Erik": 4,
        "Frank": 5,
        "Greg": 6
    }

    return indices[name]


# Function used by permission from tutor Christopher Brown
def display_majority_table(matrix: list) -> None:
    weight_a: int = matrix[0][1]
    weight_b: int = matrix[1][1]
    weight_c: int = matrix[2][1]
    weight_d: int = matrix[3][1]

    a: list = matrix[0][0]
    b: list = matrix[1][0]
    c: list = matrix[2][0]
    d: list = matrix[3][0]

    a: list = [8 - order for order in a]
    b: list = [8 - order for order in b]
    c: list = [8 - order for order in c]
    d: list = [8 - order for order in d]

    a: list = [round(weight_a * order, 3) for order in a]
    b: list = [round(weight_b * order, 3) for order in b]
    c: list = [round(weight_c * order, 3) for order in c]
    d: list = [round(weight_d * order, 3) for order in d]
    t: list = [round(a[candidate] + b[candidate] + c[candidate] + d[candidate], 3) for candidate in range(7)]

    print(
        f"""
        Majority Table
        _________________________________________________________________
        |              |         |         |         |         |         |
        | Choice/Agent | Voter A | Voter B | Voter C | Voter D |  Total  |
        |              | (wt {weight_a})  | (wt {weight_b})  | (wt {weight_c})  | (wt {weight_d})  |         |
        |______________|_________|_________|_________|_________|_________|
        |              |         |         |         |         |         |
        |     Alex     |{a[0]:>7}  |{b[0]:>7}  |{c[0]:>7}  |{d[0]:>7}  |{t[0]:>7}  |
        |______________|_________|_________|_________|_________|_________|
        |              |         |         |         |         |         |
        |     Bart     |{a[1]:>7}  |{b[1]:>7}  |{c[1]:>7}  |{d[1]:>7}  |{t[1]:>7}  |
        |______________|_________|_________|_________|_________|_________|
        |              |         |         |         |         |         |
        |     Cindy    |{a[2]:>7}  |{b[2]:>7}  |{c[2]:>7}  |{d[2]:>7}  |{t[2]:>7}  |
        |______________|_________|_________|_________|_________|_________|
        |              |         |         |         |         |         |
        |     David    |{a[3]:>7}  |{b[3]:>7}  |{c[3]:>7}  |{d[3]:>7}  |{t[3]:>7}  |
        |______________|_________|_________|_________|_________|_________|
        |              |         |         |         |         |         |
        |     Erik     |{a[4]:>7}  |{b[4]:>7}  |{c[4]:>7}  |{d[4]:>7}  |{t[4]:>7}  |
        |______________|_________|_________|_________|_________|_________|
        |              |         |         |         |         |         |
        |     Frank    |{a[5]:>7}  |{b[5]:>7}  |{c[5]:>7}  |{d[5]:>7}  |{t[5]:>7}  |
        |______________|_________|_________|_________|_________|_________|
        |              |         |         |         |         |         |
        |     Greg     |{a[6]:>7}  |{b[6]:>7}  |{c[6]:>7}  |{d[6]:>7}  |{t[6]:>7}  |
        |______________|_________|_________|_________|_________|_________|
        """
    )


def display_ranks(slater, stv, bucklin):
    print(
        f"""
        Ranking
        _________________________________________
        |         |         |         |         |
        | Ranking | Slater  |   STV   | Bucklin |
        |_________|_________|_________|_________|
        |         |         |         |         |
        |    1    |{slater[0]:^9}|{stv[0]:^9}|{bucklin[0]:^9}|
        |_________|_________|_________|_________|
        |         |         |         |         |
        |    2    |{slater[1]:^9}|{stv[1]:^9}|{bucklin[1]:^9}|
        |_________|_________|_________|_________|
        |         |         |         |         |
        |    3    |{slater[2]:^9}|{stv[2]:^9}|{bucklin[2]:^9}|
        |_________|_________|_________|_________|
        |         |         |         |         |
        |    4    |{slater[3]:^9}|{stv[3]:^9}|{bucklin[3]:^9}|
        |_________|_________|_________|_________|
        |         |         |         |         |
        |    5    |{slater[4]:^9}|{stv[4]:^9}|{bucklin[4]:^9}|
        |_________|_________|_________|_________|
        |         |         |         |         |
        |    6    |{slater[5]:^9}|{stv[5]:^9}|{bucklin[5]:^9}|
        |_________|_________|_________|_________|
        |         |         |         |         |
        |    7    |{slater[6]:^9}|{stv[6]:^9}|{bucklin[6]:^9}|
        |_________|_________|_________|_________|
        """
    )

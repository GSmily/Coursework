# Gavin Browning - A01887359
# CS 5050 - Assignment 6 - Polynomial Multiplication Two
# Python 3

import numpy
from numpy import ndarray
import time


# Function to divide and conquer polynomial multiplication.
def d_c_polynomial_multiplication(p: ndarray, q: ndarray, n: int) -> ndarray:
    # Base case (can't be made any smaller).
    if n == 1:
        return numpy.array([p[0] * q[0]])

    # Split the problem into 't' number of terms
    t: int = int(n / 2)

    # Divides p and q into arrays of low and high terms
    p_low: ndarray = numpy.empty(t - n % 2)
    p_high: ndarray = numpy.empty(t)
    q_low: ndarray = numpy.empty(t - n % 2)
    q_high: ndarray = numpy.empty(t)

    # Assigns terms to p/q low and high arrays
    for i in range(t):
        p_low[i] = p[i]
        p_high[i] = p[i + t]
        q_low[i] = q[i]
        q_high[i] = q[i + t]

    # Arrays which store the addition
    add_low_high_p: ndarray = numpy.empty(t)
    add_low_high_q: ndarray = numpy.empty(t)

    # Initializing addition arrays
    for i in range(t):
        add_low_high_p[i] = p_low[i] + p_high[i]
        add_low_high_q[i] = q_low[i] + q_high[i]

    # Three required sub-problems:
    # Lower part of the multiplication
    low_p_q: ndarray = d_c_polynomial_multiplication(p_low, q_low, t)
    # Middle part of the multiplication
    middle: ndarray = d_c_polynomial_multiplication(add_low_high_p, add_low_high_q, t)
    # Higher part of the multiplication
    high_p_q: ndarray = d_c_polynomial_multiplication(p_high, q_high, t)

    # Array to store the multiplication of polynomials
    p_q: ndarray = numpy.empty((2 * n) - 1)

    # Stores the collected terms into the multiplication array.
    for i in range(n - 1):
        p_q[i] += low_p_q[i]
        p_q[i + t] += middle[i] - low_p_q[i] - high_p_q[i]
        p_q[i + (2 * t)] += high_p_q[i]

    return p_q


# Function to print the polynomials
def print_polynomials(pf):
    poly_string = ""
    for i in range(len(pf)):
        poly_string += str(pf[i])
        if i != 0:
            poly_string += "x^"
            poly_string += str(i)
            poly_string += " + "
        else:
            poly_string += " + "

    poly_string = poly_string[:-3]
    print(poly_string)


# Creates an array of size n with random values between -1.0 and 1.0
def random_array(n: int) -> ndarray:
    r_array: ndarray = numpy.random.uniform(low=-1.0, high=1.0, size=n)
    return numpy.array([float(x) for x in r_array])


def main():
    n: int = 32
    p: ndarray = random_array(n)
    q: ndarray = random_array(n)

    start = time.time()

    # Loops d_c_polynomial_multiplication 10 times
    for i in range(10):
        # print("Polynomial: " + str(i + 1))
        pf = d_c_polynomial_multiplication(p, q, n)
        # print_polynomials(pf)
        #print("")

    total_time = time.time() - start

    # Print problem size and run time to console
    print("Problem Size: " + str(n))
    print("\nRun Time: ", total_time, " seconds")

    # Write data to file
    # with open('data.txt', 'a') as f:
    #     f.write("Problem Size: " + str(n))
    #     f.write("\nRun Time: " + str(total_time) + " seconds\n\n")
    #     f.close()


if __name__ == "__main__":
    main()

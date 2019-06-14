# Gavin Browning - A01887359
# CS 5050 - Assignment 7 - Polynomial Multiplication Three
# Python 3

import math
import cmath
import copy
import random
import time


# Function to return omega at size n
def omega(i, n):
    w = cmath.exp((2 * cmath.pi * 1j * i) / n)

    if n > 0:
        return w
    else:
        return None


# Function to check if n is a power of two
def check_if_power_of_two(n):
    if n > 1:
        power_of_two = math.log(n, 2)
        return abs(power_of_two - int(power_of_two)) == 0
    else:
        return False


# Pads polynomial with zero until n is a power of two
def zero_padding_power_of_two(poly):
    n = len(poly)
    padded_poly = copy.copy(poly)

    if n > 2 and check_if_power_of_two(n):
        return padded_poly

    while True:
        padded_poly.append(0)
        if check_if_power_of_two(len(padded_poly)):
            return padded_poly


# Pads polynomial with zero to make it a size of 2n
def zero_padding_two_n(poly):
    padded_poly = copy.copy(poly)

    while True:
        padded_poly.append(0)
        if check_if_power_of_two(len(padded_poly)):
            return padded_poly


# Splits the polynomial into even values
def split_polynomial_even(poly):
    n = len(poly)
    even_poly = []

    for i in range(0, n, 2):
        even_poly.append(poly[i])
    return even_poly


# Splits the polynomial into odd values
def split_polynomial_odd(poly):
    n = len(poly)
    odd_poly = []

    for i in range(1, n, 2):
        odd_poly.append(poly[i])
    return odd_poly


# Recursive function that computes the FFT of PQ
def polynomial_fft(poly, om=omega):
    n = len(poly)
    if n == 1:
        return poly

    even_poly = split_polynomial_even(poly)
    odd_poly = split_polynomial_odd(poly)

    sol_e = polynomial_fft(even_poly, om)
    sol_o = polynomial_fft(odd_poly, om)
    sol = sol_e + sol_o

    t = int(n/2)
    w = 1
    w_n = om(1, n)

    for i in range(0, t):
        sol[i] = sol_e[i] + w * sol_o[i]
        sol[i + t] = sol_e[i] - w * sol_o[i]
        w = w * w_n
    return sol


# Function that inverses FFT to interpolate the coefficients of PQ.
def polynomial_inverse_fft(poly, om=omega):
    n = len(poly)
    if n == 1:
        return poly

    even_poly = split_polynomial_even(poly)
    odd_poly = split_polynomial_odd(poly)

    sol_e = polynomial_inverse_fft(even_poly, om)
    sol_o = polynomial_inverse_fft(odd_poly, om)
    sol = sol_e + sol_o

    t = int(n/2)
    w = 1
    w_n = om(-1, n)

    for i in range(0, t):
        sol[i] = sol_e[i] + w * sol_o[i]
        sol[i + t] = sol_e[i] - w * sol_o[i]
        w = w * w_n
    return sol


# Function to check if n is a power of 2, and if it isn't, pad it with zero until it is.
def padding_check(poly, om=omega):
    n = len(poly)
    if not check_if_power_of_two(n):
        return polynomial_fft(zero_padding_power_of_two(poly), om)
    else:
        return polynomial_fft(poly, om)


# Function that reverts poly back to the initial array.
def inverse_padding_check(poly, om=omega):
    n = len(poly)
    if not check_if_power_of_two(n):
        return [i / n for i in polynomial_inverse_fft(zero_padding_power_of_two(poly), om)]
    else:
        return [i / n for i in polynomial_inverse_fft(poly, om)]


# Function that splits the inverse FFT solution into real and imaginary number arrays.
def inverse_fft_split(poly, om=omega):
    real_array = []
    imaginary_array = []

    for i in inverse_padding_check(poly, om):
        real_array.append(i.real)
        imaginary_array.append(i.imag)
    return real_array, imaginary_array


def fft_polynomial_multiplication(p, q, om=omega):
    # Pads p and q with zero until the polynomial length is a power of two
    padded_p = zero_padding_power_of_two(p)
    padded_q = zero_padding_power_of_two(q)

    # Pads p and q with zero until the polynomial length is size 2n
    padded_p = zero_padding_two_n(padded_p)
    padded_q = zero_padding_two_n(padded_q)

    # Checks padding and computes the FFT of p and q
    p_fft = padding_check(padded_p, om)
    q_fft = padding_check(padded_q, om)

    # Multiplies p_fft and q_fft together and stored in p_q
    p_q = []
    for x, y in zip(p_fft, q_fft):
        p_q.append(x*y)

    # Computes the inverse FFT of pq and splits the result into real and imaginary number arrays
    real, imaginary = inverse_fft_split(p_q, om)

    return real[:2*len(p)-1], imaginary[:2*len(p)-1]


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
def random_array(n):
    r_array = [random.uniform(-1.0, 1.0) for i in range(0, n)]
    return r_array


def main():
    n: int = 32

    start = time.time()

    # Loops fft_polynomial_multiplication 10 times
    for i in range(10):
        p = random_array(n)
        q = random_array(n)
        fft_polynomial_multiplication(p, q)

    # Tests class example FFT algorithm traceback
    # p = [0, 1, 2, 3]
    # q = [10, 11, 12, 13]
    # pf = fft_polynomial_multiplication(p, q, omega)
    # print(pf)

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
# Gavin Browning - A01887359
# CS 5050 - Assignment 6 - Polynomial Multiplication Two
# Python 3
import numpy
import time


def multiply_two_polynomials(p1, p2):
    product = []

    # Populate product array with 0
    for i in range(len(p1) + len(p2) - 1):
        product.append(0)

    # Calculate the multiplication
    for i in range(len(p1)):
        for j in range(len(p2)):
            product[i + j] += p1[i] * p2[j]

    # print(p1)
    # print(p2)
    # print(product)
    return product


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
    r_array = numpy.random.uniform(low=-1.0, high=1.0, size=n)
    return r_array


def main():
    n = 32

    start = time.time()

    # Loops multiply_two_polynomials 10 times
    for i in range(10):
        # print("Polynomial: " + str(i + 1))
        pf = multiply_two_polynomials(random_array(n), random_array(n))
        # print_polynomials(pf)
        # print("")

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

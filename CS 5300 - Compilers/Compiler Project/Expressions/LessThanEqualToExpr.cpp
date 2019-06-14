#include "LessThanEqualToExpr.hpp"

std::string LessThanEqualToExpr::emit() {
    std::string leftRegister = left->emit();
    std::string rightRegister = right->emit();

    std::cout << "\tsle " << leftRegister << ", " << leftRegister << ", " << rightRegister << std::endl;

    unloadRegister(rightRegister);

    return leftRegister;
}

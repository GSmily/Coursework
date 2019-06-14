#include "GreaterThanEqualToExpr.hpp"

std::string GreaterThanEqualToExpr::emit() {
    std::string leftRegister = left->emit();
    std::string rightRegister = right->emit();

    std::cout << "\tsge " << leftRegister << ", " << leftRegister << ", " << rightRegister << std::endl;

    unloadRegister(rightRegister);

    return leftRegister;
}

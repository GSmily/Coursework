#include "GreaterThanExpr.hpp"

std::string GreaterThanExpr::emit() {
    std::string leftRegister = left->emit();
    std::string rightRegister = right->emit();

    std::cout << "\tslt " << leftRegister << ", " << rightRegister << ", " << leftRegister << std::endl;

    unloadRegister(rightRegister);

    return leftRegister;
}

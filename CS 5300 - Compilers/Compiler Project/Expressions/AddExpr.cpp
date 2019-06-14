#include "AddExpr.hpp"

std::string AddExpr::emit() {
    std::string leftRegister = left->emit();
    std::string rightRegister = right->emit();

    std::cout << "\tadd " << leftRegister << ", " << leftRegister << ", " << rightRegister << std::endl;

    unloadRegister(rightRegister);

    return leftRegister;
}

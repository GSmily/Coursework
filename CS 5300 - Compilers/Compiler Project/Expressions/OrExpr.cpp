#include "OrExpr.hpp"

std::string OrExpr::emit() {
    std::string leftRegister = left->emit();
    std::string rightRegister = right->emit();

    std::cout << "\tor " << leftRegister << ", " << leftRegister << ", " << rightRegister << std::endl;

    unloadRegister(rightRegister);

    return leftRegister;
}

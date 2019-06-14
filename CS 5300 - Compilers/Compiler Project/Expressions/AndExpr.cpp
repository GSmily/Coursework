#include "AndExpr.hpp"

std::string AndExpr::emit() {
    std::string leftRegister = left->emit();
    std::string rightRegister = right->emit();

    std::cout << "\tand " << leftRegister<< ", " << leftRegister << ", " << rightRegister << std::endl;

    unloadRegister(rightRegister);

    return leftRegister;
}

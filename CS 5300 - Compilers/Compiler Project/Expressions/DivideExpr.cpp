#include "DivideExpr.hpp"

std::string DivideExpr::emit() {
    std::string leftRegister = left->emit();
    std::string rightRegister = right->emit();

    std::cout << "\tdiv " << leftRegister << ", " << rightRegister << std::endl
              << "\tmflo " << leftRegister << std::endl;

    unloadRegister(rightRegister);

    return leftRegister;
}

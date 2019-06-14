#include "ModuloExpr.hpp"

std::string ModuloExpr::emit() {
    std::string leftRegister = left->emit();
    std::string rightRegister = right->emit();
    
    std::cout << "\tdiv " << leftRegister << ", " << rightRegister << std::endl
              << "\tmfhi " << leftRegister << std::endl;

    unloadRegister(rightRegister);

    return leftRegister;
}

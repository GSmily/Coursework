#include "ProductExpr.hpp"

std::string ProductExpr::emit() {
    std::string leftRegister = left->emit();
    std::string rightRegister = right->emit();

    std::cout << "\tmult " << leftRegister << ", " << rightRegister << std::endl
              << "\tmflo " << leftRegister << std::endl;

    unloadRegister(rightRegister);

    return leftRegister;
}

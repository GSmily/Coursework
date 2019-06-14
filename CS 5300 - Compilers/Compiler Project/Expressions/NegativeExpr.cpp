#include "NegativeExpr.hpp"

std::string NegativeExpr::emit() {
    std::string leftRegister = value->emit();

    std::cout << "\tsub " << leftRegister << ", $zero" << ", " << leftRegister << std::endl;

    return leftRegister;
}

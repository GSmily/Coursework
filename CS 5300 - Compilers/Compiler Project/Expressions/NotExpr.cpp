#include "NotExpr.hpp"

std::string NotExpr::emit() {
    std::string leftRegister = value->emit();

    std::cout << "\tnot " << leftRegister << ", " << leftRegister << std::endl;

    return leftRegister;
}

#include "NumberExpr.hpp"

std::string NumberExpr::emit() {
    std::string newRegister = loadRegister();

    std::cout << "\tli " << newRegister << ", " << value << std::endl;

    return newRegister;
}

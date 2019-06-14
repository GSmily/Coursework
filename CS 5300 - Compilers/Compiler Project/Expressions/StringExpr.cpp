#include "StringExpr.hpp"

extern std::map<std::string, std::string> stringTable;

std::string StringExpr::emit() {
    std::string newRegister = loadRegister();
    std::cout << "\tla " << newRegister << ", " << value << std::endl;

    return newRegister;
}

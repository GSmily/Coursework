#include "CharacterExpr.hpp"

std::string CharacterExpr::emit() {
    std::string newValue;
    std::string newRegister = loadRegister();

    if (value == '\n') newValue = "\\n";
    else if (value == '\r') newValue = "\\r";
    else if (value == '\b') newValue = "\\b";
    else if (value == '\t') newValue = "\\t";
    else if (value == '\f') newValue = "\\f";
    else newValue = value;

    std::cout << "\tli " << newRegister << ", '" << newValue << "'" << std::endl;

    return newRegister;
}

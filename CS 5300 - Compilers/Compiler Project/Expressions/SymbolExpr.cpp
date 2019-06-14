#include "SymbolExpr.hpp"

std::string SymbolExpr::emit() {
    auto offsetRegister = symbol->offset->emit();
    std::string newRegister = loadRegister();

    std::cout << "\tadd $gp, $gp, " << offsetRegister  << std::endl
              << "\tlw " << newRegister << ", ($gp)" << std::endl
              << "\tsub $gp, $gp, " << offsetRegister << std::endl;

    unloadRegister(offsetRegister);

    return newRegister;
}

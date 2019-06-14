#include "Statements/ReadStatement.hpp"

void ReadStatement::ReadAddSymbol(Symbol* symbol) {
    symbolList.push_back(symbol);
}

void ReadStatement::emit() {
    for (Symbol* symbol : symbolList) {
        int syscallType;
        std::string typeName = symbol->type->name();
        if (typeName == "integer") syscallType = 5;
        else if (typeName == "char") syscallType = 12;

        auto offsetRegister = symbol->offset->emit();
        std::string symbolRegister = loadRegister();

        std::cout << "\tli $v0, " << syscallType << std::endl
                  << "\tsyscall" << std::endl
                  << "\tmove " << symbolRegister << ", $v0" << std::endl
                  << "\tadd $gp, $gp, " << offsetRegister  << std::endl
                  << "\tsw " << symbolRegister << ", ($gp)" << std::endl
                  << "\tsub $gp, $gp, " << offsetRegister << std::endl;

        unloadRegister(symbolRegister);
        unloadRegister(offsetRegister);
    }
}

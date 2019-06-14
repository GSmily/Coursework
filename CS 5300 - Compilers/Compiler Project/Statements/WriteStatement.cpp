#include "Statements/WriteStatement.hpp"

void WriteStatement::WriteAddExpression(Expression* expression) {
    expressionList.push_back(expression);
}

void WriteStatement::emit() {
    for (Expression* expression : expressionList) {
        int syscallType;
        std::string typeName = expression->type();
        if (typeName == "symbol") typeName = dynamic_cast<SymbolExpr*>(expression)->symbol->type->name();
        if (typeName == "number" || typeName == "boolean" || typeName == "integer") syscallType = 1;
        else if (typeName == "char") syscallType = 11;
        else if (typeName == "string") syscallType = 4;

        std::string expressionRegister = expression->emit();

        std::cout << "\tla $a0, (" << expressionRegister << ")" << std::endl
                  << "\tli $v0, " << syscallType << std::endl
                  << "\tsyscall" << std::endl;
        
        unloadRegister(expressionRegister);
    }
}
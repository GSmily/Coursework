#include "Statements/IfStatement.hpp"

void IfStatement::emit() {
    static int ifCounter = 0;
    static int elseCounter = 0;
    int ifNumber = ifCounter++;
    int elseNumber = elseCounter++;

    std::cout << std::endl;
    std::cout << "_If" << ifNumber << ":" << std::endl;

    auto expressionRegister = expression->emit();

    std::cout << "\tbeq $zero, " << expressionRegister << ", _IfEnd" << ifNumber << std::endl;
    unloadRegister(expressionRegister);

    ifStatementList->emit();

    std::cout << "\tj _ElseEnd" << elseNumber << std::endl << std::endl;
    std::cout << "_IfEnd" << ifNumber << ":" << std::endl;

    for (auto pair : elseIfList->statements) {
        static int elseIfCounter = 0;
        int elseIfNumber = elseIfCounter++;

        std::cout << "_ElseIf" << elseIfNumber << ":" << std::endl;
        auto expressionRegister = pair.first->emit();
        std::cout << "\tbeq $zero, " << expressionRegister << ", _ElseIfEnd" << elseIfNumber << std::endl;
        
        unloadRegister(expressionRegister);

        pair.second->emit();

        std::cout << "\tj _ElseEnd" << elseNumber << std::endl << std::endl;
        std::cout << "_ElseIfEnd" << elseIfNumber << ":" << std::endl;
    }

    std::cout << "_Else" << elseNumber << ":" << std::endl;

    elseStatementList->emit();

    std::cout << "_ElseEnd" << elseNumber << ":" << std::endl;

}
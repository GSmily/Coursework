#include "Statements/WhileStatement.hpp"

void WhileStatement::emit() {
    static int counter = 0;
    int whileNumber = counter++;
    std::cout << std::endl;
    std::cout << "_While" << whileNumber << ":" <<std::endl;

    auto expressionRegister = expression->emit();
    std::cout << "\tbeq $zero, " << expressionRegister << ", _WhileEnd" << whileNumber << std::endl;

    statements->emit();

    std::cout << "\tj _While" << whileNumber << std::endl << std::endl;
    std::cout << "_WhileEnd" << whileNumber << ":" << std::endl;

    unloadRegister(expressionRegister);
}

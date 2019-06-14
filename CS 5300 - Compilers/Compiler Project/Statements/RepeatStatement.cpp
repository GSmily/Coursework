#include "Statements/RepeatStatement.hpp"

void RepeatStatement::emit() {
    static int counter = 0;
    int repeatNumber = counter++;

    std::cout << std::endl;
    std::cout << "_Repeat" << repeatNumber << ":" <<std::endl;

    statements->emit();

    auto expressionRegister = expression->emit();
    std::cout << "\tbeq $zero, " << expressionRegister << ", _Repeat" << repeatNumber << std::endl;

    unloadRegister(expressionRegister);
}

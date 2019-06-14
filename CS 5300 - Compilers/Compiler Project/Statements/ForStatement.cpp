#include "ForStatement.hpp"

void ForStatement::emit() {
    if (forType == "to") {
        static int forToCounter = 0;
        int forToNumber = forToCounter++;

        assignmentStatement->emit();

        auto tempRegister = loadRegister();
        auto symbolRegister = symbolExpression->emit();
        auto endRegister = endExpression->emit();

        std::cout << std::endl;
        std::cout << "_ForTo" << forToNumber << ":" << std::endl;
        std::cout << "\tslt " << tempRegister << ", " << endRegister << ", " << symbolRegister << std::endl;
        std::cout << "\tbeq " << tempRegister << ", 1, _ForToEnd" << forToNumber << std::endl;

        statementList->emit();
        
        auto offsetRegister = symbolExpression->symbol->offset->emit();
        
        std::cout << "\tadd $gp, $gp, " << offsetRegister << std::endl
                  << "\tlw " << symbolRegister << ", 0($gp)" << std::endl
                  << "\taddi " << symbolRegister << ", " << symbolRegister << ", 1" << std::endl
                  << "\tsw " << symbolRegister << ", 0($gp)" << std::endl
                  << "\tsub " << "$gp, $gp, " << offsetRegister << std::endl;

        std::cout << "\tj _ForTo" << forToNumber << std::endl << std::endl;

        std::cout << "_ForToEnd" << forToNumber << ":" << std::endl;

        unloadRegister(tempRegister);
        unloadRegister(endRegister);
        unloadRegister(symbolRegister);
        unloadRegister(offsetRegister);
    }

    else if (forType == "down") {
        static int forDownCounter = 0;
        int forDownNumber = forDownCounter++;

        assignmentStatement->emit();

        auto tempRegister = loadRegister();
        auto symbolRegister = symbolExpression->emit();
        auto endRegister = endExpression->emit();

        std::cout << std::endl;
        std::cout << "_ForDown" << forDownNumber << ":" << std::endl;
        std::cout << "\tslt " << tempRegister << ", " << symbolRegister << ", " << endRegister << std::endl;
        std::cout << "\tbeq " << tempRegister << ", 1, _ForDownEnd" << forDownNumber << std::endl;

        statementList->emit();
        
        auto offsetRegister = symbolExpression->symbol->offset->emit();
        
        std::cout << "\tadd $gp, $gp, " << offsetRegister << std::endl
                  << "\tlw " << symbolRegister << ", 0($gp)" << std::endl
                  << "\taddi " << symbolRegister << ", " << symbolRegister << ", -1" << std::endl
                  << "\tsw " << symbolRegister << ", 0($gp)" << std::endl
                  << "\tsub " << "$gp, $gp, " << offsetRegister << std::endl;

        std::cout << "\tj _ForDown" << forDownNumber << std::endl << std::endl;

        std::cout << "_ForDownEnd" << forDownNumber << ":" << std::endl;

        unloadRegister(tempRegister);
        unloadRegister(endRegister);
        unloadRegister(symbolRegister);
        unloadRegister(offsetRegister);
    }
}
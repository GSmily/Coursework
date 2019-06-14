#include "AssignmentStatement.hpp"

void AssignmentStatement::assignArray() {
    auto type = dynamic_cast<ArrayType*>(left->type);

    for (int i = 0; i < type->size(); i += 4) {
        std::string leftRegister = left->offset->emit();
        std::string rightRegister = dynamic_cast<SymbolExpr*>(right)->symbol->offset->emit();
        auto tempRegister = loadRegister();

        std::cout << "\taddi $gp, $gp, " << i << std::endl;

        std::cout << "\tadd $gp, $gp, " << rightRegister << std::endl
                  << "\tlw " << tempRegister << ", 0($gp)" << std::endl
                  << "\tsub $gp, $gp, " << rightRegister << std::endl;
                  
        std::cout << "\tadd $gp, $gp, " << leftRegister << std::endl
                  << "\tsw " << tempRegister << ", 0($gp)" << std::endl
                  << "\tsub $gp, $gp, " << leftRegister << std::endl;

        std::cout << "\taddi $gp, $gp, " << -i << std::endl;

        unloadRegister(tempRegister);
        unloadRegister(leftRegister);
        unloadRegister(rightRegister);
    }
}

void AssignmentStatement::assignRecord() {
    auto type = dynamic_cast<RecordType*>(left->type);

    for (int i = 0; i < type->size(); i += 4) {
        std::string leftRegister = left->offset->emit();
        std::string rightRegister = dynamic_cast<SymbolExpr*>(right)->symbol->offset->emit();
        auto tempRegister = loadRegister();

        std::cout << "\taddi $gp, $gp, " << i << std::endl;

        std::cout << "\tadd $gp, $gp, " << rightRegister << std::endl
                  << "\tlw " << tempRegister << ", 0($gp)" << std::endl
                  << "\tsub $gp, $gp, " << rightRegister << std::endl;
                  
        std::cout << "\tadd $gp, $gp, " << leftRegister << std::endl
                  << "\tsw " << tempRegister << ", 0($gp)" << std::endl
                  << "\tsub $gp, $gp, " << leftRegister << std::endl;

        std::cout << "\taddi $gp, $gp, " << -i << std::endl;

        unloadRegister(tempRegister);
        unloadRegister(leftRegister);
        unloadRegister(rightRegister);
    }
}

void AssignmentStatement::emit() {
    if (left->type->name() == "record") {
        assignRecord();
        return;
    }
    if (left->type->name() == "array") {
        assignArray();
        return;
    }

    std::string leftRegister = left->offset->emit(); // offset
    std::string rightRegister = right->emit(); // value

    std::cout << "\tadd $gp, $gp, " << leftRegister << std::endl
              << "\tsw " << rightRegister << ", 0($gp)" << std::endl
              << "\tsub $gp, $gp, " << leftRegister << std::endl;

    unloadRegister(leftRegister);
    unloadRegister(rightRegister);
}

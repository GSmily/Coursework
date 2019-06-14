#include "SymbolTable.hpp"

std::map<std::string, Symbol*> symbolTable;
extern TypeTable* typeTable;

void ConstructPredefinedSymbols() {
    auto intType = new IntType();
    auto charType = new CharType();
    auto booleanType = new BoolType();
    auto stringType = new StringType();

    typeTable->StoreType("integer", intType);
    typeTable->StoreType("INTEGER", intType);
    typeTable->StoreType("number", intType);
    typeTable->StoreType("NUMBER", intType);
    typeTable->StoreType("char", charType);
    typeTable->StoreType("CHAR", charType);
    typeTable->StoreType("boolean", booleanType);
    typeTable->StoreType("BOOLEAN", booleanType);
    typeTable->StoreType("string", stringType);
    typeTable->StoreType("STRING", stringType);

    auto type = typeTable->LookUpType("boolean");
    StoreSymbol("FALSE", type, 0);
    StoreSymbol("false", type, 0);
    StoreSymbol("TRUE", type, 1);
    StoreSymbol("true", type, 1);

    std::cout << "\tli $t0, 1" << std::endl;
    std::cout << "\tsw $0, 0($gp)" << std::endl;
    std::cout << "\tsw $0, 4($gp)" << std::endl;

    std::cout << "\tsw $t0, 8($gp)" << std::endl;
    std::cout << "\tsw $t0, 12($gp)" << std::endl;
}

Symbol* LookUpSymbol(std::string id) {
    auto iterator = symbolTable.find(id);

    if (iterator != symbolTable.end()) return symbolTable[id];
    
    return nullptr;
}

void StoreSymbols(IdentList* identList, Type* type) {
    for (auto id: identList->list) StoreSymbol(id, type);
}

void StoreSymbol(Symbol* symbol) {
    StoreSymbol(symbol->id, symbol);
}

void StoreSymbol(std::string id, Type* type) {
    symbolTable[id] = new Symbol(id, type);
}

void StoreSymbol(std::string id, Type* type, int value) {
    symbolTable[id] = new Symbol(id, type, value);
}

void StoreSymbol(std::string id, Type* type, std::string strValue) {
    symbolTable[id] = new Symbol(id, type, strValue);
}

void StoreSymbol(std::string id, Symbol* symbol) {
    auto iterator = symbolTable.find(id);
    
    if (iterator != symbolTable.end()) delete symbolTable[id];
    
    symbolTable[id] = symbol;
}

Statement* BuildConstant(std::string id, Expression* expression) {
    if (expression->type() == "symbol") {
        auto symbolExpression = dynamic_cast<SymbolExpr*>(expression);
        auto type = typeTable->LookUpType("integer");
        auto value = symbolExpression->symbol->value;
        StoreSymbol(id, type, value);
        return new AssignmentStatement(LookUpSymbol(id), expression);
    }

    auto type = typeTable->LookUpType(expression->type());

    if(type->name() == "integer") {
        auto value = dynamic_cast<NumberExpr*>(expression)->value;
        StoreSymbol(id, type, value);
    }

    else if(type->name() == "char") {
        auto value = dynamic_cast<CharacterExpr*>(expression)->value;
        StoreSymbol(id, type, value);
    }

    else if(type->name() == "string") {
        auto strValue = dynamic_cast<StringExpr*>(expression)->value;
        StoreSymbol(id, type, strValue);
    }

    return new AssignmentStatement(LookUpSymbol(id), expression);
}
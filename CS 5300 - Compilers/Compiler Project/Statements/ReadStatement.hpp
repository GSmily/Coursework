#ifndef READ_STATEMENT_HPP
#define READ_STATEMENT_HPP

#include "Main/Includes.hpp"
#include "Statements/Statement.hpp"
#include "Main/Symbol.hpp"
#include "Main/Registers.hpp"

class ReadStatement : public Statement {
public:
    std::vector<Symbol*> symbolList;
    ReadStatement(Symbol* symbol) : Statement() {
        symbolList.push_back(symbol);
    }
    void ReadAddSymbol(Symbol* symbol);
    void emit() override;

};

#endif
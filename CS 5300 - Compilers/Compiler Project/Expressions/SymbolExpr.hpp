#ifndef SYMBOL_EXPR_HPP
#define SYMBOL_EXPR_HPP

#include "Expression.hpp"
#include "Main/Symbol.hpp"

class SymbolExpr : public Expression {
public:
    SymbolExpr(Symbol* symbol) : Expression() {
        this->symbol = symbol;
    }

    std::string emit() override;
    std::string type() {return "symbol";}
    Symbol* symbol;
};


#endif
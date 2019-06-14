#ifndef CHARACTER_EXPR_HPP
#define CHARACTER_EXPR_HPP

#include "Expression.hpp"

class CharacterExpr : public Expression {
public:
    CharacterExpr(char value) : Expression() {
        this->value = value;
    }

    std::string emit() override;
    virtual bool isConstant() { return true; }
    std::string type() { return "char"; }

    char value;
};

#endif

#ifndef NUMBER_EXPR_HPP
#define NUMBER_EXPR_HPP

#include "Expression.hpp"

class NumberExpr : public Expression {
public:
    NumberExpr(float value) : Expression() {
        this->value = value;
    }

    std::string emit() override;
    virtual bool isConstant() { return true; }
    std::string type() {return "number";}

    float value;
};

#endif

#ifndef NEGATIVE_EXPR_HPP
#define NEGATIVE_EXPR_HPP

#include "Expression.hpp"

class NegativeExpr : public Expression {
public:
    NegativeExpr(Expression* value) : Expression() {
        this->value = value;
    }

    std::string emit() override;
    std::string type() {return "integer";}

private:
    Expression* value;
};

#endif

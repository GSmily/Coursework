#ifndef SUBTRACT_EXPR_HPP
#define SUBTRACT_EXPR_HPP

#include "Expression.hpp"

class SubtractExpr : public Expression {
public:
    SubtractExpr(Expression* left, Expression* right) : Expression() {
        this->left = left;
        this->right = right;
    }

    std::string emit() override;
    std::string type() {return "integer";}

private:
    Expression* left;
    Expression* right;
};

#endif

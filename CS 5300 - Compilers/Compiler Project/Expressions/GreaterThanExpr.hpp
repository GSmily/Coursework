#ifndef GREATER_THAN_EXPR_HPP
#define GREATER_THAN_EXPR_HPP

#include "Expression.hpp"

class GreaterThanExpr : public Expression {
public:
    GreaterThanExpr(Expression* left, Expression* right) : Expression() {
        this->left = left;
        this->right = right;
    }

    std::string emit() override;
    std::string type() {return "boolean";}

private:
    Expression* left;
    Expression* right;
};

#endif

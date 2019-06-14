#ifndef LESS_THAN_EQUAL_TO_EXPR_HPP
#define LESS_THAN_EQUAL_TO_EXPR_HPP

#include "Expression.hpp"

class LessThanEqualToExpr : public Expression {
public:
    LessThanEqualToExpr(Expression* left, Expression* right) : Expression() {
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

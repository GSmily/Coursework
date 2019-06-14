#ifndef EQUAL_TO_EXPR_HPP
#define EQUAL_TO_EXPR_HPP

#include "Expression.hpp"

class EqualToExpr : public Expression {
public:
    EqualToExpr(Expression* left, Expression* right) : Expression() {
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

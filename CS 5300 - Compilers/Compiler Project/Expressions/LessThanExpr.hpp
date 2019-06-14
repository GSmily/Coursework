#ifndef LESS_THAN_EXPR_HPP
#define LESS_THAN_EXPR_HPP

#include "Expression.hpp"

class LessThanExpr : public Expression {
public:
    LessThanExpr(Expression* left, Expression* right) : Expression() {
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

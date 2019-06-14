#ifndef DIVIDE_EXPR_HPP
#define DIVIDE_EXPR_HPP

#include "Expression.hpp"

class DivideExpr : public Expression {
public:
    DivideExpr(Expression* left, Expression* right) : Expression() {
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

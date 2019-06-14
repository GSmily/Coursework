#ifndef ADD_EXPR_HPP
#define ADD_EXPR_HPP

#include "Expression.hpp"

class AddExpr : public Expression {
public:
    AddExpr(Expression* left, Expression* right) : Expression() {
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

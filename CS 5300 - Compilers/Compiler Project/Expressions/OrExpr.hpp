#ifndef OR_EXPR_HPP
#define OR_EXPR_HPP

#include "Expression.hpp"

class OrExpr : public Expression {
public:
    OrExpr(Expression* left, Expression* right) : Expression() {
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

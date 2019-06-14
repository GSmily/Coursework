#ifndef MODULO_EXPR_HPP
#define MODULO_EXPR_HPP

#include "Expression.hpp"

class ModuloExpr : public Expression {
public:
    ModuloExpr(Expression* left, Expression* right) : Expression() {
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

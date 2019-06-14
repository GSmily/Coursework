#ifndef PRODUCT_EXPR_HPP
#define PRODUCT_EXPR_HPP

#include "Expression.hpp"

class ProductExpr : public Expression {
public:
    ProductExpr(Expression* left, Expression* right) : Expression() {
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

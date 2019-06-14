#ifndef AND_EXPR_HPP
#define AND_EXPR_HPP

#include "Expression.hpp"

class AndExpr : public Expression {
public:
    AndExpr(Expression* left, Expression* right) : Expression() {
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

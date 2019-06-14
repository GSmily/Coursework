#ifndef NOT_EQUAL_TO_EXPR
#define NOT_EQUAL_TO_EXPR

#include "Expression.hpp"

class NotEqualToExpr : public Expression {
public:
    NotEqualToExpr(Expression* left, Expression* right) : Expression() {
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

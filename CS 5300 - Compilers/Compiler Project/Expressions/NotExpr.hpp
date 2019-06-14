#ifndef NOT_EXPR_HPP
#define NOT_EXPR_HPP

#include "Expression.hpp"

class NotExpr : public Expression {
public:
    NotExpr(Expression* value) : Expression() {
        this->value = value;
    }

    std::string emit() override;
    std::string type() {return "boolean";}

private:
    Expression* value;
};

#endif

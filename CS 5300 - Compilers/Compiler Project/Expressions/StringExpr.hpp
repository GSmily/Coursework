#ifndef STRING_EXPR_HPP
#define STRING_EXPR_HPP

#include "Expression.hpp"
#include "Main/StringTable.hpp"

class StringExpr : public Expression {
public:
    StringExpr(std::string value) : Expression() {
        this->value = value;
    }

    std::string emit() override;
    virtual bool isConstant() { return true; }
    std::string type() {return "string";}

    std::string value;
    std::string name;
};

#endif

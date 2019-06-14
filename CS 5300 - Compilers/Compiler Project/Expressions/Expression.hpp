#ifndef EXPRESSION_HPP
#define EXPRESSION_HPP

#include "Main/Includes.hpp"
#include "Types/Type.hpp"
#include "Main/Registers.hpp"

class Expression {
public:
    Expression() = default;
    virtual ~Expression() = default;

    virtual std::string emit() = 0;
    virtual std::string type() = 0;
    virtual bool isConstant() { return false; }
};

#endif

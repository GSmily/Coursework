#ifndef STATEMENT_HPP
#define STATEMENT_HPP

#include "Main/Includes.hpp"

class Statement {
public:
    Statement() = default;
    
    virtual void emit() = 0;
};

#endif
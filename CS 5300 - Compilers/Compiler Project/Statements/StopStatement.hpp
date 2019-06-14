#ifndef STOP_STATEMENT_HPP
#define STOP_STATEMENT_HPP

#include "Statements/Statement.hpp"

class StopStatement : public Statement {
public:
    void emit() override;
};

#endif
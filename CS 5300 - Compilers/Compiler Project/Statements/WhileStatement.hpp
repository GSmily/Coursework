#ifndef WHILE_STATEMENT_HPP
#define WHILE_STATEMENT_HPP

#include "Main/Includes.hpp"
#include "Main/Registers.hpp"
#include "Statements/Statement.hpp"
#include "Statements/StatementList.hpp"

class WhileStatement : public Statement {
public:
    WhileStatement(Expression* expression, StatementList* statements) : Statement() {
        this->expression = expression;
        this->statements = statements;
    }

    void emit() override;

    Expression* expression;
    StatementList* statements;
};

#endif
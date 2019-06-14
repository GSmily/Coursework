#ifndef REPEAT_STATEMENT_HPP
#define REPEAT_STATEMENT_HPP

#include "Main/Includes.hpp"
#include "Main/Registers.hpp"
#include "Statements/Statement.hpp"
#include "Statements/StatementList.hpp"

class RepeatStatement : public Statement {
public:
    RepeatStatement(StatementList* statements, Expression* expression) : Statement() {
        this->statements = statements;
        this->expression = expression;
    }

    void emit() override;

    StatementList* statements;
    Expression* expression;
};

#endif
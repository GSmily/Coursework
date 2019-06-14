#ifndef IF_STATEMENT_HPP
#define IF_STATEMENT_HPP

#include "Expressions/Expression.hpp"
#include "Statements/Statement.hpp"
#include "Statements/ElseIfList.hpp"

class IfStatement : public Statement {
public:
    IfStatement(Expression* expression, StatementList* ifStatementList, ElseIfList* elseIfList, StatementList* elseStatementList) : Statement() {
        this->expression = expression;
        this->ifStatementList = ifStatementList;
        this->elseIfList = elseIfList;
        this->elseStatementList = elseStatementList;
    }

    void emit() override;

    Expression* expression;
    StatementList* ifStatementList;
    ElseIfList* elseIfList;
    StatementList* elseStatementList;
};

#endif
#ifndef STATEMENT_LIST_HPP
#define STATEMENT_LIST_HPP

#include "Main/Includes.hpp"
#include "Statements/Statement.hpp"
#include "Expressions/Expression.hpp"

class StatementList {
public:
    StatementList() = default;

    void AddToStatementList(Statement*);

    void emit();

    std::vector<Statement*> statements;
};

#endif
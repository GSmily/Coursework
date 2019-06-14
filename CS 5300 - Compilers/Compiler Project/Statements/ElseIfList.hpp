#ifndef ELSE_IF_LIST_HPP
#define ELSE_IF_LIST_HPP

#include "Main/Includes.hpp"
#include "Expressions/Expression.hpp"
#include "Statements/StatementList.hpp"

class ElseIfList {
public:
    ElseIfList() = default;

    void AddToElseIfList(Expression*, StatementList*);

    std::vector<std::pair<Expression*, StatementList*>> statements;

    std::vector<std::pair<Expression*, StatementList*>> GetElseIfPairs() {
        return statements;
    };
};

#endif

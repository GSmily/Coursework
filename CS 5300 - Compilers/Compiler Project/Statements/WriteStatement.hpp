#ifndef WRITE_STATEMENT_HPP
#define WRITE_STATEMENT_HPP

#include "Main/Includes.hpp"
#include "Statements/Statement.hpp"
#include "Expressions/Expression.hpp"
#include "Expressions/SymbolExpr.hpp"

class WriteStatement : public Statement {
public:
    std::vector<Expression*> expressionList;
    WriteStatement(Expression* expression) : Statement() {
        expressionList.push_back(expression);
    }
    void WriteAddExpression(Expression* expression);
    void emit() override;
};

#endif
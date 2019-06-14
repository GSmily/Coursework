#ifndef FOR_STATEMENT_HPP
#define FOR_STATEMENT_HPP

#include "Main/Includes.hpp"
#include "Expressions/SymbolExpr.hpp"
#include "Statements/AssignmentStatement.hpp"
#include "Statements/Statement.hpp"
#include "Statements/StatementList.hpp"

class ForStatement : public Statement {
public:
    ForStatement(SymbolExpr* symbolExpression, AssignmentStatement* assignmentStatement,
                 Expression* endExpression, StatementList* statementList, std::string forType) : Statement() {
        this->symbolExpression = symbolExpression;
        this->assignmentStatement = assignmentStatement;
        this->endExpression = endExpression;
        this->statementList = statementList;
        this->forType = forType;
    }

    void emit() override;

    SymbolExpr* symbolExpression;
    AssignmentStatement* assignmentStatement;
    Expression* endExpression;
    StatementList* statementList;
    std::string forType;
};

#endif
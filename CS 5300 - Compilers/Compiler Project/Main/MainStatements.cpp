#include "MainStatements.hpp"

Statement* Assignment(Symbol* lhs, Expression* rhs) {
    return new AssignmentStatement(lhs, rhs);
}

Statement* For(Expression* symbolExpression, Statement* assignmentStatement, 
    Expression* endExpression, StatementList* statementList, std::string forType) {
    return new ForStatement(
        dynamic_cast<SymbolExpr*>(symbolExpression),
        dynamic_cast<AssignmentStatement*>(assignmentStatement),
        endExpression,
        statementList,
        forType
    );
}

Statement* If(Expression* expression, StatementList* ifStatementList, ElseIfList* elseIfList, StatementList* elseStatementList) {
    return new IfStatement(expression, ifStatementList, elseIfList, elseStatementList);
}

Statement* Procedure(std::string id) {
    return new ProcedureCall(id);
}

Statement* Read(Symbol* symbol) {
    return new ReadStatement(symbol);
}

Statement* Repeat(StatementList* statementList, Expression* expression) {
    return new RepeatStatement(statementList, expression);
}

Statement* Stop() {
    return new StopStatement();
}

Statement* While(Expression* expression, StatementList* statementList) {
    return new WhileStatement(expression, statementList);
}

Statement* Write(Expression* expression) {
    return new WriteStatement(expression);
};
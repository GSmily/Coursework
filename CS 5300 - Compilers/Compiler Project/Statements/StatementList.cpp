#include "Statements/StatementList.hpp"

void StatementList::AddToStatementList(Statement* statement) {
    if (!statement) return;
    statements.push_back(statement);
}

void StatementList::emit() {
    for (auto statement : statements) statement->emit();
    statements.clear();
}

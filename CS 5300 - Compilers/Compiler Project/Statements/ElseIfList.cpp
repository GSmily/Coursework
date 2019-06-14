#include "Statements/ElseIfList.hpp"

void ElseIfList::AddToElseIfList(Expression* expression, StatementList* statementList) {
    statements.push_back(std::make_pair(expression, statementList));
}

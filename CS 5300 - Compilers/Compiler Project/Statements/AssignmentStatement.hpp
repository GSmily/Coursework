#ifndef ASSIGNMENT_STATEMENT_HPP
#define ASSIGNMENT_STATEMENT_HPP

#include "Main/Includes.hpp"
#include "Statements/Statement.hpp"
#include "Main/Symbol.hpp"
#include "Types/ArrayType.hpp"
#include "Types/RecordType.hpp"
#include "Expressions/Expression.hpp"

class AssignmentStatement : public Statement {
public:
    AssignmentStatement(Symbol* left, Expression* right) : Statement() {
        this->left = left;
        this->right = right;
    }

    void emit() override;

    void assignArray();
    void assignRecord();

private:
    Symbol* left;
    Expression* right;
};

#endif
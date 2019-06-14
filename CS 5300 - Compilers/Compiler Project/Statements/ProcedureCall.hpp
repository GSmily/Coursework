#ifndef PROCEDURE_CALL_HPP
#define PROCEDURE_CALL_HPP

#include "Expressions/Expression.hpp"
#include "Statements/Statement.hpp"
#include "Statements/ElseIfList.hpp"

class ProcedureCall : public Statement {
public:
    ProcedureCall(std::string id) : Statement() {
        this->id = id;
    }

    void emit() override;

    std::string id;
};

#endif

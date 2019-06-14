#ifndef MAIN_STATEMENTS_HPP
#define MAIN_STATEMENTS_HPP

#include "Main/Includes.hpp"
#include "Main/Symbol.hpp"
#include "Expressions/Expression.hpp"

#include "Statements/AssignmentStatement.hpp"
#include "Statements/ElseIfList.hpp"
#include "Statements/ForStatement.hpp"
#include "Statements/IfStatement.hpp"
#include "Statements/ProcedureCall.hpp"
#include "Statements/RepeatStatement.hpp"
#include "Statements/ReadStatement.hpp"
#include "Statements/Statement.hpp"
#include "Statements/StatementList.hpp"
#include "Statements/StopStatement.hpp"
#include "Statements/WhileStatement.hpp"
#include "Statements/WriteStatement.hpp"

Statement* Assignment(Symbol*, Expression*);
Statement* For(Expression*, Statement*, Expression*, StatementList*, std::string);
Statement* If(Expression*, StatementList*, ElseIfList*, StatementList*);
Statement* Procedure(std::string);
Statement* Read(Symbol*);
Statement* Repeat(StatementList*, Expression*);
Statement* Stop();
Statement* While(Expression*, StatementList*);
Statement* Write(Expression*);

#endif
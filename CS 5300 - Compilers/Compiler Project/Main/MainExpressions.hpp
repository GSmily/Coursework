#ifndef MAIN_EXPRESSIONS_HPP
#define MAIN_EXPRESSIONS_HPP

#include "Includes.hpp"

#include "Main/StringTable.hpp"
#include "Expressions/AddExpr.hpp"
#include "Expressions/AndExpr.hpp"
#include "Expressions/CharacterExpr.hpp"
#include "Expressions/DivideExpr.hpp"
#include "Expressions/EqualToExpr.hpp"
#include "Expressions/Expression.hpp"
#include "Expressions/GreaterThanEqualToExpr.hpp"
#include "Expressions/GreaterThanExpr.hpp"
#include "Expressions/LessThanEqualToExpr.hpp"
#include "Expressions/LessThanExpr.hpp"
#include "Expressions/ModuloExpr.hpp"
#include "Expressions/NegativeExpr.hpp"
#include "Expressions/NotEqualToExpr.hpp"
#include "Expressions/NotExpr.hpp"
#include "Expressions/NumberExpr.hpp"
#include "Expressions/OrExpr.hpp"
#include "Expressions/ProductExpr.hpp"
#include "Expressions/StringExpr.hpp"
#include "Expressions/SubtractExpr.hpp"
#include "Expressions/SymbolExpr.hpp"
#include "Symbol.hpp"

// Arithmetic
Expression* Add(Expression*, Expression*);
Expression* Divide(Expression*, Expression*);
Expression* Modulo(Expression*, Expression*);
Expression* Product(Expression*, Expression*);
Expression* Subtract(Expression*, Expression*);

// Binary
Expression* And(Expression*, Expression*);
Expression* EqualTo(Expression*, Expression*);
Expression* GreaterThan(Expression*, Expression*);
Expression* GreaterThanEqualTo(Expression*, Expression*);
Expression* LessThan(Expression*, Expression*);
Expression* LessThanEqualTo(Expression*, Expression*);
Expression* NotEqualTo(Expression*, Expression*);
Expression* Or(Expression*, Expression*);

// Unary
Expression* Chr(Expression*);
Expression* Negative(Expression*);
Expression* Not(Expression*);
Expression* Ord(Expression*);
Expression* Pred(Expression*);
Expression* Succ(Expression*);

// Constants
Expression* Char(char);
Expression* Number(int);
Expression* String(std::string);

// Lvalue
Expression* BuildSymbolExpression(Symbol*);

#endif
#ifndef SYMBOL_TABLE_HPP
#define SYMBOL_TABLE_HPP

#include "Symbol.hpp"
#include "IdentList.hpp"
#include "Expressions/Expression.hpp"
#include "Expressions/CharacterExpr.hpp"
#include "Expressions/NumberExpr.hpp"
#include "Expressions/StringExpr.hpp"
#include "Expressions/SymbolExpr.hpp"
#include "Statements/AssignmentStatement.hpp"
#include "Statements/Statement.hpp"
#include "Types/Type.hpp"
#include "Types/TypeTable.hpp"

void ConstructPredefinedSymbols();
Symbol* LookUpSymbol(std::string);
void StoreSymbols(IdentList* identList, Type* type);
void StoreSymbol(Symbol*);
void StoreSymbol(std::string, Type*);
void StoreSymbol(std::string, Type*, int);
void StoreSymbol(std::string, Type*, std::string);
void StoreSymbol(std::string, Symbol*);
Statement* BuildConstant(std::string, Expression*);

#endif
#ifndef MAIN_HPP
#define MAIN_HPP

#include "Main/Includes.hpp"
#include "Main/SymbolTable.hpp"
#include "Main/StringTable.hpp"
#include "Expressions/Expression.hpp"
#include "Types/TypeTable.hpp"

extern int yyparse();

auto stringTable = new StringTable();
auto typeTable = new TypeTable();

int main(int argc, char** argv);

#endif

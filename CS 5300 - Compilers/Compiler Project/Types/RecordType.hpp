#ifndef RECORD_TYPE_HPP
#define RECORD_TYPE_HPP

#include "Main/Includes.hpp"
#include "Main/MainExpressions.hpp"
#include "Main/Symbol.hpp"
#include "Types/Type.hpp"
#include "Types/TypeTable.hpp"
#include "Types/RecordList.hpp"
#include "Expressions/Expression.hpp"
#include "Expressions/CharacterExpr.hpp"
#include "Expressions/NumberExpr.hpp"
#include "Expressions/SymbolExpr.hpp"

class RecordType : public Type {
public:
    int size() { return recordSize; }
    std::string name() { return "record"; }

    int recordSize;
    std::map<std::string, std::pair<int, Type*>> recordMap;
};

RecordType* BuildRecord(RecordList*);
Symbol* GetRecord(Symbol*, std::string);

#endif
#ifndef ARRAY_TYPE_HPP
#define ARRAY_TYPE_HPP

#include "Main/Includes.hpp"
#include "Main/MainExpressions.hpp"
#include "Main/Symbol.hpp"
#include "Types/Type.hpp"
#include "Types/TypeTable.hpp"
#include "Expressions/Expression.hpp"
#include "Expressions/CharacterExpr.hpp"
#include "Expressions/NumberExpr.hpp"
#include "Expressions/SymbolExpr.hpp"

class ArrayType : public Type {
public:
    ArrayType(int lowerBound, int upperBound, Type* innerType) {
        this->lowerBound = lowerBound;
        this->upperBound = upperBound;
        this->innerType = innerType;

        this->arraySize = innerType->size() * (upperBound - lowerBound) + innerType->size();
    }

    int size() { return arraySize; }
    std::string name() { return "array"; }

    Type* innerType;
    int lowerBound;
    int upperBound;
    int arraySize;
};

Type* BuildArray(Expression*, Expression*, Type*);
Symbol* GetArray(Symbol*, Expression*);

#endif
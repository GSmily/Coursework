#include "ArrayType.hpp"

extern TypeTable* typeTable;

Type* BuildArray(Expression* lowerBound, Expression* upperBound, Type* type) {
    int min, max;

    if (lowerBound->type() == "char") min = (int)dynamic_cast<CharacterExpr*>(lowerBound)->value;
    else if (lowerBound->type() == "number") min = dynamic_cast<NumberExpr*>(lowerBound)->value;
    else if (lowerBound->type() == "symbol") {
        min = dynamic_cast<SymbolExpr*>(lowerBound)->symbol->value;
    }

    if (upperBound->type() == "char") max = (int)dynamic_cast<CharacterExpr*>(upperBound)->value;
    else if (upperBound->type() == "number") max = dynamic_cast<NumberExpr*>(upperBound)->value;
    else if (upperBound->type() == "symbol") {
        max = dynamic_cast<SymbolExpr*>(upperBound)->symbol->value;
    }

    return new ArrayType(min, max, type);
}

Symbol* GetArray(Symbol* symbol, Expression* expression) {
    auto array = dynamic_cast<ArrayType*>(symbol->type);
    auto innerType = array->innerType;

    Expression* offset = Add(expression, Number(-array->lowerBound));
    offset = Product(offset, Number(innerType->size()));
    offset = Add(offset, symbol->offset);

    return new Symbol(symbol->id, innerType, offset);
}

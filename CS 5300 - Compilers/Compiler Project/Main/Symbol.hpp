#ifndef SYMBOL_HPP
#define SYMBOL_HPP

#include "Includes.hpp"
#include "Types/Type.hpp"
#include "Expressions/NumberExpr.hpp"

static int nextOffset = 0;

class Symbol {
public:
    Symbol(std::string id, Type* type) {
        this->id = id;
        this->type = type;
        offset = new NumberExpr(nextOffset);
        nextOffset += type->size();
        constant = false;
    }
    Symbol(std::string id, Type* type, int value) {
        this->id = id;
        this->type = type;
        this->value = value;
        offset = new NumberExpr(nextOffset);
        nextOffset += type->size();
        constant = true;
    }
    Symbol(std::string id, Type* type, std::string strValue) {
        this->id = id;
        this->type = type;
        this->strValue = strValue;
        offset = new NumberExpr(nextOffset);
        nextOffset += type->size();
        constant = false;
    }
    Symbol(std::string id, Type* type, Expression* offset) {
        this->id = id;
        this->type = type;
        this->offset = offset;
    }

    ~Symbol() {}

    bool constant;
    std::string id;
    Expression* offset;
    Type* type;
    int value;
    std::string strValue;
};

#endif

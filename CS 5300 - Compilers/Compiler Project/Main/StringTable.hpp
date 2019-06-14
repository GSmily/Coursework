#ifndef STRING_TABLE_HPP
#define STRING_TABLE_HPP

#include "Main/Includes.hpp"
#include "Expressions/StringExpr.hpp"

class StringTable {
public:
    StringTable() {}

    std::string StoreString(std::string);

    void emit();

    int id;

    std::map<std::string, std::string> stringTable;
};

#endif
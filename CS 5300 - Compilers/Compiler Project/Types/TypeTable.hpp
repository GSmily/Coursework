#ifndef TYPE_TABLE_HPP
#define TYPE_TABLE_HPP

#include "Main/Includes.hpp"
#include "Types/Type.hpp"

class TypeTable {
public:
    TypeTable() {};

    Type* LookUpType(std::string);
    void StoreType(std::string, Type*);

    std::map<std::string, Type*> typeTable;
};

#endif
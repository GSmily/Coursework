#include "TypeTable.hpp"

Type* TypeTable::LookUpType(std::string id) {
    auto iterator = typeTable.find(id);

    if (iterator != typeTable.end()) return typeTable[id];
    
    return nullptr;
}

void TypeTable::StoreType(std::string id, Type* type) {
    typeTable[id] = type;
}

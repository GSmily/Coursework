#include "Main/StringTable.hpp"

std::string StringTable::StoreString(std::string stringValue) {
    std::string id = "str_" + std::to_string(this->id++);
    stringTable[id] = stringValue;
    return id;
}

void StringTable::emit() {
    for ( auto i = stringTable.begin(); i != stringTable.end(); ++i) {
        std::cout << "\t" << i->first << ": .asciiz " << i->second << std::endl;
    }
}
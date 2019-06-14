#ifndef RECORD_LIST_HPP
#define RECORD_LIST_HPP

#include "Main/Includes.hpp"
#include "Types/Type.hpp"

class RecordList {
public:
    std::vector<std::pair<std::vector<std::string>, Type*>> recordList;
};

#endif
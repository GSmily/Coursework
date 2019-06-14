#include "Types/RecordType.hpp"

RecordType* BuildRecord(RecordList* recordList) {
    auto record = new RecordType();
    int offset = 0;

    for (auto pair : recordList->recordList) {
        for (auto id : pair.first) {
            record->recordMap[id] = std::make_pair(offset, pair.second);
            offset += pair.second->size();
        }
    }

    record->recordSize = offset;
    return record;
}

Symbol* GetRecord(Symbol* symbol, std::string id) {
    auto offset = symbol->offset;
    auto recordType = dynamic_cast<RecordType*>(symbol->type);
    offset = Add(offset, Number(recordType->recordMap[id].first));
    return new Symbol(symbol->id + "." + id, recordType->recordMap[id].second, offset);
}

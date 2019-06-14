#include "Registers.hpp"

std::vector<std::string> registerPool = {
    "$s7", "$s6", "$s5", "$s4", "$s3", "$s2", "$s1", "$s0",
    "$t9", "$t8", "$t7", "$t6", "$t5", "$t4", "$t3", "$t2", "$t1", "$t0"
};

std::string loadRegister() {
    auto r = registerPool[registerPool.size() - 1];
    registerPool.pop_back();
    return r;
}

void unloadRegister(std::string r) {
    registerPool.push_back(r);
}

#include "Statements/ProcedureCall.hpp"

void ProcedureCall::emit() {

    std::cout << "\tjal " << id << std::endl;

}
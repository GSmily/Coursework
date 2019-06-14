cmake_minimum_required(VERSION 3.7)
project(cpsl)

find_package(BISON)
find_package(FLEX)

bison_target(Parser Main/parser.y ${CMAKE_CURRENT_BINARY_DIR}/Main/parser.cpp)
flex_target(Scanner Main/scanner.l ${CMAKE_CURRENT_BINARY_DIR}/Main/scanner.cpp)
add_flex_bison_dependency(Scanner Parser)

include_directories(
    ${CMAKE_CURRENT_SOURCE_DIR}
    ${CMAKE_CURRENT_SOURCE_DIR}/Main
    ${CMAKE_CURRENT_SOURCE_DIR}/Expressions
    ${CMAKE_CURRENT_SOURCE_DIR}/Types
    ${CMAKE_CURRENT_SOURCE_DIR}/Statements
)

set(EXTRA_COMPILE_FLAGS "-g3 -std=c++14")

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${EXTRA_COMPILE_FLAGS}")
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS}")

set(main_sources
    Main/IdentList.hpp
    Main/Includes.hpp
    Main/Main.hpp
    Main/Main.cpp
    Main/MainExpressions.hpp
    Main/MainExpressions.cpp
    Main/MainStatements.hpp
    Main/MainStatements.cpp
    Main/Registers.hpp
    Main/Registers.cpp
    Main/StringTable.hpp
    Main/StringTable.cpp
    Main/Symbol.hpp
    Main/SymbolTable.hpp
    Main/SymbolTable.cpp
    ${BISON_Parser_OUTPUTS}
    ${FLEX_Scanner_OUTPUTS}
)
source_group("Cpsl" FILES ${compiler_sources})
set(cpsl_sources ${main_sources})

set(expression_sources
    Expressions/AddExpr.hpp
    Expressions/AddExpr.cpp
    Expressions/AndExpr.hpp
    Expressions/AndExpr.cpp
    Expressions/CharacterExpr.hpp
    Expressions/CharacterExpr.cpp
    Expressions/DivideExpr.hpp
    Expressions/DivideExpr.cpp
    Expressions/EqualToExpr.hpp
    Expressions/EqualToExpr.cpp
    Expressions/Expression.hpp
    Expressions/GreaterThanEqualToExpr.hpp
    Expressions/GreaterThanEqualToExpr.cpp
    Expressions/GreaterThanExpr.hpp
    Expressions/GreaterThanExpr.cpp
    Expressions/LessThanEqualToExpr.hpp
    Expressions/LessThanEqualToExpr.cpp
    Expressions/LessThanExpr.hpp
    Expressions/LessThanExpr.cpp
    Expressions/ModuloExpr.hpp
    Expressions/ModuloExpr.cpp
    Expressions/NegativeExpr.hpp
    Expressions/NegativeExpr.cpp
    Expressions/NotEqualToExpr.hpp
    Expressions/NotEqualToExpr.cpp
    Expressions/NotExpr.hpp
    Expressions/NotExpr.cpp
    Expressions/NumberExpr.hpp
    Expressions/NumberExpr.cpp
    Expressions/OrExpr.hpp
    Expressions/OrExpr.cpp
    Expressions/ProductExpr.hpp
    Expressions/ProductExpr.cpp
    Expressions/StringExpr.hpp
    Expressions/StringExpr.cpp
    Expressions/SubtractExpr.hpp
    Expressions/SubtractExpr.cpp
    Expressions/SymbolExpr.hpp
    Expressions/SymbolExpr.cpp
)
source_group("Cpsl/Expressions" FILES ${expression_sources})
list(APPEND cpsl_sources ${expression_sources})

set(type_sources
    Types/ArrayType.hpp
    Types/ArrayType.cpp
    Types/RecordType.hpp
    Types/RecordType.cpp
    Types/Type.hpp
    Types/TypeTable.hpp
    Types/TypeTable.cpp
)
source_group("Cpsl/Types" FILES ${type_sources})
list(APPEND cpsl_sources ${type_sources})

set(statement_sources
    Statements/AssignmentStatement.hpp
    Statements/AssignmentStatement.cpp
    Statements/ElseIfList.hpp
    Statements/ElseIfList.cpp
    Statements/ForStatement.hpp
    Statements/ForStatement.cpp
    Statements/IfStatement.hpp
    Statements/IfStatement.cpp
    Statements/ProcedureCall.hpp
    Statements/ProcedureCall.cpp
    Statements/ReadStatement.hpp
    Statements/ReadStatement.cpp
    Statements/RepeatStatement.hpp
    Statements/RepeatStatement.cpp
    Statements/Statement.hpp
    Statements/StatementList.hpp
    Statements/StatementList.cpp
    Statements/StopStatement.hpp
    Statements/StopStatement.cpp
    Statements/WhileStatement.hpp
    Statements/WhileStatement.cpp
    Statements/WriteStatement.hpp
    Statements/WriteStatement.cpp
)
source_group("Cpsl/Statements" FILES ${statement_sources})
list(APPEND cpsl_sources ${statement_sources})

add_executable(cpsl ${cpsl_sources})
target_link_libraries(cpsl ${FLEX_LIBRARIES} ${BISON_LIBRARIES})
target_include_directories(cpsl PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})

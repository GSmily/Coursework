#ifndef TYPE_HPP
#define TYPE_HPP

#include "Main/Includes.hpp"

class Type {
public:
    virtual int size() = 0;
    virtual std::string name() = 0;
    Type() = default;
    virtual ~Type() = default;
};

class IntType : public Type {
public:
    int size() { return 4; }
    std::string name() { return "integer"; }
};

class CharType : public Type {
public:
    int size() { return 4; }
    std::string name() { return "char"; }
};

class BoolType : public Type {
public:
    int size() { return 4; }
    std::string name() { return "boolean"; }
};

class StringType : public Type {
public:
    int size() { return 0; }
    std::string name() { return "string"; }
};

#endif
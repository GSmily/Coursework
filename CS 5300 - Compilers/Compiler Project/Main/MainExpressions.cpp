#include "Main/MainExpressions.hpp"

// Arithmetic
Expression* Add(Expression* left, Expression* right) {
    if (left->type() == "number" && right->type() == "number") {
        auto leftValue = dynamic_cast<NumberExpr*>(left)->value;
        auto rightValue = dynamic_cast<NumberExpr*>(right)->value;
        auto value = leftValue + rightValue;
        
        return new NumberExpr(value);
    }
    return new AddExpr(left, right);
}

Expression* Divide(Expression* left, Expression* right) {
    if (left->type() == "number" && right->type() == "number") {
        int leftValue = dynamic_cast<NumberExpr*>(left)->value;
        int rightValue = dynamic_cast<NumberExpr*>(right)->value;
        int value = leftValue / rightValue;

        return new NumberExpr(value);
    }
    return new DivideExpr(left, right);
}

Expression* Modulo(Expression* left, Expression* right) {
    if (left->type() == "number" && right->type() == "number") {
        int leftValue = dynamic_cast<NumberExpr*>(left)->value;
        int rightValue = dynamic_cast<NumberExpr*>(right)->value;
        int value = leftValue % rightValue;

        return new NumberExpr(value);
    }
    return new ModuloExpr(left, right);
}

Expression* Product(Expression* left, Expression* right) {
    if (left->type() == "number" && right->type() == "number") {
        int leftValue = dynamic_cast<NumberExpr*>(left)->value;
        int rightValue = dynamic_cast<NumberExpr*>(right)->value;
        int value = leftValue * rightValue;

        return new NumberExpr(value);
    }
    return new ProductExpr(left, right);
}

Expression* Subtract(Expression* left, Expression* right) {
    if (left->type() == "number" && right->type() == "number") {
        int leftValue = dynamic_cast<NumberExpr*>(left)->value;
        int rightValue = dynamic_cast<NumberExpr*>(right)->value;
        int value = leftValue - rightValue;

        return new NumberExpr(value);
    }

    return new SubtractExpr(left, right);
}

// Binary
Expression* And(Expression* left, Expression* right) { 
    return new AndExpr(left, right);
}

Expression* EqualTo(Expression* left, Expression* right) { 
    return new EqualToExpr(left, right);
}

Expression* GreaterThan(Expression* left, Expression* right) { 
    return new GreaterThanExpr(left, right);
}

Expression* GreaterThanEqualTo(Expression* left, Expression* right) { 
    return new GreaterThanEqualToExpr(left, right);
}

Expression* LessThan(Expression* left, Expression* right) { 
    return new LessThanExpr(left, right);
}

Expression* LessThanEqualTo(Expression* left, Expression* right) { 
    return new LessThanEqualToExpr(left, right);
}

Expression* NotEqualTo(Expression* left, Expression* right) { 
    return new NotEqualToExpr(left, right);
}

Expression* Or(Expression* left, Expression* right) { 
    return new OrExpr(left, right);
}

// Unary
Expression* Chr(Expression* expr) {
    return expr;
}

Expression* Negative(Expression* expr) {
    if (expr->type() == "number") {
        int value = -1 * dynamic_cast<NumberExpr*>(expr)->value;
        return new NumberExpr(value);
    }
    return new NegativeExpr(expr);
}

Expression* Not(Expression* value) {
    return new NotExpr(value);
}

Expression* Ord(Expression* expr) {
    return expr;
}

Expression* Pred(Expression* expr) {
    Expression* newExpr;
    if (expr->type() == "boolean") newExpr = new NotExpr(expr);
    else newExpr = new SubtractExpr(expr, new NumberExpr(1));

    return newExpr;
}

Expression* Succ(Expression* expr) {
    Expression* newExpr;
    if (expr->type() == "boolean") newExpr = new NotExpr(expr);
    else newExpr = new AddExpr(expr, new NumberExpr(1));

    return newExpr;
}

// Constants
Expression* Char(char c) {
    return new CharacterExpr(c);
}

Expression* Number(int n) {
    return new NumberExpr(n);
}

Expression* String(std::string s) {
    return new StringExpr(s);
}

// LValue
Expression* BuildSymbolExpression(Symbol* symbol) { 
    if (symbol->type->name() == "integer" && symbol->constant) {
        return Number(symbol->value);
    }
    return new SymbolExpr(symbol);
}

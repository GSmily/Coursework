%code requires {
  #ifndef __TYPES_HPP_INCLUDED__
  #define __TYPES_HPP_INCLUDED__
  extern int yylex();
  void yyerror(const char*);

  #include "Main/IdentList.hpp"
  #include "Main/MainExpressions.hpp"
  #include "Main/MainStatements.hpp"
  #include "Main/StringTable.hpp"
  #include "Main/Symbol.hpp"
  #include "Main/SymbolTable.hpp"
  #include "Expressions/Expression.hpp"
  #include "Types/ArrayType.hpp"
  #include "Types/RecordType.hpp"
  #include "Types/Type.hpp"
  #include "Types/TypeTable.hpp"
  #include "Statements/ElseIfList.hpp"
  #include "Statements/ReadStatement.hpp"
  #include "Statements/Statement.hpp"
  #include "Statements/StatementList.hpp"
  #include "Statements/WriteStatement.hpp"

  extern StringTable* stringTable;
  extern TypeTable* typeTable;

  #endif
}

%union {
    int val;
    char* id;
    char char_id;

    Expression* expr; // Expressions
    Statement* statement; // Statements
    Symbol* symbol; // Variable
    Type* type; // Type

    ElseIfList* elseIfList;
    IdentList* identList;
    RecordList* recordList;
    StatementList* statementList;

}

// Tokens
%token ARRAY_TOKEN
%token BEGIN_TOKEN
%token CHR_TOKEN
%token CONST_TOKEN
%token DO_TOKEN
%token DOWNTO_TOKEN
%token ELSE_TOKEN
%token ELSEIF_TOKEN
%token END_TOKEN
%token FOR_TOKEN
%token FORWARD_TOKEN
%token FUNCTION_TOKEN
%token IF_TOKEN
%token OF_TOKEN
%token ORD_TOKEN
%token PRED_TOKEN
%token PROCEDURE_TOKEN
%token READ_TOKEN
%token RECORD_TOKEN
%token REF_TOKEN
%token REPEAT_TOKEN
%token RETURN_TOKEN
%token STOP_TOKEN
%token SUCC_TOKEN
%token THEN_TOKEN
%token TO_TOKEN
%token TYPE_TOKEN
%token UNTIL_TOKEN
%token VAR_TOKEN
%token WHILE_TOKEN
%token WRITE_TOKEN
%token ID_TOKEN
%token ADD_TOKEN
%token SUBTRACT_TOKEN
%token PRODUCT_TOKEN
%token DIVIDE_TOKEN
%token AND_TOKEN
%token OR_TOKEN
%token NOT_TOKEN
%token EQUAL_TO_TOKEN
%token NOT_EQUAL_TO_TOKEN
%token LESS_THAN_TOKEN
%token LESS_THAN_EQUAL_TO_TOKEN
%token GREATER_THAN_TOKEN
%token GREATER_THAN_EQUAL_TO_TOKEN
%token PERIOD_TOKEN
%token COMMA_TOKEN
%token COLON_TOKEN
%token SEMICOLON_TOKEN
%token LEFT_PARENTHESES_TOKEN
%token RIGHT_PARENTHESES_TOKEN
%token LEFT_SQUARE_BRACKET_TOKEN
%token RIGHT_SQUARE_BRACKET_TOKEN
%token ASSIGNMENT_TOKEN
%token MODULO_TOKEN
%token NUMBER_TOKEN
%token CHARACTER_TOKEN
%token STRING_TOKEN
%token LINE_FEED_TOKEN
%token CARRIAGE_RETURN_TOKEN
%token BACKSPACE_TOKEN
%token TAB_TOKEN
%token FORM_FEED_TOKEN

// Expressions
%type <expr> Expression
%type <id> ID_TOKEN
%type <char_id> CHARACTER_TOKEN
%type <val> NUMBER_TOKEN
%type <id> STRING_TOKEN
%type <symbol> LValue

// Types
%type <identList> IdentList
%type <type> Type
%type <type> SimpleType
%type <type> RecordType
%type <recordList> RecordType2
%type <type> ArrayType

// Statements
%type <statement> Assignment
%type <statement> ForStatement
%type <statement> IfStatement
%type <statement> ProcedureCall
%type <statement> ReadStatement
%type <statement> ReadStatement2
%type <statement> RepeatStatement
%type <statement> Statement
%type <statement> StopStatement
%type <statement> WhileStatement
%type <statement> WriteStatement
%type <statement> WriteStatement2

%type <statementList> Block
%type <statementList> Body

// Lists
%type <elseIfList> ElseIfList
%type <statementList> ConstantDecl2
%type <statementList> ElseStatement
%type <statementList> StatementSequence

// Precedence
%left AND_TOKEN
%left OR_TOKEN
%right NOT_TOKEN
%nonassoc EQUAL_TO_TOKEN
%nonassoc NOT_EQUAL_TO_TOKEN
%nonassoc LESS_THAN_EQUAL_TO_TOKEN
%nonassoc GREATER_THAN_EQUAL_TO_TOKEN
%nonassoc LESS_THAN_TOKEN
%nonassoc GREATER_THAN_TOKEN
%left ADD_TOKEN
%left SUBTRACT_TOKEN
%left PRODUCT_TOKEN
%left DIVIDE_TOKEN
%left MODULO_TOKEN
%right NEG

%%
/* 3 Syntactic Structure */
Program : ProgramConstantDecl ProgramTypeDecl ProgramVarDecl Program2 Block PERIOD_TOKEN 
        { 
          std::cout << std::endl << "Main: " << std::endl;
          $5 -> emit(); 
        }
        ;

Program2 : Program2 ProcedureDecl
         | Program2 FunctionDecl
         |
         ;

/* 3.1.1 Constant Declaration */
ConstantDecl : CONST_TOKEN ConstantDecl2
                {
                  std::cout << "\nConstants:" << std::endl;
                  for (auto statement : $2->statements) statement->emit();
                  std::cout << "\tj Main" << std::endl;
                }
             ;

ProgramConstantDecl : ConstantDecl
                    | { std::cout << "\tj Main" << std::endl; }
                    ;

ConstantDecl2 : ConstantDecl2 ID_TOKEN EQUAL_TO_TOKEN Expression SEMICOLON_TOKEN { $1->statements.push_back(BuildConstant($2, $4)); $$ = $1; }
              | ID_TOKEN EQUAL_TO_TOKEN Expression SEMICOLON_TOKEN { $$ = new StatementList(); $$->statements.push_back(BuildConstant($1, $3)); }
              ;

/* 3.1.2 Procedure and Function Declarations */
ProcedureDecl : PROCEDURE_TOKEN ID_TOKEN LEFT_PARENTHESES_TOKEN FormalParameters RIGHT_PARENTHESES_TOKEN SEMICOLON_TOKEN FORWARD_TOKEN SEMICOLON_TOKEN { exit(0); }
              | PROCEDURE_TOKEN ID_TOKEN LEFT_PARENTHESES_TOKEN FormalParameters RIGHT_PARENTHESES_TOKEN SEMICOLON_TOKEN Body SEMICOLON_TOKEN
              { 
                std::cout << std::endl << $2 << ":" << std::endl;
                $7->emit(); 
                std::cout << "\tjr $ra" << std::endl;
              }
              ;

FunctionDecl : FUNCTION_TOKEN ID_TOKEN LEFT_PARENTHESES_TOKEN FormalParameters RIGHT_PARENTHESES_TOKEN COLON_TOKEN Type SEMICOLON_TOKEN FORWARD_TOKEN SEMICOLON_TOKEN
                { 
                  std::cout << "\nMain:" << std::endl;
                  exit(0);
                }
             | FUNCTION_TOKEN ID_TOKEN LEFT_PARENTHESES_TOKEN FormalParameters RIGHT_PARENTHESES_TOKEN COLON_TOKEN Type SEMICOLON_TOKEN Body SEMICOLON_TOKEN
                { 
                  std::cout << "\nMain:" << std::endl;
                  exit(0);
                }
             ;

FormalParameters : VAR_TOKEN IdentList COLON_TOKEN Type FormalParameters2 
                    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
                 | REF_TOKEN IdentList COLON_TOKEN Type FormalParameters2
                    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
                 | IdentList COLON_TOKEN Type FormalParameters2
                    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
                 | VAR_TOKEN IdentList COLON_TOKEN Type
                    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
                 | REF_TOKEN IdentList COLON_TOKEN Type
                    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
                 | IdentList COLON_TOKEN Type
                    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
                 |
                 ;

FormalParameters2 : SEMICOLON_TOKEN VAR_TOKEN IdentList COLON_TOKEN Type
                      | SEMICOLON_TOKEN REF_TOKEN IdentList COLON_TOKEN Type
                      | SEMICOLON_TOKEN IdentList COLON_TOKEN Type
                      | FormalParameters2 SEMICOLON_TOKEN VAR_TOKEN IdentList COLON_TOKEN Type
                      | FormalParameters2 SEMICOLON_TOKEN REF_TOKEN IdentList COLON_TOKEN Type
                      | FormalParameters2 SEMICOLON_TOKEN IdentList COLON_TOKEN Type
                      ;

Body : ProgramConstantDecl ProgramTypeDecl ProgramVarDecl Block { $$ = $4; }
     ;

Block : BEGIN_TOKEN StatementSequence END_TOKEN { $$ = $2; }
      ;

/* 3.1.3 Type Declarations */
TypeDecl : TYPE_TOKEN TypeDecl2
         ;

ProgramTypeDecl : TypeDecl
            |
            ;

TypeDecl2 : TypeDecl2 ID_TOKEN EQUAL_TO_TOKEN Type SEMICOLON_TOKEN { typeTable->StoreType($2, $4); }
              | ID_TOKEN EQUAL_TO_TOKEN Type SEMICOLON_TOKEN { typeTable->StoreType($1, $3); }
              ;

Type : SimpleType { $$ = $1; }
     | RecordType { $$ = $1; }
     | ArrayType { $$ = $1; }
     ;

SimpleType : ID_TOKEN { $$ = typeTable->LookUpType($1); }
           ;

RecordType : RECORD_TOKEN RecordType2 END_TOKEN { $$ = BuildRecord($2); }
           ;

RecordType2 : RecordType2 IdentList COLON_TOKEN Type SEMICOLON_TOKEN { $$ = $1; $$->recordList.push_back(std::make_pair($2->list, $4)); }
                | IdentList COLON_TOKEN Type SEMICOLON_TOKEN { $$ = new RecordList(); $$->recordList.push_back(std::make_pair($1->list, $3)); }
                ;

ArrayType : ARRAY_TOKEN LEFT_SQUARE_BRACKET_TOKEN Expression COLON_TOKEN Expression RIGHT_SQUARE_BRACKET_TOKEN OF_TOKEN Type { $$ = BuildArray($3, $5, $8); }
          ;

IdentList : IdentList COMMA_TOKEN ID_TOKEN { $$ = $1; $$->list.push_back($3); }
          | ID_TOKEN { $$ = new IdentList(); $$->list.push_back($1); }
          ;

/* 3.1.4 Variable Declarations */
VarDecl : VAR_TOKEN VarDecl2;

ProgramVarDecl : VarDecl
           |
           ;

VarDecl2 : VarDecl2 IdentList COLON_TOKEN Type SEMICOLON_TOKEN { StoreSymbols($2, $4); }
             | IdentList COLON_TOKEN Type SEMICOLON_TOKEN { StoreSymbols($1, $3); }
             ;

/*3.2 CPSL Statements */
StatementSequence : StatementSequence SEMICOLON_TOKEN Statement { $$ = $1; $$->AddToStatementList($3); }
                  | Statement { $$ = new StatementList(); $$->AddToStatementList($1); }
                  ;

Statement : Assignment { $$ = $1; }
          | IfStatement { $$ = $1; }
          | WhileStatement { $$ = $1; }
          | RepeatStatement { $$ = $1; }
          | ForStatement { $$ = $1; }
          | StopStatement { $$ = $1; }
          | ReturnStatement
            { 
              std::cout << "\nMain:" << std::endl;
              exit(0);
            }
          | ReadStatement { $$ = $1;}
          | WriteStatement { $$ = $1; }
          | ProcedureCall { $$ = $1; }
          | { $$ = nullptr; }
          ;

Assignment : LValue ASSIGNMENT_TOKEN Expression { $$ = Assignment($1, $3); }
           ;

IfStatement : IF_TOKEN Expression THEN_TOKEN StatementSequence ElseIfList ElseStatement END_TOKEN { $$ = If($2, $4, $5, $6); }
            ;

ElseIfList : ElseIfList ELSEIF_TOKEN Expression THEN_TOKEN StatementSequence { $$ = $1; $$->AddToElseIfList($3, $5); }
           | { $$ = new ElseIfList(); }
           ;

ElseStatement : ELSE_TOKEN StatementSequence { $$ = $2; }
             | { $$ = new StatementList(); }
             ;

WhileStatement : WHILE_TOKEN Expression DO_TOKEN StatementSequence END_TOKEN { $$ = While($2, $4); }
               ;

RepeatStatement : REPEAT_TOKEN StatementSequence UNTIL_TOKEN Expression { $$ = Repeat($2, $4); }
                ;

ForStatement : FOR_TOKEN ID_TOKEN ASSIGNMENT_TOKEN Expression TO_TOKEN Expression DO_TOKEN StatementSequence END_TOKEN {
                  auto symbol = LookUpSymbol($2);
                  $$ = For(BuildSymbolExpression(symbol), Assignment(symbol, $4), $6, $8, "to");
               }
             | FOR_TOKEN ID_TOKEN ASSIGNMENT_TOKEN Expression DOWNTO_TOKEN Expression DO_TOKEN StatementSequence END_TOKEN {
                  auto symbol = LookUpSymbol($2);
                  $$ = For(BuildSymbolExpression(symbol), Assignment(symbol, $4), $6, $8, "down");
               }
             ;

StopStatement : STOP_TOKEN { $$ = Stop(); }
              ;

ReturnStatement : RETURN_TOKEN
                | RETURN_TOKEN Expression
                ;

ReadStatement : READ_TOKEN LEFT_PARENTHESES_TOKEN ReadStatement2 RIGHT_PARENTHESES_TOKEN { $$ = $3; }
              ;

ReadStatement2 : ReadStatement2 COMMA_TOKEN LValue { dynamic_cast<ReadStatement*>($1)->ReadAddSymbol($3); }
               | LValue { $$ = Read($1); }
               ;

WriteStatement : WRITE_TOKEN LEFT_PARENTHESES_TOKEN WriteStatement2 RIGHT_PARENTHESES_TOKEN { $$ = $3; }
               ;

WriteStatement2 : WriteStatement2 COMMA_TOKEN Expression { dynamic_cast<WriteStatement*>($1)->WriteAddExpression($3); }
                | Expression { $$ = Write($1); }
                ;

ProcedureCall : ID_TOKEN LEFT_PARENTHESES_TOKEN RIGHT_PARENTHESES_TOKEN { $$ = Procedure($1); }
              | ID_TOKEN LEFT_PARENTHESES_TOKEN ProcedureCall2 RIGHT_PARENTHESES_TOKEN 
                { 
                  std::cout << "\nMain:" << std::endl;
                  exit(0);
                }
              ;

ProcedureCall2 : ProcedureCall2 COMMA_TOKEN Expression
               | Expression
               ;

/* 3.3 Expressions */
Expression : Expression ADD_TOKEN Expression { $$ = Add($1, $3); }
           | Expression DIVIDE_TOKEN Expression { $$ = Divide($1, $3); }
           | Expression MODULO_TOKEN Expression { $$ = Modulo($1, $3); }
           | Expression PRODUCT_TOKEN Expression { $$ = Product($1, $3); }
           | Expression SUBTRACT_TOKEN Expression { $$ = Subtract($1, $3); }
           | Expression AND_TOKEN Expression { $$ = And($1, $3); }
           | Expression EQUAL_TO_TOKEN Expression { $$ = EqualTo($1, $3); }
           | Expression GREATER_THAN_TOKEN Expression { $$ = GreaterThan($1, $3); }
           | Expression GREATER_THAN_EQUAL_TO_TOKEN Expression { $$ = GreaterThanEqualTo($1, $3); }
           | Expression LESS_THAN_TOKEN Expression { $$ = LessThan($1, $3); }
           | Expression LESS_THAN_EQUAL_TO_TOKEN Expression { $$ = LessThanEqualTo($1, $3); }
           | Expression NOT_EQUAL_TO_TOKEN Expression { $$ = NotEqualTo($1, $3); }
           | Expression OR_TOKEN Expression { $$ = Or($1, $3); }
           | CHR_TOKEN LEFT_PARENTHESES_TOKEN Expression RIGHT_PARENTHESES_TOKEN { $$ = Chr($3); }
           | SUBTRACT_TOKEN Expression %prec NEG { $$ = Negative($2); }
           | NOT_TOKEN Expression { $$ = Not($2); }
           | ORD_TOKEN LEFT_PARENTHESES_TOKEN Expression RIGHT_PARENTHESES_TOKEN { $$ = Ord($3); }
           | PRED_TOKEN LEFT_PARENTHESES_TOKEN Expression RIGHT_PARENTHESES_TOKEN { $$ = Pred($3); }
           | SUCC_TOKEN LEFT_PARENTHESES_TOKEN Expression RIGHT_PARENTHESES_TOKEN { $$ = Succ($3); }
           | LEFT_PARENTHESES_TOKEN Expression RIGHT_PARENTHESES_TOKEN { $$ = $2; }
           | CHARACTER_TOKEN { $$ = Char($1); }
           | NUMBER_TOKEN { $$ = Number($1); }
           | STRING_TOKEN { $$ = String(stringTable->StoreString($1)); }
           | ProcedureCall { }
           | LValue { $$ = BuildSymbolExpression($1); }
           ;

LValue : ID_TOKEN { 
          $$ = LookUpSymbol($1); 
          if (!$$) {
            StoreSymbol($1, typeTable->LookUpType("integer"));
            $$ = LookUpSymbol($1);
          }
          free $1;
        }
       | LValue PERIOD_TOKEN ID_TOKEN { $$ = GetRecord($1, $3); }
       | LValue LEFT_SQUARE_BRACKET_TOKEN Expression RIGHT_SQUARE_BRACKET_TOKEN { $$ = GetArray($1, $3); }
       ;

%%
void yyerror(const char* msg)
{
  std::cerr << msg << std::endl;
}

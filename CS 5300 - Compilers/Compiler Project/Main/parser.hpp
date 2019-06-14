/* A Bison parser, made by GNU Bison 3.0.4.  */

/* Bison interface for Yacc-like parsers in C

   Copyright (C) 1984, 1989-1990, 2000-2015 Free Software Foundation, Inc.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.  */

/* As a special exception, you may create a larger work that contains
   part or all of the Bison parser skeleton and distribute that work
   under terms of your choice, so long as that work isn't itself a
   parser generator using the skeleton or a modified version thereof
   as a parser skeleton.  Alternatively, if you modify or redistribute
   the parser skeleton itself, you may (at your option) remove this
   special exception, which will cause the skeleton and the resulting
   Bison output files to be licensed under the GNU General Public
   License without this special exception.

   This special exception was added by the Free Software Foundation in
   version 2.2 of Bison.  */

#ifndef YY_YY_MNT_B_PERSONAL_COLLEGE_CS_5300_COMPILERS_COMPILER_MAIN_PARSER_HPP_INCLUDED
# define YY_YY_MNT_B_PERSONAL_COLLEGE_CS_5300_COMPILERS_COMPILER_MAIN_PARSER_HPP_INCLUDED
/* Debug traces.  */
#ifndef YYDEBUG
# define YYDEBUG 0
#endif
#if YYDEBUG
extern int yydebug;
#endif
/* "%code requires" blocks.  */
#line 1 "Main/parser.y" /* yacc.c:1909  */

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

#line 73 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.hpp" /* yacc.c:1909  */

/* Token type.  */
#ifndef YYTOKENTYPE
# define YYTOKENTYPE
  enum yytokentype
  {
    ARRAY_TOKEN = 258,
    BEGIN_TOKEN = 259,
    CHR_TOKEN = 260,
    CONST_TOKEN = 261,
    DO_TOKEN = 262,
    DOWNTO_TOKEN = 263,
    ELSE_TOKEN = 264,
    ELSEIF_TOKEN = 265,
    END_TOKEN = 266,
    FOR_TOKEN = 267,
    FORWARD_TOKEN = 268,
    FUNCTION_TOKEN = 269,
    IF_TOKEN = 270,
    OF_TOKEN = 271,
    ORD_TOKEN = 272,
    PRED_TOKEN = 273,
    PROCEDURE_TOKEN = 274,
    READ_TOKEN = 275,
    RECORD_TOKEN = 276,
    REF_TOKEN = 277,
    REPEAT_TOKEN = 278,
    RETURN_TOKEN = 279,
    STOP_TOKEN = 280,
    SUCC_TOKEN = 281,
    THEN_TOKEN = 282,
    TO_TOKEN = 283,
    TYPE_TOKEN = 284,
    UNTIL_TOKEN = 285,
    VAR_TOKEN = 286,
    WHILE_TOKEN = 287,
    WRITE_TOKEN = 288,
    ID_TOKEN = 289,
    ADD_TOKEN = 290,
    SUBTRACT_TOKEN = 291,
    PRODUCT_TOKEN = 292,
    DIVIDE_TOKEN = 293,
    AND_TOKEN = 294,
    OR_TOKEN = 295,
    NOT_TOKEN = 296,
    EQUAL_TO_TOKEN = 297,
    NOT_EQUAL_TO_TOKEN = 298,
    LESS_THAN_TOKEN = 299,
    LESS_THAN_EQUAL_TO_TOKEN = 300,
    GREATER_THAN_TOKEN = 301,
    GREATER_THAN_EQUAL_TO_TOKEN = 302,
    PERIOD_TOKEN = 303,
    COMMA_TOKEN = 304,
    COLON_TOKEN = 305,
    SEMICOLON_TOKEN = 306,
    LEFT_PARENTHESES_TOKEN = 307,
    RIGHT_PARENTHESES_TOKEN = 308,
    LEFT_SQUARE_BRACKET_TOKEN = 309,
    RIGHT_SQUARE_BRACKET_TOKEN = 310,
    ASSIGNMENT_TOKEN = 311,
    MODULO_TOKEN = 312,
    NUMBER_TOKEN = 313,
    CHARACTER_TOKEN = 314,
    STRING_TOKEN = 315,
    LINE_FEED_TOKEN = 316,
    CARRIAGE_RETURN_TOKEN = 317,
    BACKSPACE_TOKEN = 318,
    TAB_TOKEN = 319,
    FORM_FEED_TOKEN = 320,
    NEG = 321
  };
#endif

/* Value type.  */
#if ! defined YYSTYPE && ! defined YYSTYPE_IS_DECLARED

union YYSTYPE
{
#line 30 "Main/parser.y" /* yacc.c:1909  */

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


#line 169 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.hpp" /* yacc.c:1909  */
};

typedef union YYSTYPE YYSTYPE;
# define YYSTYPE_IS_TRIVIAL 1
# define YYSTYPE_IS_DECLARED 1
#endif


extern YYSTYPE yylval;

int yyparse (void);

#endif /* !YY_YY_MNT_B_PERSONAL_COLLEGE_CS_5300_COMPILERS_COMPILER_MAIN_PARSER_HPP_INCLUDED  */

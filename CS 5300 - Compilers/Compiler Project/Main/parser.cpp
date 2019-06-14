/* A Bison parser, made by GNU Bison 3.0.4.  */

/* Bison implementation for Yacc-like parsers in C

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

/* C LALR(1) parser skeleton written by Richard Stallman, by
   simplifying the original so-called "semantic" parser.  */

/* All symbols defined below should begin with yy or YY, to avoid
   infringing on user name space.  This should be done even for local
   variables, as they might otherwise be expanded by user macros.
   There are some unavoidable exceptions within include files to
   define necessary library symbols; they are noted "INFRINGES ON
   USER NAME SPACE" below.  */

/* Identify Bison output.  */
#define YYBISON 1

/* Bison version.  */
#define YYBISON_VERSION "3.0.4"

/* Skeleton name.  */
#define YYSKELETON_NAME "yacc.c"

/* Pure parsers.  */
#define YYPURE 0

/* Push parsers.  */
#define YYPUSH 0

/* Pull parsers.  */
#define YYPULL 1




/* Copy the first part of user declarations.  */

#line 67 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:339  */

# ifndef YY_NULLPTR
#  if defined __cplusplus && 201103L <= __cplusplus
#   define YY_NULLPTR nullptr
#  else
#   define YY_NULLPTR 0
#  endif
# endif

/* Enabling verbose error messages.  */
#ifdef YYERROR_VERBOSE
# undef YYERROR_VERBOSE
# define YYERROR_VERBOSE 1
#else
# define YYERROR_VERBOSE 0
#endif

/* In a future release of Bison, this section will be replaced
   by #include "parser.hpp".  */
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
#line 1 "Main/parser.y" /* yacc.c:355  */

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

#line 126 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:355  */

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
#line 30 "Main/parser.y" /* yacc.c:355  */

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


#line 222 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:355  */
};

typedef union YYSTYPE YYSTYPE;
# define YYSTYPE_IS_TRIVIAL 1
# define YYSTYPE_IS_DECLARED 1
#endif


extern YYSTYPE yylval;

int yyparse (void);

#endif /* !YY_YY_MNT_B_PERSONAL_COLLEGE_CS_5300_COMPILERS_COMPILER_MAIN_PARSER_HPP_INCLUDED  */

/* Copy the second part of user declarations.  */

#line 239 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:358  */

#ifdef short
# undef short
#endif

#ifdef YYTYPE_UINT8
typedef YYTYPE_UINT8 yytype_uint8;
#else
typedef unsigned char yytype_uint8;
#endif

#ifdef YYTYPE_INT8
typedef YYTYPE_INT8 yytype_int8;
#else
typedef signed char yytype_int8;
#endif

#ifdef YYTYPE_UINT16
typedef YYTYPE_UINT16 yytype_uint16;
#else
typedef unsigned short int yytype_uint16;
#endif

#ifdef YYTYPE_INT16
typedef YYTYPE_INT16 yytype_int16;
#else
typedef short int yytype_int16;
#endif

#ifndef YYSIZE_T
# ifdef __SIZE_TYPE__
#  define YYSIZE_T __SIZE_TYPE__
# elif defined size_t
#  define YYSIZE_T size_t
# elif ! defined YYSIZE_T
#  include <stddef.h> /* INFRINGES ON USER NAME SPACE */
#  define YYSIZE_T size_t
# else
#  define YYSIZE_T unsigned int
# endif
#endif

#define YYSIZE_MAXIMUM ((YYSIZE_T) -1)

#ifndef YY_
# if defined YYENABLE_NLS && YYENABLE_NLS
#  if ENABLE_NLS
#   include <libintl.h> /* INFRINGES ON USER NAME SPACE */
#   define YY_(Msgid) dgettext ("bison-runtime", Msgid)
#  endif
# endif
# ifndef YY_
#  define YY_(Msgid) Msgid
# endif
#endif

#ifndef YY_ATTRIBUTE
# if (defined __GNUC__                                               \
      && (2 < __GNUC__ || (__GNUC__ == 2 && 96 <= __GNUC_MINOR__)))  \
     || defined __SUNPRO_C && 0x5110 <= __SUNPRO_C
#  define YY_ATTRIBUTE(Spec) __attribute__(Spec)
# else
#  define YY_ATTRIBUTE(Spec) /* empty */
# endif
#endif

#ifndef YY_ATTRIBUTE_PURE
# define YY_ATTRIBUTE_PURE   YY_ATTRIBUTE ((__pure__))
#endif

#ifndef YY_ATTRIBUTE_UNUSED
# define YY_ATTRIBUTE_UNUSED YY_ATTRIBUTE ((__unused__))
#endif

#if !defined _Noreturn \
     && (!defined __STDC_VERSION__ || __STDC_VERSION__ < 201112)
# if defined _MSC_VER && 1200 <= _MSC_VER
#  define _Noreturn __declspec (noreturn)
# else
#  define _Noreturn YY_ATTRIBUTE ((__noreturn__))
# endif
#endif

/* Suppress unused-variable warnings by "using" E.  */
#if ! defined lint || defined __GNUC__
# define YYUSE(E) ((void) (E))
#else
# define YYUSE(E) /* empty */
#endif

#if defined __GNUC__ && 407 <= __GNUC__ * 100 + __GNUC_MINOR__
/* Suppress an incorrect diagnostic about yylval being uninitialized.  */
# define YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN \
    _Pragma ("GCC diagnostic push") \
    _Pragma ("GCC diagnostic ignored \"-Wuninitialized\"")\
    _Pragma ("GCC diagnostic ignored \"-Wmaybe-uninitialized\"")
# define YY_IGNORE_MAYBE_UNINITIALIZED_END \
    _Pragma ("GCC diagnostic pop")
#else
# define YY_INITIAL_VALUE(Value) Value
#endif
#ifndef YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
# define YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
# define YY_IGNORE_MAYBE_UNINITIALIZED_END
#endif
#ifndef YY_INITIAL_VALUE
# define YY_INITIAL_VALUE(Value) /* Nothing. */
#endif


#if ! defined yyoverflow || YYERROR_VERBOSE

/* The parser invokes alloca or malloc; define the necessary symbols.  */

# ifdef YYSTACK_USE_ALLOCA
#  if YYSTACK_USE_ALLOCA
#   ifdef __GNUC__
#    define YYSTACK_ALLOC __builtin_alloca
#   elif defined __BUILTIN_VA_ARG_INCR
#    include <alloca.h> /* INFRINGES ON USER NAME SPACE */
#   elif defined _AIX
#    define YYSTACK_ALLOC __alloca
#   elif defined _MSC_VER
#    include <malloc.h> /* INFRINGES ON USER NAME SPACE */
#    define alloca _alloca
#   else
#    define YYSTACK_ALLOC alloca
#    if ! defined _ALLOCA_H && ! defined EXIT_SUCCESS
#     include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
      /* Use EXIT_SUCCESS as a witness for stdlib.h.  */
#     ifndef EXIT_SUCCESS
#      define EXIT_SUCCESS 0
#     endif
#    endif
#   endif
#  endif
# endif

# ifdef YYSTACK_ALLOC
   /* Pacify GCC's 'empty if-body' warning.  */
#  define YYSTACK_FREE(Ptr) do { /* empty */; } while (0)
#  ifndef YYSTACK_ALLOC_MAXIMUM
    /* The OS might guarantee only one guard page at the bottom of the stack,
       and a page size can be as small as 4096 bytes.  So we cannot safely
       invoke alloca (N) if N exceeds 4096.  Use a slightly smaller number
       to allow for a few compiler-allocated temporary stack slots.  */
#   define YYSTACK_ALLOC_MAXIMUM 4032 /* reasonable circa 2006 */
#  endif
# else
#  define YYSTACK_ALLOC YYMALLOC
#  define YYSTACK_FREE YYFREE
#  ifndef YYSTACK_ALLOC_MAXIMUM
#   define YYSTACK_ALLOC_MAXIMUM YYSIZE_MAXIMUM
#  endif
#  if (defined __cplusplus && ! defined EXIT_SUCCESS \
       && ! ((defined YYMALLOC || defined malloc) \
             && (defined YYFREE || defined free)))
#   include <stdlib.h> /* INFRINGES ON USER NAME SPACE */
#   ifndef EXIT_SUCCESS
#    define EXIT_SUCCESS 0
#   endif
#  endif
#  ifndef YYMALLOC
#   define YYMALLOC malloc
#   if ! defined malloc && ! defined EXIT_SUCCESS
void *malloc (YYSIZE_T); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
#  ifndef YYFREE
#   define YYFREE free
#   if ! defined free && ! defined EXIT_SUCCESS
void free (void *); /* INFRINGES ON USER NAME SPACE */
#   endif
#  endif
# endif
#endif /* ! defined yyoverflow || YYERROR_VERBOSE */


#if (! defined yyoverflow \
     && (! defined __cplusplus \
         || (defined YYSTYPE_IS_TRIVIAL && YYSTYPE_IS_TRIVIAL)))

/* A type that is properly aligned for any stack member.  */
union yyalloc
{
  yytype_int16 yyss_alloc;
  YYSTYPE yyvs_alloc;
};

/* The size of the maximum gap between one aligned stack and the next.  */
# define YYSTACK_GAP_MAXIMUM (sizeof (union yyalloc) - 1)

/* The size of an array large to enough to hold all stacks, each with
   N elements.  */
# define YYSTACK_BYTES(N) \
     ((N) * (sizeof (yytype_int16) + sizeof (YYSTYPE)) \
      + YYSTACK_GAP_MAXIMUM)

# define YYCOPY_NEEDED 1

/* Relocate STACK from its old location to the new one.  The
   local variables YYSIZE and YYSTACKSIZE give the old and new number of
   elements in the stack, and YYPTR gives the new location of the
   stack.  Advance YYPTR to a properly aligned location for the next
   stack.  */
# define YYSTACK_RELOCATE(Stack_alloc, Stack)                           \
    do                                                                  \
      {                                                                 \
        YYSIZE_T yynewbytes;                                            \
        YYCOPY (&yyptr->Stack_alloc, Stack, yysize);                    \
        Stack = &yyptr->Stack_alloc;                                    \
        yynewbytes = yystacksize * sizeof (*Stack) + YYSTACK_GAP_MAXIMUM; \
        yyptr += yynewbytes / sizeof (*yyptr);                          \
      }                                                                 \
    while (0)

#endif

#if defined YYCOPY_NEEDED && YYCOPY_NEEDED
/* Copy COUNT objects from SRC to DST.  The source and destination do
   not overlap.  */
# ifndef YYCOPY
#  if defined __GNUC__ && 1 < __GNUC__
#   define YYCOPY(Dst, Src, Count) \
      __builtin_memcpy (Dst, Src, (Count) * sizeof (*(Src)))
#  else
#   define YYCOPY(Dst, Src, Count)              \
      do                                        \
        {                                       \
          YYSIZE_T yyi;                         \
          for (yyi = 0; yyi < (Count); yyi++)   \
            (Dst)[yyi] = (Src)[yyi];            \
        }                                       \
      while (0)
#  endif
# endif
#endif /* !YYCOPY_NEEDED */

/* YYFINAL -- State number of the termination state.  */
#define YYFINAL  7
/* YYLAST -- Last index in YYTABLE.  */
#define YYLAST   707

/* YYNTOKENS -- Number of terminals.  */
#define YYNTOKENS  67
/* YYNNTS -- Number of nonterminals.  */
#define YYNNTS  43
/* YYNRULES -- Number of rules.  */
#define YYNRULES  113
/* YYNSTATES -- Number of states.  */
#define YYNSTATES  274

/* YYTRANSLATE[YYX] -- Symbol number corresponding to YYX as returned
   by yylex, with out-of-bounds checking.  */
#define YYUNDEFTOK  2
#define YYMAXUTOK   321

#define YYTRANSLATE(YYX)                                                \
  ((unsigned int) (YYX) <= YYMAXUTOK ? yytranslate[YYX] : YYUNDEFTOK)

/* YYTRANSLATE[TOKEN-NUM] -- Symbol number corresponding to TOKEN-NUM
   as returned by yylex, without out-of-bounds checking.  */
static const yytype_uint8 yytranslate[] =
{
       0,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     2,     2,     2,     2,
       2,     2,     2,     2,     2,     2,     1,     2,     3,     4,
       5,     6,     7,     8,     9,    10,    11,    12,    13,    14,
      15,    16,    17,    18,    19,    20,    21,    22,    23,    24,
      25,    26,    27,    28,    29,    30,    31,    32,    33,    34,
      35,    36,    37,    38,    39,    40,    41,    42,    43,    44,
      45,    46,    47,    48,    49,    50,    51,    52,    53,    54,
      55,    56,    57,    58,    59,    60,    61,    62,    63,    64,
      65,    66
};

#if YYDEBUG
  /* YYRLINE[YYN] -- Source line where rule number YYN was defined.  */
static const yytype_uint16 yyrline[] =
{
       0,   170,   170,   177,   178,   179,   183,   191,   192,   195,
     196,   200,   201,   209,   214,   221,   226,   231,   236,   241,
     246,   251,   254,   255,   256,   257,   258,   259,   262,   265,
     269,   272,   273,   276,   277,   280,   281,   282,   285,   288,
     291,   292,   295,   298,   299,   303,   305,   306,   309,   310,
     314,   315,   318,   319,   320,   321,   322,   323,   324,   329,
     330,   331,   332,   335,   338,   341,   342,   345,   346,   349,
     352,   355,   359,   365,   368,   369,   372,   375,   376,   379,
     382,   383,   386,   387,   394,   395,   399,   400,   401,   402,
     403,   404,   405,   406,   407,   408,   409,   410,   411,   412,
     413,   414,   415,   416,   417,   418,   419,   420,   421,   422,
     423,   426,   434,   435
};
#endif

#if YYDEBUG || YYERROR_VERBOSE || 0
/* YYTNAME[SYMBOL-NUM] -- String name of the symbol SYMBOL-NUM.
   First, the terminals, then, starting at YYNTOKENS, nonterminals.  */
static const char *const yytname[] =
{
  "$end", "error", "$undefined", "ARRAY_TOKEN", "BEGIN_TOKEN",
  "CHR_TOKEN", "CONST_TOKEN", "DO_TOKEN", "DOWNTO_TOKEN", "ELSE_TOKEN",
  "ELSEIF_TOKEN", "END_TOKEN", "FOR_TOKEN", "FORWARD_TOKEN",
  "FUNCTION_TOKEN", "IF_TOKEN", "OF_TOKEN", "ORD_TOKEN", "PRED_TOKEN",
  "PROCEDURE_TOKEN", "READ_TOKEN", "RECORD_TOKEN", "REF_TOKEN",
  "REPEAT_TOKEN", "RETURN_TOKEN", "STOP_TOKEN", "SUCC_TOKEN", "THEN_TOKEN",
  "TO_TOKEN", "TYPE_TOKEN", "UNTIL_TOKEN", "VAR_TOKEN", "WHILE_TOKEN",
  "WRITE_TOKEN", "ID_TOKEN", "ADD_TOKEN", "SUBTRACT_TOKEN",
  "PRODUCT_TOKEN", "DIVIDE_TOKEN", "AND_TOKEN", "OR_TOKEN", "NOT_TOKEN",
  "EQUAL_TO_TOKEN", "NOT_EQUAL_TO_TOKEN", "LESS_THAN_TOKEN",
  "LESS_THAN_EQUAL_TO_TOKEN", "GREATER_THAN_TOKEN",
  "GREATER_THAN_EQUAL_TO_TOKEN", "PERIOD_TOKEN", "COMMA_TOKEN",
  "COLON_TOKEN", "SEMICOLON_TOKEN", "LEFT_PARENTHESES_TOKEN",
  "RIGHT_PARENTHESES_TOKEN", "LEFT_SQUARE_BRACKET_TOKEN",
  "RIGHT_SQUARE_BRACKET_TOKEN", "ASSIGNMENT_TOKEN", "MODULO_TOKEN",
  "NUMBER_TOKEN", "CHARACTER_TOKEN", "STRING_TOKEN", "LINE_FEED_TOKEN",
  "CARRIAGE_RETURN_TOKEN", "BACKSPACE_TOKEN", "TAB_TOKEN",
  "FORM_FEED_TOKEN", "NEG", "$accept", "Program", "Program2",
  "ConstantDecl", "ProgramConstantDecl", "ConstantDecl2", "ProcedureDecl",
  "FunctionDecl", "FormalParameters", "FormalParameters2", "Body", "Block",
  "TypeDecl", "ProgramTypeDecl", "TypeDecl2", "Type", "SimpleType",
  "RecordType", "RecordType2", "ArrayType", "IdentList", "VarDecl",
  "ProgramVarDecl", "VarDecl2", "StatementSequence", "Statement",
  "Assignment", "IfStatement", "ElseIfList", "ElseStatement",
  "WhileStatement", "RepeatStatement", "ForStatement", "StopStatement",
  "ReturnStatement", "ReadStatement", "ReadStatement2", "WriteStatement",
  "WriteStatement2", "ProcedureCall", "ProcedureCall2", "Expression",
  "LValue", YY_NULLPTR
};
#endif

# ifdef YYPRINT
/* YYTOKNUM[NUM] -- (External) token number corresponding to the
   (internal) symbol number NUM (which must be that of a token).  */
static const yytype_uint16 yytoknum[] =
{
       0,   256,   257,   258,   259,   260,   261,   262,   263,   264,
     265,   266,   267,   268,   269,   270,   271,   272,   273,   274,
     275,   276,   277,   278,   279,   280,   281,   282,   283,   284,
     285,   286,   287,   288,   289,   290,   291,   292,   293,   294,
     295,   296,   297,   298,   299,   300,   301,   302,   303,   304,
     305,   306,   307,   308,   309,   310,   311,   312,   313,   314,
     315,   316,   317,   318,   319,   320,   321
};
# endif

#define YYPACT_NINF -96

#define yypact_value_is_default(Yystate) \
  (!!((Yystate) == (-96)))

#define YYTABLE_NINF -1

#define yytable_value_is_error(Yytable_value) \
  (!!((Yytable_value) == (-1)))

  /* YYPACT[STATE-NUM] -- Index in YYTABLE of the portion describing
     STATE-NUM.  */
static const yytype_int16 yypact[] =
{
      18,    -7,    19,   -96,     0,    -3,    14,   -96,    46,   -96,
      75,    -1,    77,    87,   103,   112,   -96,   -96,    96,   101,
     111,   127,   137,    -1,    -1,    -1,   -96,   -96,   -96,   -96,
     334,    28,    -1,    10,   129,   -96,    92,   112,    74,    -1,
      -1,    -1,    -1,   167,   -96,   589,   357,    -1,    -1,    -1,
      -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,   -96,
      -1,   158,    -1,   380,   140,   112,   -96,   151,   -96,   -96,
     -96,    10,   175,    10,    95,   641,   189,   194,   -96,   -96,
     150,   403,   426,   449,   472,   -96,    59,   557,   -96,   -27,
     -23,   -31,   172,   573,   589,   605,    79,   650,   632,   267,
     646,   -96,   -96,   495,   -96,    -1,    -6,   102,   -96,   180,
     -96,   181,    10,   200,    -1,   183,   641,    -1,   -96,    -1,
     192,    21,   -96,   -96,   -96,   -96,   -96,   -96,   -96,   -96,
     -96,   -96,   -96,   -36,   199,   201,   -96,   -96,   -96,   -96,
     -96,    -1,   -96,   -96,   518,   -96,   106,    10,   -96,   -96,
     204,   196,   295,   220,   -28,   557,   203,    -1,   -96,   641,
      -1,    63,    63,   557,    -1,    10,   206,   -96,    -1,   641,
     -96,    60,    28,    -1,   641,    82,   557,   -96,   557,   112,
     112,   205,   108,   214,   534,   208,   -96,   272,   223,   220,
     -96,   557,    30,    -1,   -96,   117,   119,   225,    10,   227,
     260,   -96,    -1,    -1,   165,    28,   -96,   557,    10,    10,
      10,   228,    97,    10,   226,   249,   641,    -1,   266,   228,
     228,   230,    65,   231,   239,     0,   246,   -96,   641,   641,
     223,   318,   -96,   231,   231,    98,   112,   112,   133,    67,
     -96,    75,   -96,    32,    35,   641,   247,   248,   138,   147,
      10,   112,   112,   155,   297,   -96,   -96,   223,   -96,   -96,
      10,    10,   -96,   162,   164,    10,   -96,   -96,   -96,    10,
      10,   -96,   -96,   -96
};

  /* YYDEFACT[STATE-NUM] -- Default reduction number in state STATE-NUM.
     Performed when YYTABLE does not specify something else to do.  Zero
     means the default is an error.  */
static const yytype_uint8 yydefact[] =
{
       8,     0,     0,     7,    32,     0,     6,     1,     0,    31,
      47,     0,     0,     0,    30,     0,    46,     5,     0,     0,
       0,     0,   111,     0,     0,     0,   107,   106,   108,   109,
       0,   110,     0,     0,     0,    44,     0,    45,     0,     0,
       0,     0,     0,     0,   100,   101,     0,     0,     0,     0,
       0,     0,     0,     0,     0,     0,     0,     0,     0,    10,
       0,     0,     0,     0,     0,     0,    38,     0,    35,    36,
      37,     0,     0,     0,     0,    62,     0,     0,     3,     4,
       0,     0,     0,     0,     0,    82,     0,    85,   105,    86,
      90,    89,    87,    91,    98,    92,    97,    95,    96,    93,
      94,    88,   112,     0,     9,     0,     0,     0,    34,     0,
      43,     0,     0,     0,     0,     0,    62,    74,    73,     0,
       0,     0,    51,    52,    53,    54,    55,    56,    57,    58,
      59,    60,    61,     0,     0,     0,     2,    99,   102,   103,
     104,     0,    83,   113,     0,    39,     0,     0,    33,    49,
       0,     0,     0,     0,     0,    75,     0,     0,    29,    62,
       0,    21,    21,    84,     0,     0,     0,    48,     0,    62,
     111,     0,    78,     0,    62,     0,    81,    50,    63,     0,
       0,     0,     0,     0,     0,     0,    41,     0,    66,     0,
      76,    70,     0,     0,    79,     0,     0,     0,     0,     0,
       0,    40,     0,     0,    68,    77,    69,    80,     0,     0,
       0,    20,     8,     0,     0,     0,    62,     0,     0,    19,
      18,     0,     0,    17,     0,    32,     0,    42,    62,    62,
      67,     0,    64,    16,    15,     8,     0,     0,     0,     0,
      11,    47,    12,     0,     0,    62,     0,     0,     0,     0,
       0,     0,     0,     0,     0,    72,    71,    65,    13,    14,
       0,     0,    24,     0,     0,     0,    28,    23,    22,     0,
       0,    27,    26,    25
};

  /* YYPGOTO[NTERM-NUM].  */
static const yytype_int16 yypgoto[] =
{
     -96,   -96,   -96,   -96,   320,   -96,   -96,   -96,   159,    -2,
      88,    71,   -96,   118,   -96,   -70,   -96,   -96,   -96,   -96,
     -15,   -96,    85,   -96,   -95,   168,   -96,   -96,   -96,   -96,
     -96,   -96,   -96,   -96,   -96,   -96,   -96,   -96,   -96,   -67,
     -96,    13,   -69
};

  /* YYDEFGOTO[NTERM-NUM].  */
static const yytype_int16 yydefgoto[] =
{
      -1,     2,    38,     3,   225,     6,    78,    79,   181,   223,
     226,    80,     9,    10,    14,    67,    68,    69,   106,    70,
     182,    16,    17,    37,   121,   122,   123,   124,   204,   218,
     125,   126,   127,   128,   129,   130,   171,   131,   175,    29,
      86,    30,    31
};

  /* YYTABLE[YYPACT[STATE-NUM]] -- What to do in state STATE-NUM.  If
     positive, shift that token.  If negative, reduce the rule whose
     number is the opposite.  If YYTABLE_NINF, syntax error.  */
static const yytype_int16 yytable[] =
{
      36,   109,   173,   111,    18,   145,   133,    50,   132,    48,
      49,    50,    61,    64,    49,    50,    19,    20,    62,     7,
     160,   154,    74,   159,     1,    21,    60,     5,    35,     8,
      60,    65,   158,    22,    60,    23,    44,    45,    46,    11,
      24,   206,   150,   255,    66,    63,   256,   133,    12,   132,
     107,    25,    81,    82,    83,    84,    87,    26,    27,    28,
      89,    90,    91,    92,    93,    94,    95,    96,    97,    98,
      99,   100,   159,   101,   188,   103,    61,   166,    75,   192,
      13,   159,    62,   159,   172,   179,   159,   236,    76,   251,
     133,   146,   132,    77,   180,   185,   237,    35,   252,    35,
     133,    35,   132,     1,     1,   133,    15,   132,   141,   189,
     224,   246,   142,   190,    47,    48,    49,    50,   144,    32,
     205,   230,    -1,    55,    56,    57,    58,   152,   211,    33,
     155,   193,   156,   243,   244,   194,    60,    34,   219,   220,
     221,    72,    73,   227,    72,   112,    35,   133,    39,   132,
     257,    72,   147,    40,   163,    72,   165,    72,   198,   133,
     133,   132,   132,    41,   195,   196,    72,   208,    72,   209,
     176,    71,    18,   178,   216,   217,   133,   184,   132,    42,
     262,   187,    72,   250,    19,    20,   191,    72,   260,    43,
     267,   268,   102,    21,   105,   271,    72,   261,   136,   272,
     273,    22,   108,    23,    72,   265,   207,   238,    24,   110,
     174,    72,   269,    72,   270,   214,   215,   233,   234,    25,
      85,   248,   249,   134,   253,    26,    27,    28,   135,    60,
     231,   148,   149,   228,   151,   153,   263,   264,    47,    48,
      49,    50,    51,    52,   157,    53,    54,    55,    56,    57,
      58,   161,   168,   162,   170,   167,   229,   186,   197,   201,
      60,    47,    48,    49,    50,    51,    52,   199,    53,    54,
      55,    56,    57,    58,   159,   210,   213,   232,   212,   222,
     202,   235,   239,    60,    47,    48,    49,    50,    51,    52,
     240,    53,    54,    55,    56,    57,    58,   242,   258,   259,
     203,    75,    47,    48,    49,    50,    60,    47,    48,    49,
      50,    51,    52,    -1,    53,    54,    55,    56,    57,    58,
       4,   183,   169,   247,    60,   266,   254,   177,     0,    60,
      47,    48,    49,    50,    51,    52,     0,    53,    54,    55,
      56,    57,    58,   241,     0,   245,     0,     0,     0,     0,
       0,     0,    60,    47,    48,    49,    50,    51,    52,     0,
      53,    54,    55,    56,    57,    58,     0,     0,     0,    47,
      48,    49,    50,    51,    52,    60,    53,    54,    55,    56,
      57,    58,     0,     0,     0,    59,     0,     0,     0,     0,
       0,    60,    47,    48,    49,    50,    51,    52,     0,    53,
      54,    55,    56,    57,    58,     0,     0,     0,     0,     0,
      88,     0,     0,     0,    60,    47,    48,    49,    50,    51,
      52,     0,    53,    54,    55,    56,    57,    58,     0,     0,
       0,   104,     0,     0,     0,     0,     0,    60,    47,    48,
      49,    50,    51,    52,     0,    53,    54,    55,    56,    57,
      58,     0,     0,     0,     0,     0,   137,     0,     0,     0,
      60,    47,    48,    49,    50,    51,    52,     0,    53,    54,
      55,    56,    57,    58,     0,     0,     0,     0,     0,   138,
       0,     0,     0,    60,    47,    48,    49,    50,    51,    52,
       0,    53,    54,    55,    56,    57,    58,     0,     0,     0,
       0,     0,   139,     0,     0,     0,    60,    47,    48,    49,
      50,    51,    52,     0,    53,    54,    55,    56,    57,    58,
       0,     0,     0,     0,     0,   140,     0,     0,     0,    60,
      47,    48,    49,    50,    51,    52,     0,    53,    54,    55,
      56,    57,    58,     0,     0,     0,     0,     0,     0,     0,
     143,     0,    60,    47,    48,    49,    50,    51,    52,     0,
      53,    54,    55,    56,    57,    58,     0,     0,   164,    47,
      48,    49,    50,    51,    52,    60,    53,    54,    55,    56,
      57,    58,     0,     0,     0,     0,     0,     0,     0,   200,
       0,    60,    47,    48,    49,    50,    51,    52,     0,    53,
      54,    55,    56,    57,    58,     0,     0,     0,    47,    48,
      49,    50,     0,    52,    60,    53,    54,    55,    56,    57,
      58,     0,     0,     0,    47,    48,    49,    50,     0,     0,
      60,    53,    54,    55,    56,    57,    58,     0,     0,     0,
      47,    48,    49,    50,     0,     0,    60,    -1,    54,    55,
      56,    57,    58,   113,     0,     0,   114,     0,     0,     0,
       0,   115,    60,     0,   116,   117,   118,    47,    48,    49,
      50,     0,     0,   119,   120,    22,    55,    -1,    57,    58,
       0,    47,    48,    49,    50,    47,    48,    49,    50,    60,
      55,     0,    57,    -1,    -1,     0,    57,     0,     0,     0,
       0,     0,     0,    60,     0,     0,     0,    60
};

static const yytype_int16 yycheck[] =
{
      15,    71,    30,    73,     5,    11,    75,    38,    75,    36,
      37,    38,    48,     3,    37,    38,    17,    18,    54,     0,
      56,   116,    37,    51,     6,    26,    57,    34,    34,    29,
      57,    21,    11,    34,    57,    36,    23,    24,    25,    42,
      41,    11,   112,    11,    34,    32,    11,   116,    34,   116,
      65,    52,    39,    40,    41,    42,    43,    58,    59,    60,
      47,    48,    49,    50,    51,    52,    53,    54,    55,    56,
      57,    58,    51,    60,   169,    62,    48,   147,     4,   174,
      34,    51,    54,    51,   153,    22,    51,    22,    14,    22,
     159,   106,   159,    19,    31,   165,    31,    34,    31,    34,
     169,    34,   169,     6,     6,   174,    31,   174,    49,    49,
      13,    13,    53,    53,    35,    36,    37,    38,   105,    42,
     189,   216,    43,    44,    45,    46,    47,   114,   198,    42,
     117,    49,   119,   228,   229,    53,    57,    34,   208,   209,
     210,    49,    50,   213,    49,    50,    34,   216,    52,   216,
     245,    49,    50,    52,   141,    49,    50,    49,    50,   228,
     229,   228,   229,    52,   179,   180,    49,    50,    49,    50,
     157,    42,     5,   160,     9,    10,   245,   164,   245,    52,
     250,   168,    49,    50,    17,    18,   173,    49,    50,    52,
     260,   261,    34,    26,    54,   265,    49,    50,    48,   269,
     270,    34,    51,    36,    49,    50,   193,   222,    41,    34,
       7,    49,    50,    49,    50,   202,   203,   219,   220,    52,
      53,   236,   237,    34,   239,    58,    59,    60,    34,    57,
     217,    51,    51,     7,    34,    52,   251,   252,    35,    36,
      37,    38,    39,    40,    52,    42,    43,    44,    45,    46,
      47,    52,    56,    52,    34,    51,     7,    51,    53,    51,
      57,    35,    36,    37,    38,    39,    40,    53,    42,    43,
      44,    45,    46,    47,    51,    50,    16,    11,    51,    51,
       8,    51,    51,    57,    35,    36,    37,    38,    39,    40,
      51,    42,    43,    44,    45,    46,    47,    51,    51,    51,
      28,     4,    35,    36,    37,    38,    57,    35,    36,    37,
      38,    39,    40,    46,    42,    43,    44,    45,    46,    47,
       0,   162,    27,   235,    57,   254,   241,   159,    -1,    57,
      35,    36,    37,    38,    39,    40,    -1,    42,    43,    44,
      45,    46,    47,   225,    -1,    27,    -1,    -1,    -1,    -1,
      -1,    -1,    57,    35,    36,    37,    38,    39,    40,    -1,
      42,    43,    44,    45,    46,    47,    -1,    -1,    -1,    35,
      36,    37,    38,    39,    40,    57,    42,    43,    44,    45,
      46,    47,    -1,    -1,    -1,    51,    -1,    -1,    -1,    -1,
      -1,    57,    35,    36,    37,    38,    39,    40,    -1,    42,
      43,    44,    45,    46,    47,    -1,    -1,    -1,    -1,    -1,
      53,    -1,    -1,    -1,    57,    35,    36,    37,    38,    39,
      40,    -1,    42,    43,    44,    45,    46,    47,    -1,    -1,
      -1,    51,    -1,    -1,    -1,    -1,    -1,    57,    35,    36,
      37,    38,    39,    40,    -1,    42,    43,    44,    45,    46,
      47,    -1,    -1,    -1,    -1,    -1,    53,    -1,    -1,    -1,
      57,    35,    36,    37,    38,    39,    40,    -1,    42,    43,
      44,    45,    46,    47,    -1,    -1,    -1,    -1,    -1,    53,
      -1,    -1,    -1,    57,    35,    36,    37,    38,    39,    40,
      -1,    42,    43,    44,    45,    46,    47,    -1,    -1,    -1,
      -1,    -1,    53,    -1,    -1,    -1,    57,    35,    36,    37,
      38,    39,    40,    -1,    42,    43,    44,    45,    46,    47,
      -1,    -1,    -1,    -1,    -1,    53,    -1,    -1,    -1,    57,
      35,    36,    37,    38,    39,    40,    -1,    42,    43,    44,
      45,    46,    47,    -1,    -1,    -1,    -1,    -1,    -1,    -1,
      55,    -1,    57,    35,    36,    37,    38,    39,    40,    -1,
      42,    43,    44,    45,    46,    47,    -1,    -1,    50,    35,
      36,    37,    38,    39,    40,    57,    42,    43,    44,    45,
      46,    47,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    55,
      -1,    57,    35,    36,    37,    38,    39,    40,    -1,    42,
      43,    44,    45,    46,    47,    -1,    -1,    -1,    35,    36,
      37,    38,    -1,    40,    57,    42,    43,    44,    45,    46,
      47,    -1,    -1,    -1,    35,    36,    37,    38,    -1,    -1,
      57,    42,    43,    44,    45,    46,    47,    -1,    -1,    -1,
      35,    36,    37,    38,    -1,    -1,    57,    42,    43,    44,
      45,    46,    47,    12,    -1,    -1,    15,    -1,    -1,    -1,
      -1,    20,    57,    -1,    23,    24,    25,    35,    36,    37,
      38,    -1,    -1,    32,    33,    34,    44,    45,    46,    47,
      -1,    35,    36,    37,    38,    35,    36,    37,    38,    57,
      44,    -1,    46,    47,    44,    -1,    46,    -1,    -1,    -1,
      -1,    -1,    -1,    57,    -1,    -1,    -1,    57
};

  /* YYSTOS[STATE-NUM] -- The (internal number of the) accessing
     symbol of state STATE-NUM.  */
static const yytype_uint8 yystos[] =
{
       0,     6,    68,    70,    71,    34,    72,     0,    29,    79,
      80,    42,    34,    34,    81,    31,    88,    89,     5,    17,
      18,    26,    34,    36,    41,    52,    58,    59,    60,   106,
     108,   109,    42,    42,    34,    34,    87,    90,    69,    52,
      52,    52,    52,    52,   108,   108,   108,    35,    36,    37,
      38,    39,    40,    42,    43,    44,    45,    46,    47,    51,
      57,    48,    54,   108,     3,    21,    34,    82,    83,    84,
      86,    42,    49,    50,    87,     4,    14,    19,    73,    74,
      78,   108,   108,   108,   108,    53,   107,   108,    53,   108,
     108,   108,   108,   108,   108,   108,   108,   108,   108,   108,
     108,   108,    34,   108,    51,    54,    85,    87,    51,    82,
      34,    82,    50,    12,    15,    20,    23,    24,    25,    32,
      33,    91,    92,    93,    94,    97,    98,    99,   100,   101,
     102,   104,   106,   109,    34,    34,    48,    53,    53,    53,
      53,    49,    53,    55,   108,    11,    87,    50,    51,    51,
      82,    34,   108,    52,    91,   108,   108,    52,    11,    51,
      56,    52,    52,   108,    50,    50,    82,    51,    56,    27,
      34,   103,   109,    30,     7,   105,   108,    92,   108,    22,
      31,    75,    87,    75,   108,    82,    51,   108,    91,    49,
      53,   108,    91,    49,    53,    87,    87,    53,    50,    53,
      55,    51,     8,    28,    95,   109,    11,   108,    50,    50,
      50,    82,    51,    16,   108,   108,     9,    10,    96,    82,
      82,    82,    51,    76,    13,    71,    77,    82,     7,     7,
      91,   108,    11,    76,    76,    51,    22,    31,    87,    51,
      51,    80,    51,    91,    91,    27,    13,    77,    87,    87,
      50,    22,    31,    87,    89,    11,    11,    91,    51,    51,
      50,    50,    82,    87,    87,    50,    78,    82,    82,    50,
      50,    82,    82,    82
};

  /* YYR1[YYN] -- Symbol number of symbol that rule YYN derives.  */
static const yytype_uint8 yyr1[] =
{
       0,    67,    68,    69,    69,    69,    70,    71,    71,    72,
      72,    73,    73,    74,    74,    75,    75,    75,    75,    75,
      75,    75,    76,    76,    76,    76,    76,    76,    77,    78,
      79,    80,    80,    81,    81,    82,    82,    82,    83,    84,
      85,    85,    86,    87,    87,    88,    89,    89,    90,    90,
      91,    91,    92,    92,    92,    92,    92,    92,    92,    92,
      92,    92,    92,    93,    94,    95,    95,    96,    96,    97,
      98,    99,    99,   100,   101,   101,   102,   103,   103,   104,
     105,   105,   106,   106,   107,   107,   108,   108,   108,   108,
     108,   108,   108,   108,   108,   108,   108,   108,   108,   108,
     108,   108,   108,   108,   108,   108,   108,   108,   108,   108,
     108,   109,   109,   109
};

  /* YYR2[YYN] -- Number of symbols on the right hand side of rule YYN.  */
static const yytype_uint8 yyr2[] =
{
       0,     2,     6,     2,     2,     0,     2,     1,     0,     5,
       4,     8,     8,    10,    10,     5,     5,     4,     4,     4,
       3,     0,     5,     5,     4,     6,     6,     5,     4,     3,
       2,     1,     0,     5,     4,     1,     1,     1,     1,     3,
       5,     4,     8,     3,     1,     2,     1,     0,     5,     4,
       3,     1,     1,     1,     1,     1,     1,     1,     1,     1,
       1,     1,     0,     3,     7,     5,     0,     2,     0,     5,
       4,     9,     9,     1,     1,     2,     4,     3,     1,     4,
       3,     1,     3,     4,     3,     1,     3,     3,     3,     3,
       3,     3,     3,     3,     3,     3,     3,     3,     3,     4,
       2,     2,     4,     4,     4,     3,     1,     1,     1,     1,
       1,     1,     3,     4
};


#define yyerrok         (yyerrstatus = 0)
#define yyclearin       (yychar = YYEMPTY)
#define YYEMPTY         (-2)
#define YYEOF           0

#define YYACCEPT        goto yyacceptlab
#define YYABORT         goto yyabortlab
#define YYERROR         goto yyerrorlab


#define YYRECOVERING()  (!!yyerrstatus)

#define YYBACKUP(Token, Value)                                  \
do                                                              \
  if (yychar == YYEMPTY)                                        \
    {                                                           \
      yychar = (Token);                                         \
      yylval = (Value);                                         \
      YYPOPSTACK (yylen);                                       \
      yystate = *yyssp;                                         \
      goto yybackup;                                            \
    }                                                           \
  else                                                          \
    {                                                           \
      yyerror (YY_("syntax error: cannot back up")); \
      YYERROR;                                                  \
    }                                                           \
while (0)

/* Error token number */
#define YYTERROR        1
#define YYERRCODE       256



/* Enable debugging if requested.  */
#if YYDEBUG

# ifndef YYFPRINTF
#  include <stdio.h> /* INFRINGES ON USER NAME SPACE */
#  define YYFPRINTF fprintf
# endif

# define YYDPRINTF(Args)                        \
do {                                            \
  if (yydebug)                                  \
    YYFPRINTF Args;                             \
} while (0)

/* This macro is provided for backward compatibility. */
#ifndef YY_LOCATION_PRINT
# define YY_LOCATION_PRINT(File, Loc) ((void) 0)
#endif


# define YY_SYMBOL_PRINT(Title, Type, Value, Location)                    \
do {                                                                      \
  if (yydebug)                                                            \
    {                                                                     \
      YYFPRINTF (stderr, "%s ", Title);                                   \
      yy_symbol_print (stderr,                                            \
                  Type, Value); \
      YYFPRINTF (stderr, "\n");                                           \
    }                                                                     \
} while (0)


/*----------------------------------------.
| Print this symbol's value on YYOUTPUT.  |
`----------------------------------------*/

static void
yy_symbol_value_print (FILE *yyoutput, int yytype, YYSTYPE const * const yyvaluep)
{
  FILE *yyo = yyoutput;
  YYUSE (yyo);
  if (!yyvaluep)
    return;
# ifdef YYPRINT
  if (yytype < YYNTOKENS)
    YYPRINT (yyoutput, yytoknum[yytype], *yyvaluep);
# endif
  YYUSE (yytype);
}


/*--------------------------------.
| Print this symbol on YYOUTPUT.  |
`--------------------------------*/

static void
yy_symbol_print (FILE *yyoutput, int yytype, YYSTYPE const * const yyvaluep)
{
  YYFPRINTF (yyoutput, "%s %s (",
             yytype < YYNTOKENS ? "token" : "nterm", yytname[yytype]);

  yy_symbol_value_print (yyoutput, yytype, yyvaluep);
  YYFPRINTF (yyoutput, ")");
}

/*------------------------------------------------------------------.
| yy_stack_print -- Print the state stack from its BOTTOM up to its |
| TOP (included).                                                   |
`------------------------------------------------------------------*/

static void
yy_stack_print (yytype_int16 *yybottom, yytype_int16 *yytop)
{
  YYFPRINTF (stderr, "Stack now");
  for (; yybottom <= yytop; yybottom++)
    {
      int yybot = *yybottom;
      YYFPRINTF (stderr, " %d", yybot);
    }
  YYFPRINTF (stderr, "\n");
}

# define YY_STACK_PRINT(Bottom, Top)                            \
do {                                                            \
  if (yydebug)                                                  \
    yy_stack_print ((Bottom), (Top));                           \
} while (0)


/*------------------------------------------------.
| Report that the YYRULE is going to be reduced.  |
`------------------------------------------------*/

static void
yy_reduce_print (yytype_int16 *yyssp, YYSTYPE *yyvsp, int yyrule)
{
  unsigned long int yylno = yyrline[yyrule];
  int yynrhs = yyr2[yyrule];
  int yyi;
  YYFPRINTF (stderr, "Reducing stack by rule %d (line %lu):\n",
             yyrule - 1, yylno);
  /* The symbols being reduced.  */
  for (yyi = 0; yyi < yynrhs; yyi++)
    {
      YYFPRINTF (stderr, "   $%d = ", yyi + 1);
      yy_symbol_print (stderr,
                       yystos[yyssp[yyi + 1 - yynrhs]],
                       &(yyvsp[(yyi + 1) - (yynrhs)])
                                              );
      YYFPRINTF (stderr, "\n");
    }
}

# define YY_REDUCE_PRINT(Rule)          \
do {                                    \
  if (yydebug)                          \
    yy_reduce_print (yyssp, yyvsp, Rule); \
} while (0)

/* Nonzero means print parse trace.  It is left uninitialized so that
   multiple parsers can coexist.  */
int yydebug;
#else /* !YYDEBUG */
# define YYDPRINTF(Args)
# define YY_SYMBOL_PRINT(Title, Type, Value, Location)
# define YY_STACK_PRINT(Bottom, Top)
# define YY_REDUCE_PRINT(Rule)
#endif /* !YYDEBUG */


/* YYINITDEPTH -- initial size of the parser's stacks.  */
#ifndef YYINITDEPTH
# define YYINITDEPTH 200
#endif

/* YYMAXDEPTH -- maximum size the stacks can grow to (effective only
   if the built-in stack extension method is used).

   Do not make this value too large; the results are undefined if
   YYSTACK_ALLOC_MAXIMUM < YYSTACK_BYTES (YYMAXDEPTH)
   evaluated with infinite-precision integer arithmetic.  */

#ifndef YYMAXDEPTH
# define YYMAXDEPTH 10000
#endif


#if YYERROR_VERBOSE

# ifndef yystrlen
#  if defined __GLIBC__ && defined _STRING_H
#   define yystrlen strlen
#  else
/* Return the length of YYSTR.  */
static YYSIZE_T
yystrlen (const char *yystr)
{
  YYSIZE_T yylen;
  for (yylen = 0; yystr[yylen]; yylen++)
    continue;
  return yylen;
}
#  endif
# endif

# ifndef yystpcpy
#  if defined __GLIBC__ && defined _STRING_H && defined _GNU_SOURCE
#   define yystpcpy stpcpy
#  else
/* Copy YYSRC to YYDEST, returning the address of the terminating '\0' in
   YYDEST.  */
static char *
yystpcpy (char *yydest, const char *yysrc)
{
  char *yyd = yydest;
  const char *yys = yysrc;

  while ((*yyd++ = *yys++) != '\0')
    continue;

  return yyd - 1;
}
#  endif
# endif

# ifndef yytnamerr
/* Copy to YYRES the contents of YYSTR after stripping away unnecessary
   quotes and backslashes, so that it's suitable for yyerror.  The
   heuristic is that double-quoting is unnecessary unless the string
   contains an apostrophe, a comma, or backslash (other than
   backslash-backslash).  YYSTR is taken from yytname.  If YYRES is
   null, do not copy; instead, return the length of what the result
   would have been.  */
static YYSIZE_T
yytnamerr (char *yyres, const char *yystr)
{
  if (*yystr == '"')
    {
      YYSIZE_T yyn = 0;
      char const *yyp = yystr;

      for (;;)
        switch (*++yyp)
          {
          case '\'':
          case ',':
            goto do_not_strip_quotes;

          case '\\':
            if (*++yyp != '\\')
              goto do_not_strip_quotes;
            /* Fall through.  */
          default:
            if (yyres)
              yyres[yyn] = *yyp;
            yyn++;
            break;

          case '"':
            if (yyres)
              yyres[yyn] = '\0';
            return yyn;
          }
    do_not_strip_quotes: ;
    }

  if (! yyres)
    return yystrlen (yystr);

  return yystpcpy (yyres, yystr) - yyres;
}
# endif

/* Copy into *YYMSG, which is of size *YYMSG_ALLOC, an error message
   about the unexpected token YYTOKEN for the state stack whose top is
   YYSSP.

   Return 0 if *YYMSG was successfully written.  Return 1 if *YYMSG is
   not large enough to hold the message.  In that case, also set
   *YYMSG_ALLOC to the required number of bytes.  Return 2 if the
   required number of bytes is too large to store.  */
static int
yysyntax_error (YYSIZE_T *yymsg_alloc, char **yymsg,
                yytype_int16 *yyssp, int yytoken)
{
  YYSIZE_T yysize0 = yytnamerr (YY_NULLPTR, yytname[yytoken]);
  YYSIZE_T yysize = yysize0;
  enum { YYERROR_VERBOSE_ARGS_MAXIMUM = 5 };
  /* Internationalized format string. */
  const char *yyformat = YY_NULLPTR;
  /* Arguments of yyformat. */
  char const *yyarg[YYERROR_VERBOSE_ARGS_MAXIMUM];
  /* Number of reported tokens (one for the "unexpected", one per
     "expected"). */
  int yycount = 0;

  /* There are many possibilities here to consider:
     - If this state is a consistent state with a default action, then
       the only way this function was invoked is if the default action
       is an error action.  In that case, don't check for expected
       tokens because there are none.
     - The only way there can be no lookahead present (in yychar) is if
       this state is a consistent state with a default action.  Thus,
       detecting the absence of a lookahead is sufficient to determine
       that there is no unexpected or expected token to report.  In that
       case, just report a simple "syntax error".
     - Don't assume there isn't a lookahead just because this state is a
       consistent state with a default action.  There might have been a
       previous inconsistent state, consistent state with a non-default
       action, or user semantic action that manipulated yychar.
     - Of course, the expected token list depends on states to have
       correct lookahead information, and it depends on the parser not
       to perform extra reductions after fetching a lookahead from the
       scanner and before detecting a syntax error.  Thus, state merging
       (from LALR or IELR) and default reductions corrupt the expected
       token list.  However, the list is correct for canonical LR with
       one exception: it will still contain any token that will not be
       accepted due to an error action in a later state.
  */
  if (yytoken != YYEMPTY)
    {
      int yyn = yypact[*yyssp];
      yyarg[yycount++] = yytname[yytoken];
      if (!yypact_value_is_default (yyn))
        {
          /* Start YYX at -YYN if negative to avoid negative indexes in
             YYCHECK.  In other words, skip the first -YYN actions for
             this state because they are default actions.  */
          int yyxbegin = yyn < 0 ? -yyn : 0;
          /* Stay within bounds of both yycheck and yytname.  */
          int yychecklim = YYLAST - yyn + 1;
          int yyxend = yychecklim < YYNTOKENS ? yychecklim : YYNTOKENS;
          int yyx;

          for (yyx = yyxbegin; yyx < yyxend; ++yyx)
            if (yycheck[yyx + yyn] == yyx && yyx != YYTERROR
                && !yytable_value_is_error (yytable[yyx + yyn]))
              {
                if (yycount == YYERROR_VERBOSE_ARGS_MAXIMUM)
                  {
                    yycount = 1;
                    yysize = yysize0;
                    break;
                  }
                yyarg[yycount++] = yytname[yyx];
                {
                  YYSIZE_T yysize1 = yysize + yytnamerr (YY_NULLPTR, yytname[yyx]);
                  if (! (yysize <= yysize1
                         && yysize1 <= YYSTACK_ALLOC_MAXIMUM))
                    return 2;
                  yysize = yysize1;
                }
              }
        }
    }

  switch (yycount)
    {
# define YYCASE_(N, S)                      \
      case N:                               \
        yyformat = S;                       \
      break
      YYCASE_(0, YY_("syntax error"));
      YYCASE_(1, YY_("syntax error, unexpected %s"));
      YYCASE_(2, YY_("syntax error, unexpected %s, expecting %s"));
      YYCASE_(3, YY_("syntax error, unexpected %s, expecting %s or %s"));
      YYCASE_(4, YY_("syntax error, unexpected %s, expecting %s or %s or %s"));
      YYCASE_(5, YY_("syntax error, unexpected %s, expecting %s or %s or %s or %s"));
# undef YYCASE_
    }

  {
    YYSIZE_T yysize1 = yysize + yystrlen (yyformat);
    if (! (yysize <= yysize1 && yysize1 <= YYSTACK_ALLOC_MAXIMUM))
      return 2;
    yysize = yysize1;
  }

  if (*yymsg_alloc < yysize)
    {
      *yymsg_alloc = 2 * yysize;
      if (! (yysize <= *yymsg_alloc
             && *yymsg_alloc <= YYSTACK_ALLOC_MAXIMUM))
        *yymsg_alloc = YYSTACK_ALLOC_MAXIMUM;
      return 1;
    }

  /* Avoid sprintf, as that infringes on the user's name space.
     Don't have undefined behavior even if the translation
     produced a string with the wrong number of "%s"s.  */
  {
    char *yyp = *yymsg;
    int yyi = 0;
    while ((*yyp = *yyformat) != '\0')
      if (*yyp == '%' && yyformat[1] == 's' && yyi < yycount)
        {
          yyp += yytnamerr (yyp, yyarg[yyi++]);
          yyformat += 2;
        }
      else
        {
          yyp++;
          yyformat++;
        }
  }
  return 0;
}
#endif /* YYERROR_VERBOSE */

/*-----------------------------------------------.
| Release the memory associated to this symbol.  |
`-----------------------------------------------*/

static void
yydestruct (const char *yymsg, int yytype, YYSTYPE *yyvaluep)
{
  YYUSE (yyvaluep);
  if (!yymsg)
    yymsg = "Deleting";
  YY_SYMBOL_PRINT (yymsg, yytype, yyvaluep, yylocationp);

  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  YYUSE (yytype);
  YY_IGNORE_MAYBE_UNINITIALIZED_END
}




/* The lookahead symbol.  */
int yychar;

/* The semantic value of the lookahead symbol.  */
YYSTYPE yylval;
/* Number of syntax errors so far.  */
int yynerrs;


/*----------.
| yyparse.  |
`----------*/

int
yyparse (void)
{
    int yystate;
    /* Number of tokens to shift before error messages enabled.  */
    int yyerrstatus;

    /* The stacks and their tools:
       'yyss': related to states.
       'yyvs': related to semantic values.

       Refer to the stacks through separate pointers, to allow yyoverflow
       to reallocate them elsewhere.  */

    /* The state stack.  */
    yytype_int16 yyssa[YYINITDEPTH];
    yytype_int16 *yyss;
    yytype_int16 *yyssp;

    /* The semantic value stack.  */
    YYSTYPE yyvsa[YYINITDEPTH];
    YYSTYPE *yyvs;
    YYSTYPE *yyvsp;

    YYSIZE_T yystacksize;

  int yyn;
  int yyresult;
  /* Lookahead token as an internal (translated) token number.  */
  int yytoken = 0;
  /* The variables used to return semantic value and location from the
     action routines.  */
  YYSTYPE yyval;

#if YYERROR_VERBOSE
  /* Buffer for error messages, and its allocated size.  */
  char yymsgbuf[128];
  char *yymsg = yymsgbuf;
  YYSIZE_T yymsg_alloc = sizeof yymsgbuf;
#endif

#define YYPOPSTACK(N)   (yyvsp -= (N), yyssp -= (N))

  /* The number of symbols on the RHS of the reduced rule.
     Keep to zero when no symbol should be popped.  */
  int yylen = 0;

  yyssp = yyss = yyssa;
  yyvsp = yyvs = yyvsa;
  yystacksize = YYINITDEPTH;

  YYDPRINTF ((stderr, "Starting parse\n"));

  yystate = 0;
  yyerrstatus = 0;
  yynerrs = 0;
  yychar = YYEMPTY; /* Cause a token to be read.  */
  goto yysetstate;

/*------------------------------------------------------------.
| yynewstate -- Push a new state, which is found in yystate.  |
`------------------------------------------------------------*/
 yynewstate:
  /* In all cases, when you get here, the value and location stacks
     have just been pushed.  So pushing a state here evens the stacks.  */
  yyssp++;

 yysetstate:
  *yyssp = yystate;

  if (yyss + yystacksize - 1 <= yyssp)
    {
      /* Get the current used size of the three stacks, in elements.  */
      YYSIZE_T yysize = yyssp - yyss + 1;

#ifdef yyoverflow
      {
        /* Give user a chance to reallocate the stack.  Use copies of
           these so that the &'s don't force the real ones into
           memory.  */
        YYSTYPE *yyvs1 = yyvs;
        yytype_int16 *yyss1 = yyss;

        /* Each stack pointer address is followed by the size of the
           data in use in that stack, in bytes.  This used to be a
           conditional around just the two extra args, but that might
           be undefined if yyoverflow is a macro.  */
        yyoverflow (YY_("memory exhausted"),
                    &yyss1, yysize * sizeof (*yyssp),
                    &yyvs1, yysize * sizeof (*yyvsp),
                    &yystacksize);

        yyss = yyss1;
        yyvs = yyvs1;
      }
#else /* no yyoverflow */
# ifndef YYSTACK_RELOCATE
      goto yyexhaustedlab;
# else
      /* Extend the stack our own way.  */
      if (YYMAXDEPTH <= yystacksize)
        goto yyexhaustedlab;
      yystacksize *= 2;
      if (YYMAXDEPTH < yystacksize)
        yystacksize = YYMAXDEPTH;

      {
        yytype_int16 *yyss1 = yyss;
        union yyalloc *yyptr =
          (union yyalloc *) YYSTACK_ALLOC (YYSTACK_BYTES (yystacksize));
        if (! yyptr)
          goto yyexhaustedlab;
        YYSTACK_RELOCATE (yyss_alloc, yyss);
        YYSTACK_RELOCATE (yyvs_alloc, yyvs);
#  undef YYSTACK_RELOCATE
        if (yyss1 != yyssa)
          YYSTACK_FREE (yyss1);
      }
# endif
#endif /* no yyoverflow */

      yyssp = yyss + yysize - 1;
      yyvsp = yyvs + yysize - 1;

      YYDPRINTF ((stderr, "Stack size increased to %lu\n",
                  (unsigned long int) yystacksize));

      if (yyss + yystacksize - 1 <= yyssp)
        YYABORT;
    }

  YYDPRINTF ((stderr, "Entering state %d\n", yystate));

  if (yystate == YYFINAL)
    YYACCEPT;

  goto yybackup;

/*-----------.
| yybackup.  |
`-----------*/
yybackup:

  /* Do appropriate processing given the current state.  Read a
     lookahead token if we need one and don't already have one.  */

  /* First try to decide what to do without reference to lookahead token.  */
  yyn = yypact[yystate];
  if (yypact_value_is_default (yyn))
    goto yydefault;

  /* Not known => get a lookahead token if don't already have one.  */

  /* YYCHAR is either YYEMPTY or YYEOF or a valid lookahead symbol.  */
  if (yychar == YYEMPTY)
    {
      YYDPRINTF ((stderr, "Reading a token: "));
      yychar = yylex ();
    }

  if (yychar <= YYEOF)
    {
      yychar = yytoken = YYEOF;
      YYDPRINTF ((stderr, "Now at end of input.\n"));
    }
  else
    {
      yytoken = YYTRANSLATE (yychar);
      YY_SYMBOL_PRINT ("Next token is", yytoken, &yylval, &yylloc);
    }

  /* If the proper action on seeing token YYTOKEN is to reduce or to
     detect an error, take that action.  */
  yyn += yytoken;
  if (yyn < 0 || YYLAST < yyn || yycheck[yyn] != yytoken)
    goto yydefault;
  yyn = yytable[yyn];
  if (yyn <= 0)
    {
      if (yytable_value_is_error (yyn))
        goto yyerrlab;
      yyn = -yyn;
      goto yyreduce;
    }

  /* Count tokens shifted since error; after three, turn off error
     status.  */
  if (yyerrstatus)
    yyerrstatus--;

  /* Shift the lookahead token.  */
  YY_SYMBOL_PRINT ("Shifting", yytoken, &yylval, &yylloc);

  /* Discard the shifted token.  */
  yychar = YYEMPTY;

  yystate = yyn;
  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  *++yyvsp = yylval;
  YY_IGNORE_MAYBE_UNINITIALIZED_END

  goto yynewstate;


/*-----------------------------------------------------------.
| yydefault -- do the default action for the current state.  |
`-----------------------------------------------------------*/
yydefault:
  yyn = yydefact[yystate];
  if (yyn == 0)
    goto yyerrlab;
  goto yyreduce;


/*-----------------------------.
| yyreduce -- Do a reduction.  |
`-----------------------------*/
yyreduce:
  /* yyn is the number of a rule to reduce with.  */
  yylen = yyr2[yyn];

  /* If YYLEN is nonzero, implement the default value of the action:
     '$$ = $1'.

     Otherwise, the following line sets YYVAL to garbage.
     This behavior is undocumented and Bison
     users should not rely upon it.  Assigning to YYVAL
     unconditionally makes the parser a bit smaller, and it avoids a
     GCC warning that YYVAL may be used uninitialized.  */
  yyval = yyvsp[1-yylen];


  YY_REDUCE_PRINT (yyn);
  switch (yyn)
    {
        case 2:
#line 171 "Main/parser.y" /* yacc.c:1646  */
    { 
          std::cout << std::endl << "Main: " << std::endl;
          (yyvsp[-1].statementList) -> emit(); 
        }
#line 1608 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 6:
#line 184 "Main/parser.y" /* yacc.c:1646  */
    {
                  std::cout << "\nConstants:" << std::endl;
                  for (auto statement : (yyvsp[0].statementList)->statements) statement->emit();
                  std::cout << "\tj Main" << std::endl;
                }
#line 1618 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 8:
#line 192 "Main/parser.y" /* yacc.c:1646  */
    { std::cout << "\tj Main" << std::endl; }
#line 1624 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 9:
#line 195 "Main/parser.y" /* yacc.c:1646  */
    { (yyvsp[-4].statementList)->statements.push_back(BuildConstant((yyvsp[-3].id), (yyvsp[-1].expr))); (yyval.statementList) = (yyvsp[-4].statementList); }
#line 1630 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 10:
#line 196 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statementList) = new StatementList(); (yyval.statementList)->statements.push_back(BuildConstant((yyvsp[-3].id), (yyvsp[-1].expr))); }
#line 1636 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 11:
#line 200 "Main/parser.y" /* yacc.c:1646  */
    { exit(0); }
#line 1642 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 12:
#line 202 "Main/parser.y" /* yacc.c:1646  */
    { 
                std::cout << std::endl << (yyvsp[-6].id) << ":" << std::endl;
                (yyvsp[-1].statementList)->emit(); 
                std::cout << "\tjr $ra" << std::endl;
              }
#line 1652 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 13:
#line 210 "Main/parser.y" /* yacc.c:1646  */
    { 
                  std::cout << "\nMain:" << std::endl;
                  exit(0);
                }
#line 1661 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 14:
#line 215 "Main/parser.y" /* yacc.c:1646  */
    { 
                  std::cout << "\nMain:" << std::endl;
                  exit(0);
                }
#line 1670 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 15:
#line 222 "Main/parser.y" /* yacc.c:1646  */
    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
#line 1679 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 16:
#line 227 "Main/parser.y" /* yacc.c:1646  */
    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
#line 1688 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 17:
#line 232 "Main/parser.y" /* yacc.c:1646  */
    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
#line 1697 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 18:
#line 237 "Main/parser.y" /* yacc.c:1646  */
    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
#line 1706 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 19:
#line 242 "Main/parser.y" /* yacc.c:1646  */
    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
#line 1715 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 20:
#line 247 "Main/parser.y" /* yacc.c:1646  */
    { 
                      std::cout << "\nMain:" << std::endl;
                      exit(0);
                    }
#line 1724 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 28:
#line 262 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statementList) = (yyvsp[0].statementList); }
#line 1730 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 29:
#line 265 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statementList) = (yyvsp[-1].statementList); }
#line 1736 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 33:
#line 276 "Main/parser.y" /* yacc.c:1646  */
    { typeTable->StoreType((yyvsp[-3].id), (yyvsp[-1].type)); }
#line 1742 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 34:
#line 277 "Main/parser.y" /* yacc.c:1646  */
    { typeTable->StoreType((yyvsp[-3].id), (yyvsp[-1].type)); }
#line 1748 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 35:
#line 280 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.type) = (yyvsp[0].type); }
#line 1754 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 36:
#line 281 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.type) = (yyvsp[0].type); }
#line 1760 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 37:
#line 282 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.type) = (yyvsp[0].type); }
#line 1766 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 38:
#line 285 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.type) = typeTable->LookUpType((yyvsp[0].id)); }
#line 1772 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 39:
#line 288 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.type) = BuildRecord((yyvsp[-1].recordList)); }
#line 1778 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 40:
#line 291 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.recordList) = (yyvsp[-4].recordList); (yyval.recordList)->recordList.push_back(std::make_pair((yyvsp[-3].identList)->list, (yyvsp[-1].type))); }
#line 1784 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 41:
#line 292 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.recordList) = new RecordList(); (yyval.recordList)->recordList.push_back(std::make_pair((yyvsp[-3].identList)->list, (yyvsp[-1].type))); }
#line 1790 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 42:
#line 295 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.type) = BuildArray((yyvsp[-5].expr), (yyvsp[-3].expr), (yyvsp[0].type)); }
#line 1796 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 43:
#line 298 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.identList) = (yyvsp[-2].identList); (yyval.identList)->list.push_back((yyvsp[0].id)); }
#line 1802 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 44:
#line 299 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.identList) = new IdentList(); (yyval.identList)->list.push_back((yyvsp[0].id)); }
#line 1808 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 48:
#line 309 "Main/parser.y" /* yacc.c:1646  */
    { StoreSymbols((yyvsp[-3].identList), (yyvsp[-1].type)); }
#line 1814 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 49:
#line 310 "Main/parser.y" /* yacc.c:1646  */
    { StoreSymbols((yyvsp[-3].identList), (yyvsp[-1].type)); }
#line 1820 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 50:
#line 314 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statementList) = (yyvsp[-2].statementList); (yyval.statementList)->AddToStatementList((yyvsp[0].statement)); }
#line 1826 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 51:
#line 315 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statementList) = new StatementList(); (yyval.statementList)->AddToStatementList((yyvsp[0].statement)); }
#line 1832 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 52:
#line 318 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[0].statement); }
#line 1838 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 53:
#line 319 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[0].statement); }
#line 1844 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 54:
#line 320 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[0].statement); }
#line 1850 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 55:
#line 321 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[0].statement); }
#line 1856 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 56:
#line 322 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[0].statement); }
#line 1862 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 57:
#line 323 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[0].statement); }
#line 1868 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 58:
#line 325 "Main/parser.y" /* yacc.c:1646  */
    { 
              std::cout << "\nMain:" << std::endl;
              exit(0);
            }
#line 1877 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 59:
#line 329 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[0].statement);}
#line 1883 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 60:
#line 330 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[0].statement); }
#line 1889 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 61:
#line 331 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[0].statement); }
#line 1895 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 62:
#line 332 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = nullptr; }
#line 1901 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 63:
#line 335 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = Assignment((yyvsp[-2].symbol), (yyvsp[0].expr)); }
#line 1907 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 64:
#line 338 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = If((yyvsp[-5].expr), (yyvsp[-3].statementList), (yyvsp[-2].elseIfList), (yyvsp[-1].statementList)); }
#line 1913 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 65:
#line 341 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.elseIfList) = (yyvsp[-4].elseIfList); (yyval.elseIfList)->AddToElseIfList((yyvsp[-2].expr), (yyvsp[0].statementList)); }
#line 1919 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 66:
#line 342 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.elseIfList) = new ElseIfList(); }
#line 1925 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 67:
#line 345 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statementList) = (yyvsp[0].statementList); }
#line 1931 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 68:
#line 346 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statementList) = new StatementList(); }
#line 1937 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 69:
#line 349 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = While((yyvsp[-3].expr), (yyvsp[-1].statementList)); }
#line 1943 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 70:
#line 352 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = Repeat((yyvsp[-2].statementList), (yyvsp[0].expr)); }
#line 1949 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 71:
#line 355 "Main/parser.y" /* yacc.c:1646  */
    {
                  auto symbol = LookUpSymbol((yyvsp[-7].id));
                  (yyval.statement) = For(BuildSymbolExpression(symbol), Assignment(symbol, (yyvsp[-5].expr)), (yyvsp[-3].expr), (yyvsp[-1].statementList), "to");
               }
#line 1958 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 72:
#line 359 "Main/parser.y" /* yacc.c:1646  */
    {
                  auto symbol = LookUpSymbol((yyvsp[-7].id));
                  (yyval.statement) = For(BuildSymbolExpression(symbol), Assignment(symbol, (yyvsp[-5].expr)), (yyvsp[-3].expr), (yyvsp[-1].statementList), "down");
               }
#line 1967 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 73:
#line 365 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = Stop(); }
#line 1973 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 76:
#line 372 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[-1].statement); }
#line 1979 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 77:
#line 375 "Main/parser.y" /* yacc.c:1646  */
    { dynamic_cast<ReadStatement*>((yyvsp[-2].statement))->ReadAddSymbol((yyvsp[0].symbol)); }
#line 1985 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 78:
#line 376 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = Read((yyvsp[0].symbol)); }
#line 1991 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 79:
#line 379 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = (yyvsp[-1].statement); }
#line 1997 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 80:
#line 382 "Main/parser.y" /* yacc.c:1646  */
    { dynamic_cast<WriteStatement*>((yyvsp[-2].statement))->WriteAddExpression((yyvsp[0].expr)); }
#line 2003 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 81:
#line 383 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = Write((yyvsp[0].expr)); }
#line 2009 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 82:
#line 386 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.statement) = Procedure((yyvsp[-2].id)); }
#line 2015 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 83:
#line 388 "Main/parser.y" /* yacc.c:1646  */
    { 
                  std::cout << "\nMain:" << std::endl;
                  exit(0);
                }
#line 2024 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 86:
#line 399 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Add((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2030 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 87:
#line 400 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Divide((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2036 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 88:
#line 401 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Modulo((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2042 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 89:
#line 402 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Product((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2048 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 90:
#line 403 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Subtract((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2054 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 91:
#line 404 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = And((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2060 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 92:
#line 405 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = EqualTo((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2066 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 93:
#line 406 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = GreaterThan((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2072 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 94:
#line 407 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = GreaterThanEqualTo((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2078 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 95:
#line 408 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = LessThan((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2084 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 96:
#line 409 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = LessThanEqualTo((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2090 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 97:
#line 410 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = NotEqualTo((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2096 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 98:
#line 411 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Or((yyvsp[-2].expr), (yyvsp[0].expr)); }
#line 2102 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 99:
#line 412 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Chr((yyvsp[-1].expr)); }
#line 2108 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 100:
#line 413 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Negative((yyvsp[0].expr)); }
#line 2114 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 101:
#line 414 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Not((yyvsp[0].expr)); }
#line 2120 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 102:
#line 415 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Ord((yyvsp[-1].expr)); }
#line 2126 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 103:
#line 416 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Pred((yyvsp[-1].expr)); }
#line 2132 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 104:
#line 417 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Succ((yyvsp[-1].expr)); }
#line 2138 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 105:
#line 418 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = (yyvsp[-1].expr); }
#line 2144 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 106:
#line 419 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Char((yyvsp[0].char_id)); }
#line 2150 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 107:
#line 420 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = Number((yyvsp[0].val)); }
#line 2156 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 108:
#line 421 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = String(stringTable->StoreString((yyvsp[0].id))); }
#line 2162 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 109:
#line 422 "Main/parser.y" /* yacc.c:1646  */
    { }
#line 2168 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 110:
#line 423 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.expr) = BuildSymbolExpression((yyvsp[0].symbol)); }
#line 2174 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 111:
#line 426 "Main/parser.y" /* yacc.c:1646  */
    { 
          (yyval.symbol) = LookUpSymbol((yyvsp[0].id)); 
          if (!(yyval.symbol)) {
            StoreSymbol((yyvsp[0].id), typeTable->LookUpType("integer"));
            (yyval.symbol) = LookUpSymbol((yyvsp[0].id));
          }
          free (yyvsp[0].id);
        }
#line 2187 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 112:
#line 434 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.symbol) = GetRecord((yyvsp[-2].symbol), (yyvsp[0].id)); }
#line 2193 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;

  case 113:
#line 435 "Main/parser.y" /* yacc.c:1646  */
    { (yyval.symbol) = GetArray((yyvsp[-3].symbol), (yyvsp[-1].expr)); }
#line 2199 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
    break;


#line 2203 "/mnt/b/Personal/college/CS-5300 Compilers/Compiler/Main/parser.cpp" /* yacc.c:1646  */
      default: break;
    }
  /* User semantic actions sometimes alter yychar, and that requires
     that yytoken be updated with the new translation.  We take the
     approach of translating immediately before every use of yytoken.
     One alternative is translating here after every semantic action,
     but that translation would be missed if the semantic action invokes
     YYABORT, YYACCEPT, or YYERROR immediately after altering yychar or
     if it invokes YYBACKUP.  In the case of YYABORT or YYACCEPT, an
     incorrect destructor might then be invoked immediately.  In the
     case of YYERROR or YYBACKUP, subsequent parser actions might lead
     to an incorrect destructor call or verbose syntax error message
     before the lookahead is translated.  */
  YY_SYMBOL_PRINT ("-> $$ =", yyr1[yyn], &yyval, &yyloc);

  YYPOPSTACK (yylen);
  yylen = 0;
  YY_STACK_PRINT (yyss, yyssp);

  *++yyvsp = yyval;

  /* Now 'shift' the result of the reduction.  Determine what state
     that goes to, based on the state we popped back to and the rule
     number reduced by.  */

  yyn = yyr1[yyn];

  yystate = yypgoto[yyn - YYNTOKENS] + *yyssp;
  if (0 <= yystate && yystate <= YYLAST && yycheck[yystate] == *yyssp)
    yystate = yytable[yystate];
  else
    yystate = yydefgoto[yyn - YYNTOKENS];

  goto yynewstate;


/*--------------------------------------.
| yyerrlab -- here on detecting error.  |
`--------------------------------------*/
yyerrlab:
  /* Make sure we have latest lookahead translation.  See comments at
     user semantic actions for why this is necessary.  */
  yytoken = yychar == YYEMPTY ? YYEMPTY : YYTRANSLATE (yychar);

  /* If not already recovering from an error, report this error.  */
  if (!yyerrstatus)
    {
      ++yynerrs;
#if ! YYERROR_VERBOSE
      yyerror (YY_("syntax error"));
#else
# define YYSYNTAX_ERROR yysyntax_error (&yymsg_alloc, &yymsg, \
                                        yyssp, yytoken)
      {
        char const *yymsgp = YY_("syntax error");
        int yysyntax_error_status;
        yysyntax_error_status = YYSYNTAX_ERROR;
        if (yysyntax_error_status == 0)
          yymsgp = yymsg;
        else if (yysyntax_error_status == 1)
          {
            if (yymsg != yymsgbuf)
              YYSTACK_FREE (yymsg);
            yymsg = (char *) YYSTACK_ALLOC (yymsg_alloc);
            if (!yymsg)
              {
                yymsg = yymsgbuf;
                yymsg_alloc = sizeof yymsgbuf;
                yysyntax_error_status = 2;
              }
            else
              {
                yysyntax_error_status = YYSYNTAX_ERROR;
                yymsgp = yymsg;
              }
          }
        yyerror (yymsgp);
        if (yysyntax_error_status == 2)
          goto yyexhaustedlab;
      }
# undef YYSYNTAX_ERROR
#endif
    }



  if (yyerrstatus == 3)
    {
      /* If just tried and failed to reuse lookahead token after an
         error, discard it.  */

      if (yychar <= YYEOF)
        {
          /* Return failure if at end of input.  */
          if (yychar == YYEOF)
            YYABORT;
        }
      else
        {
          yydestruct ("Error: discarding",
                      yytoken, &yylval);
          yychar = YYEMPTY;
        }
    }

  /* Else will try to reuse lookahead token after shifting the error
     token.  */
  goto yyerrlab1;


/*---------------------------------------------------.
| yyerrorlab -- error raised explicitly by YYERROR.  |
`---------------------------------------------------*/
yyerrorlab:

  /* Pacify compilers like GCC when the user code never invokes
     YYERROR and the label yyerrorlab therefore never appears in user
     code.  */
  if (/*CONSTCOND*/ 0)
     goto yyerrorlab;

  /* Do not reclaim the symbols of the rule whose action triggered
     this YYERROR.  */
  YYPOPSTACK (yylen);
  yylen = 0;
  YY_STACK_PRINT (yyss, yyssp);
  yystate = *yyssp;
  goto yyerrlab1;


/*-------------------------------------------------------------.
| yyerrlab1 -- common code for both syntax error and YYERROR.  |
`-------------------------------------------------------------*/
yyerrlab1:
  yyerrstatus = 3;      /* Each real token shifted decrements this.  */

  for (;;)
    {
      yyn = yypact[yystate];
      if (!yypact_value_is_default (yyn))
        {
          yyn += YYTERROR;
          if (0 <= yyn && yyn <= YYLAST && yycheck[yyn] == YYTERROR)
            {
              yyn = yytable[yyn];
              if (0 < yyn)
                break;
            }
        }

      /* Pop the current state because it cannot handle the error token.  */
      if (yyssp == yyss)
        YYABORT;


      yydestruct ("Error: popping",
                  yystos[yystate], yyvsp);
      YYPOPSTACK (1);
      yystate = *yyssp;
      YY_STACK_PRINT (yyss, yyssp);
    }

  YY_IGNORE_MAYBE_UNINITIALIZED_BEGIN
  *++yyvsp = yylval;
  YY_IGNORE_MAYBE_UNINITIALIZED_END


  /* Shift the error token.  */
  YY_SYMBOL_PRINT ("Shifting", yystos[yyn], yyvsp, yylsp);

  yystate = yyn;
  goto yynewstate;


/*-------------------------------------.
| yyacceptlab -- YYACCEPT comes here.  |
`-------------------------------------*/
yyacceptlab:
  yyresult = 0;
  goto yyreturn;

/*-----------------------------------.
| yyabortlab -- YYABORT comes here.  |
`-----------------------------------*/
yyabortlab:
  yyresult = 1;
  goto yyreturn;

#if !defined yyoverflow || YYERROR_VERBOSE
/*-------------------------------------------------.
| yyexhaustedlab -- memory exhaustion comes here.  |
`-------------------------------------------------*/
yyexhaustedlab:
  yyerror (YY_("memory exhausted"));
  yyresult = 2;
  /* Fall through.  */
#endif

yyreturn:
  if (yychar != YYEMPTY)
    {
      /* Make sure we have latest lookahead translation.  See comments at
         user semantic actions for why this is necessary.  */
      yytoken = YYTRANSLATE (yychar);
      yydestruct ("Cleanup: discarding lookahead",
                  yytoken, &yylval);
    }
  /* Do not reclaim the symbols of the rule whose action triggered
     this YYABORT or YYACCEPT.  */
  YYPOPSTACK (yylen);
  YY_STACK_PRINT (yyss, yyssp);
  while (yyssp != yyss)
    {
      yydestruct ("Cleanup: popping",
                  yystos[*yyssp], yyvsp);
      YYPOPSTACK (1);
    }
#ifndef yyoverflow
  if (yyss != yyssa)
    YYSTACK_FREE (yyss);
#endif
#if YYERROR_VERBOSE
  if (yymsg != yymsgbuf)
    YYSTACK_FREE (yymsg);
#endif
  return yyresult;
}
#line 438 "Main/parser.y" /* yacc.c:1906  */

void yyerror(const char* msg)
{
  std::cerr << msg << std::endl;
}

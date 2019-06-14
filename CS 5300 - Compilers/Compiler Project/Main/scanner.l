%{
    #include <iostream>
    #include "parser.hpp"
%}

%option noyywrap

%%
    /* 2.2 Keywords */
array|ARRAY {return ARRAY_TOKEN; }
begin|BEGIN {return BEGIN_TOKEN; }
chr|CHR {return CHR_TOKEN; }
const|CONST {return CONST_TOKEN; }
do|DO {return DO_TOKEN; }
downto|DOWNTO {return DOWNTO_TOKEN; }
else|ELSE {return ELSE_TOKEN; }
elseif|ELSEIF {return ELSEIF_TOKEN; }
end|END {return END_TOKEN; }
for|FOR {return FOR_TOKEN; }
forward|FORWARD {return FORWARD_TOKEN; }
function|FUNCTION {return FUNCTION_TOKEN; }
if|IF {return IF_TOKEN; }
of|OF {return OF_TOKEN; }
ord|ORD {return ORD_TOKEN; }
pred|PRED {return PRED_TOKEN; }
procedure|PROCEDURE {return PROCEDURE_TOKEN; }
read|READ {return READ_TOKEN; }
record|RECORD { return RECORD_TOKEN; }
ref|REF { return REF_TOKEN; }
repeat|REPEAT { return REPEAT_TOKEN; }
return|RETURN { return RETURN_TOKEN; }
stop|STOP { return STOP_TOKEN; }
succ|SUCC { return SUCC_TOKEN; }
then|THEN { return THEN_TOKEN; }
to|TO { return TO_TOKEN; }
type|TYPE { return TYPE_TOKEN; }
until|UNTIL { return UNTIL_TOKEN; }
var|VAR { return VAR_TOKEN; }
while|WHILE { return WHILE_TOKEN; }
write|WRITE { return WRITE_TOKEN; }

    /* 2.3 Identifiers */
[A-Za-z][A-Za-z0-9_]* { yylval.id = strdup(yytext); return ID_TOKEN; }

    /* 2.4 Operators and Delimiters */
"+" { return ADD_TOKEN; }
"-" { return SUBTRACT_TOKEN; }
"*" { return PRODUCT_TOKEN; }
"/" { return DIVIDE_TOKEN; }
"&" { return AND_TOKEN; }
"|" { return OR_TOKEN; }
"~" { return NOT_TOKEN; }
"=" { return EQUAL_TO_TOKEN; }
"<>" { return NOT_EQUAL_TO_TOKEN; }
"<" { return LESS_THAN_TOKEN; }
"<=" { return LESS_THAN_EQUAL_TO_TOKEN; }
">" { return GREATER_THAN_TOKEN; }
">=" { return GREATER_THAN_EQUAL_TO_TOKEN; }
"." { return PERIOD_TOKEN; }
"," { return COMMA_TOKEN; }
":" { return COLON_TOKEN; }
";" { return SEMICOLON_TOKEN; }
"(" { return LEFT_PARENTHESES_TOKEN; }
")" { return RIGHT_PARENTHESES_TOKEN; }
"[" { return LEFT_SQUARE_BRACKET_TOKEN; }
"]" { return RIGHT_SQUARE_BRACKET_TOKEN; }
":=" { return ASSIGNMENT_TOKEN; }
"%" { return MODULO_TOKEN; }

    /* 2.5.1 Integer Constants */
0[0-8]+ {yylval.val = strtol(yytext, NULL, 8); return NUMBER_TOKEN; }
0x[a-fA-F0-9]+ {yylval.val = strtol(yytext + 2, NULL, 16); return NUMBER_TOKEN; }
[0-9]+ {yylval.val = atoi(yytext); return NUMBER_TOKEN; }

    /* 2.5.2 Character Constants */
'[^\\]' {yylval.char_id = yytext[1]; return CHARACTER_TOKEN; }

    /* 2.5.3 String Constants */
\"[^"]*\" {yylval.id = strdup(yytext); return STRING_TOKEN; }

    /* 2.5.4 Representing Characters in Character and String Constants */
'\\n' {yylval.char_id = '\n'; return CHARACTER_TOKEN; }
'\\r' {yylval.char_id = '\r'; return CHARACTER_TOKEN; }
'\\b' {yylval.char_id = '\b'; return CHARACTER_TOKEN; }
'\\t' {yylval.char_id = '\t'; return CHARACTER_TOKEN; }
'\\f' {yylval.char_id = '\f'; return CHARACTER_TOKEN; }
'\\[^\\]' {yylval.char_id = yytext[2]; return CHARACTER_TOKEN; }

    /* 2.5.5 Comments */
\$.* {}

    /* 2.5.6 Blanks, Tabs, Spaces, and New Lines */
[ \s\t\r\n] {}

%%

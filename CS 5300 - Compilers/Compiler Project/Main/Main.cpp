#include "Main/Main.hpp"

int main(int argc, char** argv) {
    extern FILE* yyin;
    ++argv;
    --argc;
    yyin = fopen(argv[0], "r");

    printf("Start:");
    printf("\n");

    ConstructPredefinedSymbols();

    // Parse the file
    yyparse();

    // Close the program
    printf("\nEnd:\n");
    printf("\tli $v0, 10\n");
    printf("\tsyscall\n");

    printf("\n.data\n");
    stringTable->emit();

    fclose(yyin);
}

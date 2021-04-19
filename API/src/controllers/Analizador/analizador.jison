%{
    const Excepcion = require('./exceptions/Excepcion');
    const Tipo = require('./tablaSimbolo/tipo');
    const Arbol = require('./tablaSimbolo/ArbolAST');
    const Expresion = require('./expresiones/expresion');
    const Imprimir = require('./Instrucciones/Imprimir');
    const Aritmetica = require('./expresiones/aritmetica');
%}

%lex

%options case-insenstive

%%
    [ \t\r\n]*   {}

    <<EOF>>     return 'EOF'

    . { console.log("El simvbolo"+ yytext +" no se reconoce")};
/lex


%start ini

%%

ini

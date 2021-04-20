%{
    const Excepcion = require('./exceptions/Excepcion');
    const Tipo = require('./tablaSimbolo/tipo');
    const Arbol = require('./tablaSimbolo/ArbolAST');
    const Expresion = require('./expresiones/expresion');
    const Imprimir = require('./Instrucciones/Imprimir');
    const Aritmetica = require('./expresiones/aritmetica');
    let Texto="";
%}

%lex

%options case-insenstive
%x Cadena
%%
    /* Espacios en blanco */
"//".*            	{}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]           {}
[ \r\t]+            {}
\n                  {}
["]                 {Texto=""; this.begin("Cadena");}
<Cadena>[^"\\]+     {Texto+=yytext; console.log(6);}
<Cadena>"\\n"       {Texto+='\n'; console.log(1);}
<Cadena>"\\t"       {Texto+="\t"; console.log(2);}
<Cadena>"\\\""      {Texto+="\""; console.log(3);}
<Cadena>"\\\'"      {Texto+="\'"; console.log(4);}       
<Cadena>"\\\\"      {Texto+="\\"; console.log(5);}
<Cadena>["]         {console.log(7); yytext = Texto; this.popState(); return 'Cadena';}

"PRINT"                 return "PRINT";
"INT"                   return "INT";
"DOUBLE"                return "DOUBLE";
"BOOLEAN"               return "BOOLEAN";
"CHAR"                  return "CHAR";
"STRING"                return "STRING";
"TRUE"                  return "TRUE";
"FALSE"                 return "FALSE";
"&&"
"||"
"!"
"<"
">"
"="
"?"
"FOR"
"WHILE"
"DO"
"SWITCH"
"IF"
"ELSE"
"NEW"
"RETURN"
"CONTINUE"
"BREAK"
"LIST"
"ADD"
"CASE"
"DEFAULT"
"VOID"
"toLOWER"
"toUPPER"
"Length"
"Truncate"
"Round"
"Typeof"
"toSTRING"
"toCharArray"
"Exec"
[0-9]+"."[0-9]+         return "DOBLE";
[0-9]+                  return "ENTERO";  
/lex


%start ini

%%

ini

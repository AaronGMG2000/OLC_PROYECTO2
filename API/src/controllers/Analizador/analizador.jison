%{
    const Excepcion = require('./exceptions/Excepcion');
    const Tipo = require('./tablaSimbolo/tipo');
    const Literal = require('./expresiones/literal');
    const Arbol = require('./tablaSimbolo/ArbolAST');
    const Expresion = require('./expresiones/expresion');
    const Imprimir = require('./Instrucciones/Imprimir');
    const DECLARAR = require('./Instrucciones/DECLARAR');
    const ASIGNAR = require('./Instrucciones/ASIGNAR')
    const Aritmetica = require('./expresiones/aritmetica');
    const Instruccion = require('./Abstract/instruccion');
    let Texto="";
%}

%lex

%options case-insensitive
%x Cadena
%%
/* Espacios en blanco */
"//".*            	{}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]           {}
[ \r\t]+            {}
\n                  {}
["]                 {Texto=""; this.begin("Cadena");}
<Cadena>[^"\\]+     {Texto+=yytext;}
<Cadena>"\\n"       {Texto+='\n';}
<Cadena>"\\t"       {Texto+="\t";}
<Cadena>"\\\""      {Texto+="\"";}
<Cadena>"\\\'"      {Texto+="\'";}       
<Cadena>"\\\\"      {Texto+="\\";}
<Cadena>["]         {yytext = Texto; this.popState(); return 'Cadena';}

"PRINT"                 return "PRINT";
"INT"                   return "INT";
"DOUBLE"                return "DOUBLE";
"BOOLEAN"               return "BOOLEAN";
"CHAR"                  return "CHAR";
"STRING"                return "STRING";
"TRUE"                  return "TRUE";
"FALSE"                 return "FALSE";
"++"                    return "PLUS";
"--"                    return "MIN";
"!="                    return "DIFERENTE";
"=="                    return "IIGUAL";
">="                    return "MAYORIGUAL";
"<="                    return "MENORIGUAL";
"&&"                    return "AND";
"||"                    return "OR";
"!"                     return "NOT";    
"<"                     return "MENOR";
">"                     return "MAYOR";
"="                     return "IGUAL";
"?"                     return "TERNARIO";
"FOR"                   return "FOR";
"WHILE"                 return "WHILE";
"DO"                    return "DO";
"SWITCH"                return "SWITCH";
"IF"                    return "IF";
"ELSE"                  return "ELSE";
"NEW"                   return "NEW";
"RETURN"                return "RETURN";
"CONTINUE"              return "CONTINUE";
"BREAK"                 return "BREAK";
"LIST"                  return "LIST";
"ADD"                   return "ADD";
"CASE"                  return "CASE";
"DEFAULT"               return "DEFAULT";
"VOID"                  return "VOID";
"toLOWER"               return "LOWER";
"toUPPER"               return "UPPER";
"Length"                return "LENGTH";
"Truncate"              return "TRUNCATE";
"Round"                 return "ROUND";
"Typeof"                return "TYPEOF";
"toSTRING"              return "TSTRING";
"toCharArray"           return "CHARARRAY";
"Exec"                  return "EXEC";
"+"                     return "MAS";
"-"                     return "MENOS";
"*"                     return "POR";
"/"                     return "DIV";
"%"                     return "MOD";
"^"                     return "ELEV";
"("                     return "PARIZ";
")"                     return "PARDER";
"["                     return "CORIZ";
"]"                     return "CORDER";
"{"                     return "LLAVEIZ";
"}"                     return "LLAVEDER";
";"                     return "PTCOMA";
":"                     return "DOSPT"
"."                     return "PT";
[0-9]+"."[0-9]+         return "DOBLE";
[0-9]+                  return "ENTERO";
"'"[A-Za-z]?"'"         {yytext = yytext.substr(1,yyleng-2); return "CARACTER";}
[A-Za-z]([A-Za-z]|[0-9]|[_]])* return "ID";
","                     return "COMA";

<<EOF>>                 return 'EOF';

.       {
            Arbol.errores.push(new Excepcion(Arbol.errores.length+1, "LEXICO", "Símbolo "+yytext+" no reconocido.", yylloc.first_line, yylloc.first_column)); 
            Arbol.consola+='\nError léxico: Símbolo ' + yytext + ' no reconocido, en la linea: ' + yylloc.first_line + 'y columna: ' + yylloc.first_column;
        }
/lex
                
/* Asociación de operadores y precedencia */
%left 'TERNARIO'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IIGUAL' 'DIFERENTE','MENOR','MENORIGUAL','MAYOR'.'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'POR' 'DIV' 'MOD'
%right UMENOS
%right FCAST 
%left 'PLUS','MIN'

%start INI

%%

INI
    : LINS EOF      {return $1;}
    | error EOF     {
                        Arbol.errores.push(new Excepcion(Arbol.errores.length+1, "Sintactico", "No se esperaba  "+yytext+".", yylloc.first_line, yylloc.first_column));
                        Arbol.consola+="\nError Sintactico no se esperaba:  "+yytext+" en la linea "+this._$.first_line+" y columna"+this._$.first_column;
                    }
;

LINS
    :LINS INS       {$1.push($2); $$=$1;}
    |INS            {$$= []; $$.push($1);}
;

INS
    : PRINT PARIZ EXP PARDER PTCOMA                 {$$ = new Imprimir.default(this._$.first_line, this._$.first_column, $3); }
    | DECLARACION PTCOMA                            {}
    | ASIGNACION  PTCOMA                            {}
    | FIF                                           {}
    | FWHILE                                        {}
    | FFOR                                          {}  
    | FSWITCH                                       {}
    | FUNCION                                       {}
    | DOWHILE                                       {}
    | LLAMADA PTCOMA                                {}
    | FEXEC PTCOMA                                  {}
    | FRETURN PTCOMA                                {}
    | BREAK PTCOMA                                  {}
    | CONTINUE PTCOMA                               {}
    | ID PT ADD PARIZ EXP PARDER PTCOMA             {}
    | error PTCOMA                                  {}
;

FRETURN
    : RETURN                  {}
    | RETURN EXP              {}
;
// |FTIPO CORIZ CORDER ID IGUAL LLAVEIZ L_EXP LLAVEDER               {$$ = new DECLARAR(this._$.first_line, this._$.first_column,$2, $1,$7.length,-1, $7)}
DECLARACION
    :FTIPO ID                                                         {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$2, $1)}
    |FTIPO ID IGUAL EXP                                               {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$2, $1,-1,-1, $4)}
    |FTIPO CORIZ CORDER ID IGUAL FTIPO CORIZ EXP CORDER               {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$2, $1,$8,-1)}
    |LIST MENOR FTIPO MAYOR ID                                        {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$5, $2, $4,-1,0)}
    |LIST MENOR FTIPO MAYOR ID IGUAL NEW LIST MENOR Tipo MAYOR        {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$5, $2, $4,-1,0)}
;

LISTAVALORES
    :ENTERO             {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.ENTERO)}
    |DOBLE              {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.DOBLE)}
    |CARACTER           {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.CARACTER)}
    |Cadena             {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.CADENA)}
    |TRUE               {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.BOOLEANO)}
    |FALSE              {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.BOOLEANO)}
;

L_EXP
    :L_EXP COMA EXP     {}
    |EXP                {}
;

ASIGNACION
    :ID IGUAL EXP                                 {}
    |ID CORIZ CORIZ EXP CORDER CORDER IGUAL EXP   {}
;

FUNCION
    :FTIPO ID PARIZ PARDER LLAVEIZ LINS LLAVEDER                {}
    |FTIPO ID PARIZ PARAMETROS PARDER LLAVEIZ LINS LLAVEDER     {}
    |VOID ID PARIZ PARAMETROS PARDER LLAVEIZ LINS LLAVEDER      {}
    |VOID ID PARIZ PARDER LLAVEIZ LINS LLAVEDER                 {}
    |VOID error LLAVEDER                                        {}
    |error LLAVEDER                                             {}
;

PARAMETROS
    :PARAMETROS COMA FTIPO ID        {}
    |FTIPO ID                        {}
;

FIF
    :IF PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER                                      {}
    |IF PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER ELSE FIF                             {}
    |IF PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER ELSE LLAVEIZ LINS LLAVEDER           {}
    |IF error LLAVEDER                                                              {}
;

FSWITCH
    :SWITCH PARDER EXP PARIZ LLAVEIZ LCASOS DEFAULT DOSPT LINS LLAVEDER             {}
    |SWITCH PARDER EXP PARIZ LLAVEIZ LCASOS LLAVEDER                                {}
    |SWITCH error PARDER                                                            {} 
;

LCASOS
    :LCASOS CASE EXP DOSPT LINS                                                   {}
    |CASE EXP DOSPT LINS                                                          {}
;

FWHILE
    :WHILE PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER             {}
    |WHILE error LLAVEDER                                     {}
;

FOR
    :FOR PARIZ DECLARACION PTCOMA CONDICION PTCOMA EXP PARDER LLAVEIZ LINS LLAVEDER     {}
    |FOR PARIZ ASIGNACION PTCOMA CONDICION PTCOMA EXP PARDER LLAVEIZ LINS LLAVEDER      {}
    |FOR error LLAVEDER                                                                 {}
;

DOWHILE
    :DO LLAVEIZ LINS LLAVEDER WHILE PARIZ EXP PARDER PTCOMA             {}
    |DO error PTCOMA                                                    {}
;

LLAMADA
    :ID PARIZ PARDER              {}
    |ID PARIZ PARAMETROS PARDER   {}
;

FTIPO
    :INT                    {}
    |DOUBLE                 {}
    |CHAR                   {}
    |BOOLEAN                {}
    |STRING                 {}
;

EXP
    :EXP MAS EXP                                    {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.SUMA,this._$.first_line, this._$.first_column, 0
                                                                        , Tipo.tipos.ENTERO, $1, $3)}
    |EXP MENOS EXP                                  {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.RESTA,this._$.first_line, this._$.first_column, 0
                                                                        , Tipo.tipos.ENTERO, $1, $3)}
    |EXP POR EXP                                    {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MULTIPLICACION,this._$.first_line, this._$.first_column, 0
                                                                        , Tipo.tipos.ENTERO, $1, $3)}
    |EXP DIV EXP                                    {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.DIVISION,this._$.first_line, this._$.first_column, 0
                                                                        , Tipo.tipos.ENTERO, $1, $3)}
    |EXP MOD EXP                                    {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.MODULO,this._$.first_line, this._$.first_column, 0
                                                                        , Tipo.tipos.ENTERO, $1, $3)}
    |EXP MENOR EXP                                  {}
    |EXP MAYOR EXP                                  {}
    |EXP DIFERENTE EXP                              {}
    |EXP IIGUAL EXP                                 {}
    |EXP MAYORIGUAL EXP                             {}
    |EXP MENORIGUAL EXP                             {}
    |EXP AND EXP                                    {}
    |EXP OR EXP                                     {}
    |NOT EXP                                        {}
    |MENOS EXP %prec UMENOS                         {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.RESTA,this._$.first_line, this._$.first_column, 0
                                                                        , Tipo.tipos.ENTERO, $2)}
    |LISTAVALORES                                   {}
    |PARIZ EXP PARDER                               {}
    |CONDICION TERNARIO EXP DOSPT EXP               {}
    |EXP PLUS                                       {}
    |EXP MIN                                        {}
    |NATIVAS                                        {}
    |PARIZ FTIPO PARDER EXP %prec FCAST             {}
    |FTOLOWER                                       {}
    |FTOUPPER                                       {}
;

VALORES
    :ID
    |ID PARIZ PARDER                                {}
    |ID PARIZ L_EXP PARDER                          {}
    |ID CORIZ CORIZ EXP CORDER CORDER               {}
;

L_EXP
    :L_EXP COMA EXP     {}
    |EXP                {}
;

FBREAK
    :BREAK PTCOMA           {}
    |BREAK error PTCOMA     {}
;                        
FCONTINUE
    :CONTINUE PTCOMA           {}
    | CONTINUE error PTCOMA    {}
;                     
                    
FTOLOWER
    :toLOWER PARIZ EXP PARDER       {}
;                        
FTOUPPER
    :toUPPER PARIZ EXP PARDER       {}
;                        
NATIVAS
    :LENGTH PARIZ EXP PARDER          {}
    |TRUNCATE PARIZ EXP PARDER        {}
    |ROUND PARIZ EXP PARDER           {}
    |TYPEOF PARIZ EXP PARDER          {}
    |toSTRING PARIZ EXP PARDER        {}
    |toCharArray PARIZ EXP PARDER     {}
;

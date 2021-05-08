%{
    const Excepcion = require('./exceptions/Excepcion');
    const Tipo = require('./tablaSimbolo/tipo');
    const Literal = require('./expresiones/literal');
    const Variable = require('./expresiones/variable');
    const Vector = require('./expresiones/vector');
    const Arbol = require('./tablaSimbolo/ArbolAST');
    const Expresion = require('./expresiones/expresion');
    const Imprimir = require('./Instrucciones/Imprimir');
    const DEC = require('./Instrucciones/decremento');
    const INC = require('./Instrucciones/incrementar');
    const DECLARAR = require('./Instrucciones/DECLARAR');
    const ASIGNAR = require('./Instrucciones/ASIGNAR')
    const Aritmetica = require('./expresiones/aritmetica');
    const TERNARIO = require('./expresiones/ternario');
    const TOLOWER = require('./expresiones/toLower');
    const TOUPPER = require('./expresiones/toUpper');
    const NATIVAS = require('./expresiones/nativas');
    const IF = require('./Instrucciones/IF');
    const WHILE = require('./Instrucciones/while');
    const DOWHILE = require('./Instrucciones/dowhile');
    const SWITCH = require('./Instrucciones/switch');
    const FUNC = require('./Instrucciones/funcion');
    const FUNCION = require('./expresiones/funcion')
    const FOR = require('./Instrucciones/FOR');
    const BREAK = require('./Instrucciones/break');
    const LLAMADA = require('./Instrucciones/llamada');
    const RETURN = require('./Instrucciones/return');
    const CONTINUE = require('./Instrucciones/continue');
    const ADD = require('./Instrucciones/add');
    const Incremento = require('./expresiones/incremento');
    const Decremento = require('./expresiones/decremento');
    const Casteo = require('./expresiones/casteo');
    const Condicion = require('./expresiones/condicion');
    const Instruccion = require('./Abstract/instruccion');
    let Texto="";
    let ArbolAST = new Arbol.default([]);
    let ArbolAST2 = new Arbol.default([]);
%}

%lex

%options case-insensitive
%x Cadena
%x CARACTER
%%
/* Espacios en blanco */
"//".*            	{}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]           {}
[ \r\t]+            {}
\n                  {}
\s+                 {}
[']                 {Texto=""; this.begin("CARACTER");}
<CARACTER>[^'\\]"'"     {yytext = yytext.substr(0,yyleng-1); this.popState(); return 'CARACTER';}
<CARACTER>"\\n'"        {yytext = '\n'; this.popState(); return 'CARACTER';}
<CARACTER>"\\t'"        {yytext = "\t"; this.popState(); return 'CARACTER';}
<CARACTER>"\\r'"        {yytext = "\r"; this.popState(); return 'CARACTER';}
<CARACTER>"\\\"'"       {yytext = "\""; this.popState(); return 'CARACTER';}
<CARACTER>"\\''"        {yytext = "'"; this.popState(); return 'CARACTER';}       
<CARACTER>"\\\\'"       {yytext = "\\"; this.popState(); return 'CARACTER';}
<CARACTER><<EOF>>       return "EOF_IN_CARACTER";
<CARACTER>[^'\\]*"'"    {this.popState(); return 'CARACTER_ERROR';}

["]                 {Texto=""; this.begin("Cadena");}
<Cadena>[^"\\]+     {Texto+=yytext;}
<Cadena>"\\n"       {Texto+='\n';}
<Cadena>"\\t"       {Texto+="\t";}
<Cadena>"\\r"       {Texto+="\r";}
<Cadena>"\\\""      {Texto+="\"";}
<Cadena>"\\'"       {Texto+="\'";}
<Cadena>"\\\\"      {Texto+="\\";}
<Cadena><<EOF>>     return "EOF_IN_STRING";
<Cadena>["]         {yytext = Texto; this.popState(); return 'Cadena';}

"PRINT"                 return "PRINT";
";"                     return "PTCOMA";
":"                     return "DOSPT"
"."                     return "PT";
","                     return "COMA";
"("                     return "PARIZ";
")"                     return "PARDER";
"["                     return "CORIZ";
"]"                     return "CORDER";
"{"                     return "LLAVEIZ";
"}"                     return "LLAVEDER";
"++"                    return "PLUS";
"--"                    return "MIN";

"+"                     return "MAS";
"-"                     return "MENOS";
"*"                     return "POR";
"/"                     return "DIV";
"%"                     return "MOD";
"^"                     return "ELEV";
"!="                    return "DIFERENTE";
"=="                    return "IIGUAL";
">="                    return "MAYORIGUAL";
"<="                    return "MENORIGUAL";
    
"<"                     return "MENOR";
">"                     return "MAYOR";
"="                     return "IGUAL";

"&&"                    return "AND";
"||"                    return "OR";
"!"                     return "NOT";

"INT"                   return "INT";
"DOUBLE"                return "DOUBLE";
"BOOLEAN"               return "BOOLEAN";
"CHAR"                  return "CHAR";
"STRING"                return "STRING";
"TRUE"                  return "TRUE";
"FALSE"                 return "FALSE";


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
"toSTRING"              return "TOSTRING";
"toCharArray"           return "CHARARRAY";
"Exec"                  return "EXEC";



[A-Za-z]([A-Za-z]|[0-9]|[_])*  return "ID";
[0-9]+"."[0-9]+\b         return "DOBLE";
[0-9]+\b                  return "ENTERO";

<<EOF>>                 return 'EOF';

. {
    ArbolAST.num_error++;
    ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "LEXICO", "Símbolo "+yytext+" no reconocido.", yylloc.first_line, yylloc.first_column)); 
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
%left 'ELEV'
%right UMENOS
%right FCAST
%left 'PLUS','MIN'

%start INI

%%

INI
    : LINS EOF      {ArbolAST.instrucciones = $1; ArbolAST2 = ArbolAST; ArbolAST = new Arbol.default([]); return ArbolAST2;}
    | error EOF     {ArbolAST.num_error++;ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}
    | error         {}
;

LINS
    :LINS INS       {$1.push($2); $$=$1;}
    |INS            {$$= []; $$.push($1);}
;

INS
    : PRINT PARIZ EXP PARDER PTCOMA                 {$$ = new Imprimir.default(this._$.first_line, this._$.first_column, $3); }
    | DECLARACION PTCOMA                            {$$ = $1}
    | ASIGNACION PTCOMA                             {$$ = $1}
    | FIF                                           {$$ = $1}
    | FWHILE                                        {$$ = $1}
    | FFOR                                          {$$ = $1}  
    | FSWITCH                                       {$$ = $1}
    | INCREMENTO PTCOMA                             {$$ = new INC.default(this._$.first_line, this._$.first_column, $1);}
    | DECREMENTO PTCOMA                             {$$ = new DEC.default(this._$.first_line, this._$.first_column, $1);}
    | DOWHILE                                       {$$ = $1}
    | FUNCION                                       {$$ = $1}
    | LLAMADA PTCOMA                                {if($1){$$ = new LLAMADA.default(this._$.first_line, this._$.first_column, $1);}else{$$="";}}
    | FRETURN                                       {$$ = $1}
    | BREAK PTCOMA                                  {$$ = new BREAK.default(this._$.first_line, this._$.first_column);}
    | CONTINUE PTCOMA                               {$$ = new CONTINUE.default(this._$.first_line, this._$.first_column);}
    | FTERNARIO PTCOMA                              {$$ = $1}
    | ID PT ADD PARIZ EXP PARDER PTCOMA             {$$ = new ADD.default(this._$.first_line, this._$.first_column, $1, $5);}
    | error PTCOMA                                  {ArbolAST.num_error++;ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}
    | error LLAVEDER {ArbolAST.num_error++;ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}

;

FRETURN
    : RETURN PTCOMA                  {$$ = new RETURN.default(this._$.first_line, this._$.first_column);}
    | RETURN EXP PTCOMA              {$$ = new RETURN.default(this._$.first_line, this._$.first_column, $2);}
;

DECLARACION
    :FTIPO ID                                                          {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$2, $1)}
    |FTIPO ID IGUAL EXP                                                {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$2, $1,-1,-1, $4)}
    |FTIPO CORIZ CORDER ID IGUAL NEW FTIPO CORIZ EXP CORDER            {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$4, $1,$9,-1,undefined,$7)}
    |LIST MENOR FTIPO MAYOR ID                                         {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$5, $2, $4,-1,0)}
    |FTIPO CORIZ CORDER ID IGUAL LLAVEIZ L_EXP LLAVEDER                {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$4, $1,new Literal.default(this._$.first_line, this._$.first_column,$7.length,Tipo.tipos.ENTERO),-1, $7)}
    |LIST MENOR FTIPO MAYOR ID IGUAL NEW LIST MENOR FTIPO MAYOR        {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$5, $3, -1,new Literal.default(this._$.first_line, this._$.first_column,0,Tipo.tipos.ENTERO),undefined,$10)}
    |LIST MENOR FTIPO MAYOR ID IGUAL EXP                               {$$ = new DECLARAR.default(this._$.first_line, this._$.first_column,$5, $3,-1,new Literal.default(this._$.first_line, this._$.first_column,0,Tipo.tipos.ENTERO),$7)}
;



ASIGNACION
    :ID IGUAL EXP                                  {$$ = new ASIGNAR.default(this._$.first_line, this._$.first_column, $1,-1, $3);}
    |ID CORIZ CORIZ EXP CORDER CORDER IGUAL EXP    {$$ = new ASIGNAR.default(this._$.first_line, this._$.first_column, $1,$4, $8,"LIST");}
    |ID CORIZ EXP CORDER IGUAL EXP                 {$$ = new ASIGNAR.default(this._$.first_line, this._$.first_column, $1,$3, $6,"VECTOR");}
;

FUNCION
    :FTIPO ID PARIZ PARDER LLAVEIZ LINS LLAVEDER                {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,$1, $2, $6));}
    |FTIPO ID PARIZ PARDER LLAVEIZ LLAVEDER                     {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,$1, $2, []));}
    |FTIPO ID PARIZ PARAMETROS PARDER LLAVEIZ LINS LLAVEDER     {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,$1, $2, $7, $4));}
    |FTIPO ID PARIZ PARAMETROS PARDER LLAVEIZ LLAVEDER          {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,$1, $2, [], $4));}
    |VOID ID PARIZ PARAMETROS PARDER LLAVEIZ LINS LLAVEDER      {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,new Tipo.default(Tipo.tipos.ENTERO), $2, $7, $4,true));}
    |VOID ID PARIZ PARDER LLAVEIZ LINS LLAVEDER                 {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,new Tipo.default(Tipo.tipos.ENTERO), $2, $6, undefined,true));}
    |VOID ID PARIZ PARAMETROS PARDER LLAVEIZ LLAVEDER           {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,new Tipo.default(Tipo.tipos.ENTERO), $2, [], $4,true));}
    |VOID ID PARIZ PARDER LLAVEIZ LLAVEDER                      {$$ = ""; ArbolAST.FUNCIONES.push(new FUNC.default(this._$.first_line, this._$.first_column,new Tipo.default(Tipo.tipos.ENTERO), $2, [], undefined,true));}
    |VOID error LLAVEDER                                        {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}
;

PARAMETROS
    :PARAMETROS COMA FTIPO ID        {$$ = []; $$ = $1; $$.push(new DECLARAR.default(this._$.first_line, this._$.first_column,$4, $3));}
    |FTIPO ID                        {$$ = []; $$.push(new DECLARAR.default(this._$.first_line, this._$.first_column,$2, $1));}
;

FIF
    :IF PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER                                      {$$ = new IF.default(this._$.first_line, this._$.first_column, $3, $6)}
    |IF PARIZ EXP PARDER LLAVEIZ LLAVEDER                                           {$$ = new IF.default(this._$.first_line, this._$.first_column, $3, [])}
    |IF PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER ELSE FIF                             {$$ = new IF.default(this._$.first_line, this._$.first_column, $3, $6, undefined, $9)}
    |IF PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER ELSE LLAVEIZ LINS LLAVEDER           {$$ = new IF.default(this._$.first_line, this._$.first_column, $3, $6, $10)}
    |IF PARIZ EXP PARDER LLAVEIZ LLAVEDER ELSE LLAVEIZ LLAVEDER                     {$$ = new IF.default(this._$.first_line, this._$.first_column, $3, [], [])}
    |IF error LLAVEDER                                                              {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}    
;

FSWITCH
    :SWITCH PARIZ EXP PARDER LLAVEIZ LCASOS DEFAULT DOSPT LINS LLAVEDER             {$$ = new SWITCH.default(this._$.first_line, this._$.first_column,$3,$6, $9)}
    |SWITCH PARIZ EXP PARDER LLAVEIZ LCASOS LLAVEDER                                {$$ = new SWITCH.default(this._$.first_line, this._$.first_column,$3,$6, undefined)}
    |SWITCH PARIZ EXP PARDER LLAVEIZ DEFAULT DOSPT LINS LLAVEDER                    {$$ = new SWITCH.default(this._$.first_line, this._$.first_column,$3,undefined, $8)}
    |SWITCH error PARDER                                                            {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));} 
;

LCASOS
    :LCASOS CASE EXP DOSPT LINS                                                   {$$ = []; $$=$1; $$.push({Case:$3, INS:$5});}
    |CASE EXP DOSPT LINS                                                          {$$ = []; $$.push({Case:$2, INS:$4});}
;

FWHILE
    :WHILE PARIZ EXP PARDER LLAVEIZ LINS LLAVEDER             {$$ = new WHILE.default(this._$.first_line, this._$.first_column, $3, $6);}
    |WHILE PARIZ EXP PARDER LLAVEIZ LLAVEDER                  {$$ = new WHILE.default(this._$.first_line, this._$.first_column, $3, []);}
    |WHILE error LLAVEDER                                     {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}
;

FFOR
    :FOR PARIZ DECLARACION PTCOMA EXP PTCOMA ACTUALIZACION  LLAVEIZ LINS LLAVEDER     {$$ = new FOR.default(this._$.first_line, this._$.first_column, $3, $5, $7, $9, "DEC");}
    |FOR PARIZ ASIGNACION PTCOMA EXP PTCOMA ACTUALIZACION  LLAVEIZ LINS LLAVEDER      {$$ = new FOR.default(this._$.first_line, this._$.first_column, $3, $5, $7, $9, "ASIG");}
    |FOR PARIZ ASIGNACION PTCOMA EXP PTCOMA ACTUALIZACION  LLAVEIZ LLAVEDER           {$$ = new FOR.default(this._$.first_line, this._$.first_column, $3, $5, $7, [], "ASIG");}
    |FOR PARIZ DECLARACION PTCOMA EXP PTCOMA ACTUALIZACION  LLAVEIZ LLAVEDER          {$$ = new FOR.default(this._$.first_line, this._$.first_column, $3, $5, $7, [], "DEC");}
    |FOR error LLAVEDER                                                    {console.log("AQUI"); ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}
;

ACTUALIZACION
    :ASIGNACION PARDER     {$$ = $1}
    | INCREMENTO PARDER    {$$ = new INC.default(this._$.first_line, this._$.first_column, $1);}
    | DECREMENTO PARDER    {$$ = new DEC.default(this._$.first_line, this._$.first_column, $1);}
;

DOWHILE
    :DO LLAVEIZ LINS LLAVEDER WHILE PARIZ EXP PARDER PTCOMA             {$$ = new DOWHILE.default(this._$.first_line, this._$.first_column, $7, $3);}
    |DO LLAVEIZ LLAVEDER WHILE PARIZ EXP PARDER PTCOMA                  {$$ = new DOWHILE.default(this._$.first_line, this._$.first_column, $7, []);}
    |DO error PTCOMA                                                    {ArbolAST.num_error++; ArbolAST.errores.push(new Excepcion.default(ArbolAST.num_error, "Sintactico", "No se esperaba  "+yytext+".", this._$.first_line, this._$.first_column));}
;

LLAMADA
    :ID PARIZ L_EXP PARDER              {$$ = new FUNCION.default(this._$.first_line, this._$.first_column, $1, $3);}
    |ID PARIZ PARDER                    {$$ = new FUNCION.default(this._$.first_line, this._$.first_column, $1, undefined);}
    |EXEC ID PARIZ L_EXP PARDER         {$$ = undefined; ArbolAST.exec.push(new FUNCION.default(this._$.first_line, this._$.first_column, $2, $4));}
    |EXEC ID PARIZ PARDER               {$$ = undefined; ArbolAST.exec.push(new FUNCION.default(this._$.first_line, this._$.first_column, $2, undefined));}
;

FTIPO
    :INT                    {$$ = new Tipo.default(Tipo.tipos.ENTERO);}
    |DOUBLE                 {$$ = new Tipo.default(Tipo.tipos.DOBLE);}
    |CHAR                   {$$ = new Tipo.default(Tipo.tipos.CARACTER);}
    |BOOLEAN                {$$ = new Tipo.default(Tipo.tipos.BOOLEANO);}
    |STRING                 {$$ = new Tipo.default(Tipo.tipos.CADENA);}
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
    |EXP ELEV EXP                                   {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.POTENCIA,this._$.first_line, this._$.first_column, 0
                                                                        , Tipo.tipos.ENTERO, $1, $3)}
    |MENOS EXP %prec UMENOS                         {$$ = new Aritmetica.default(Aritmetica.OperadorAritmetico.RESTA,this._$.first_line, this._$.first_column, 0
                                                                        , Tipo.tipos.ENTERO, $2)}
    |PARIZ EXP PARDER                               {$$ = $2}
    |LISTAVALORES                                   {$$ = $1}
    |EXP MENOR EXP                                  {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "<", $1, $3);}
    |EXP MAYOR EXP                                  {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, ">", $1, $3);}
    |EXP DIFERENTE EXP                              {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "!=", $1, $3);}
    |EXP IIGUAL EXP                                 {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "==", $1, $3);}
    |EXP MAYORIGUAL EXP                             {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, ">=", $1, $3);}
    |EXP MENORIGUAL EXP                             {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "<=", $1, $3);}
    |EXP AND EXP                                    {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "&&", $1, $3);}
    |EXP OR EXP                                     {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "||", $1, $3);}
    |NOT EXP                                        {$$ = new Condicion.default(this._$.first_line, this._$.first_column, 0, "!", $2);}
    |CAST                                           {$$ = $1}
    |FTERNARIO                                      {$$ = $1}
    |INCREMENTO                                     {$$ = $1}
    |DECREMENTO                                     {$$ = $1}
    |NATIVAS                                        {$$ = $1}
    |FTOLOWER                                       {$$ = $1}
    |FTOUPPER                                       {$$ = $1}
    |ID                                             {$$ = new Variable.default(this._$.first_line, this._$.first_column, $1);}
    |LLAMADA                                        {$$ = $1}
    |ID CORIZ  EXP CORDER                           {$$ = new Vector.default(this._$.first_line, this._$.first_column, $1, $3, "VECTOR");}
    |ID CORIZ CORIZ EXP CORDER CORDER               {$$ = new Vector.default(this._$.first_line, this._$.first_column, $1, $4, "LIST");}
;

LISTAVALORES
    :ENTERO             {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.ENTERO)}
    |DOBLE              {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.DOBLE)}
    |CARACTER           {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.CARACTER)}
    |Cadena             {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.CADENA)}
    |TRUE               {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.BOOLEANO)}
    |FALSE              {$$ = new Literal.default(this._$.first_line, this._$.first_column, $1, Tipo.tipos.BOOLEANO)}
;

CAST
    :PARIZ FTIPO PARDER EXP %prec FCAST     {$$ = new Casteo.default(this._$.first_line, this._$.first_column, 0,$2, $4)}
;

L_EXP
    :L_EXP COMA EXP     {$$ = $1; $$.push($3);}
    |EXP                {$$ = []; $$.push($1);}
;

INCREMENTO
    :EXP PLUS            {$$ = new Incremento.default(this._$.first_line, this._$.first_column, $1)}
;

DECREMENTO
    :EXP MIN             {$$ = new Decremento.default(this._$.first_line, this._$.first_column, $1)}
;

FTERNARIO
    :EXP TERNARIO EXP DOSPT EXP     {$$ = new TERNARIO.default(this._$.first_line, this._$.first_column, $1, $3, $5);}
;
                                     
FTOLOWER
    :LOWER PARIZ EXP PARDER       {$$ = new TOLOWER.default(this._$.first_line, this._$.first_column,$3)}
;                        
FTOUPPER
    :UPPER PARIZ EXP PARDER       {$$ = new TOUPPER.default(this._$.first_line, this._$.first_column,$3)}
;                        
NATIVAS
    :LENGTH PARIZ EXP PARDER          {$$ = new NATIVAS.default(this._$.first_line, this._$.first_column, $1, $3);}
    |TRUNCATE PARIZ EXP PARDER        {$$ = new NATIVAS.default(this._$.first_line, this._$.first_column, $1, $3);}
    |ROUND PARIZ EXP PARDER           {$$ = new NATIVAS.default(this._$.first_line, this._$.first_column, $1, $3);}
    |TYPEOF PARIZ EXP PARDER          {$$ = new NATIVAS.default(this._$.first_line, this._$.first_column, $1, $3);}
    |TOSTRING PARIZ EXP PARDER        {$$ = new NATIVAS.default(this._$.first_line, this._$.first_column, $1, $3);}
    |CHARARRAY PARIZ EXP PARDER     {$$ = new NATIVAS.default(this._$.first_line, this._$.first_column, $1, $3);}
;

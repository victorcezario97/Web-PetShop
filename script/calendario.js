var day_of_week = new Array('Dom','Seg','Ter','Qua','Qui','Sex','Sab');
var month_of_year = new Array('Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro');

var Calendar = new Date();

var year = Calendar.getFullYear();       // Retorna o ano
var month = Calendar.getMonth();    // Retorna mes (0-11)
var today = Calendar.getDate();     // Retorna dias (1-31)
var weekday = Calendar.getDay();   // Retorna dia da semana (0-6)

var DAYS_OF_WEEK = 7;    // "constant" para o numero de dias na semana
var DAYS_OF_MONTH = 31;    // "constant" para o numero de dias no mes
var cal;    // Usado para imprimir na tela

Calendar.setDate(1);    // Comecar o calendario no dia '1'
Calendar.setMonth(month);    // Comecar o calendario com o mes atual

// variaveis que auxiliam na criação do calendário
var TR_start = '<TR>';
var TR_end = '</TR>';
var highlight_start = '<TD WIDTH="30"><TABLE CELLSPACING=0 BORDER=1 BGCOLOR=DEDEFF BORDERCOLOR=CCCCCC><TR><TD WIDTH=20><B><CENTER>';
var highlight_end   = '</CENTER></TD></TR></TABLE></B>';
var TD_start = '<TD WIDTH="30" class="dia"><div class="mydropdown" onclick="setService()"><CENTER>';
var TD_end = '</CENTER></div></TD>';

// criação do calendário
cal = '<TABLE BORDER=0 CELLSPACING=0 CELLPADDING=2 ID="calendario"><TR STYLE="height: 25px;">';
cal += '<TD COLSPAN="' + DAYS_OF_WEEK + '" BGCOLOR="#EFEFEF"><CENTER><B>';
cal += month_of_year[month]  + ' ' + year + '</B>' + TD_end + TR_end;
cal += TR_start;

for(index=0; index < DAYS_OF_WEEK; index++) {
  cal += '<TD WIDTH="30" class="dia"><CENTER>' + day_of_week[index] + '</CENTER></TD>'; // concatena strings para a formação do calendário
}

cal += TD_end + TR_end; // concatena strings para a formação do calendário
if (Calendar.getDay() != 0) cal += TR_start;

for(index=0; index < Calendar.getDay(); index++) 
  cal += '<td class="dia"></td>'; // concatena strings para a formação do calendário

for(index=0; index < DAYS_OF_MONTH; index++) {
  if( Calendar.getDate() > index ) {
    week_day =Calendar.getDay();
    if(week_day == 0) cal += TR_start;
    if(week_day != DAYS_OF_WEEK) {
      var day  = Calendar.getDate();
      if( today==Calendar.getDate() )
        cal += '<TD WIDTH="30" class="dia"><div class="mydropdown" id="actual_day" onclick="selectDate('+Calendar.getDate()+', '
                  +(Calendar.getMonth()+1)+', '+Calendar.getFullYear()+')"><CENTER>' + day + TD_end; // concatena strings para a formação do calendário
      else
        cal += '<TD WIDTH="30" class="dia"><div class="mydropdown" onclick="selectDate('+Calendar.getDate()+', '
                  +(Calendar.getMonth()+1)+', '+Calendar.getFullYear()+')"><CENTER>' + day + TD_end; // concatena strings para a formação do calendário
    }
    if(week_day == DAYS_OF_WEEK)
      cal += TR_end; // concatena strings para a formação do calendário
  }
  Calendar.setDate(Calendar.getDate()+1); // incrementa a data
}
cal += '</TABLE>';

//  MOSTRAR CALENDARIO
document.write(cal);
//  End -->
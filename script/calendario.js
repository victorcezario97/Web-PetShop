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

// variaveis que auxiliam na criação do calendário
var TR_start = '<tr>';
var TR_end = '</tr>';
var TD_end = '</center></div></td>';

function createCalendar(actual_month, actual_year) {
  Calendar.setDate(1);    // Comecar o calendario no dia '1'
  Calendar.setMonth(month);    // Comecar o calendario com o mes atual
  // criação do calendário
  cal = '<table border=0 cellspacing=0 cellpadding=2 id="calendario"><tr style="height: 25px;">';
  cal += '<td colspan="' + DAYS_OF_WEEK + '" bgcolor="#EFEFEF"><center><div id="select_left"><div class="select" onclick="lastMonth()">&laquo</div></div><b>';
  cal += month_of_year[month]  + ' ' + year + '</b><div id="select_right"><div class="select" onclick="nextMonth()">&raquo</div></div>' + TD_end + TR_end;
  cal += TR_start;

  for(index=0; index < DAYS_OF_WEEK; index++) {
    cal += '<td width="30" class="dia"><center>' + day_of_week[index] + '</center></td>'; // concatena strings para a formação do calendário
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
        if(today == Calendar.getDate() && month == actual_month)
          cal += '<td width="30" class="dia"><div class="mydropdown" id="actual_day" onclick="selectDate('+Calendar.getDate()+', '
                    +(Calendar.getMonth()+1)+', '+Calendar.getFullYear()+')"><center>' + day + TD_end; // concatena strings para a formação do calendário
        else
          cal += '<td width="30" class="dia"><div class="mydropdown" onclick="selectDate('+Calendar.getDate()+', '
                    +(Calendar.getMonth()+1)+', '+Calendar.getFullYear()+')"><center>' + day + TD_end; // concatena strings para a formação do calendário
      }
      if(week_day == DAYS_OF_WEEK)
        cal += TR_end; // concatena strings para a formação do calendário
    }
    Calendar.setDate(Calendar.getDate()+1); // incrementa a data
  }
  cal += '</table>';
}
//  MOSTRAR CALENDARIO
createCalendar(month, year);
document.write(cal);

function nextMonth(argument) {
  var actual_day = new Date();
  if (month+1 <= actual_day.getMonth()+2) {
    month += 1;
    createCalendar(actual_day.getMonth(), actual_day.getFullYear());
    document.getElementById('calendario').innerHTML = cal;
  }
}

function lastMonth(argument) {
  var actual_day = new Date();
  if (month-1 >= actual_day.getMonth()) {
    month -= 1;
    createCalendar(actual_day.getMonth(), actual_day.getFullYear());
    document.getElementById('calendario').innerHTML = cal;
  }
}
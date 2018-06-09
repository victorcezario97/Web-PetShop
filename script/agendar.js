var day, month, year; // armazenamento volátil da data selecionada e que seja válida (uma data igual ou após a data atual)
var service; // armazenamento volátil do tipo de serviço
var start, end; // intervalo do slot selecionado
var flag = new Array(10).fill(true); // verifica qual slot não está ocupado

var animal_name; // nome do animal
var func_name; // nome do funcionário
/*
for (var i = 0; i < flag.length; i++) {
	if () flag[i] = false; // definir condição para verificar se o slot de horario naquele dia está agendado para tal serviço
}
*/

/*
// adiciona o primeiro nome na lista de veterinarios
function addFirstName(name) {
	var line = '<option value="'+name+'">';
	document.getElementById("Veterinario").innerHTML = line;
}

// adiciona o restante que tiver
function addName(name) {
	var size = document.getElementsByTagName('option').length;
	const div = document.getElementsByTagName('option')[size-1];  
	div.insertAdjacentHTML('afterend', '<option value="'+name+'">');
}

// junção das duas funções anteriores
function add() {
	var name = prompt("digite um nome");
	if (document.getElementsByTagName('option').length == 0) addFirstName(name);
	else addName(name);
}

// implementar para pegar os nomes dos funcionarios no indexedDB
for (var i = 0; i < 10; i++) {
	this.add();
}
*/

// seleção de uma data do calendário
function selectDate(day, month, year) {
	var actual_day = new Date(); // data atual	
	var select_day = new Date(year, month-1, day); // data selecionada

	// verifica se a data selecionada é válida para o agendamento de serviços
	if (actual_day < select_day) {
		this.day = day; // armazena o dia do agendamento
		this.month = month; // armazena o mês do agendamento
		this.year = year; // armazena o ano do agendamento

		document.getElementById('opcoes').style.display = 'block'; // ativa a tela de opções de serviço
		// desativa outras telas que aparecerão
		document.getElementById('horario').style.display = 'none';
		document.getElementById('preenchimento').style.display = 'none';
		document.getElementById('menubtn').style.display = 'none';
	} else { // caso não seja uma data válida para o agendamento
		// não mostra nada
		document.getElementById('opcoes').style.display = 'none';
		document.getElementById('horario').style.display = 'none';
		document.getElementById('preenchimento').style.display = 'none';
		document.getElementById('menubtn').style.display = 'none';
	}

	// sempre ativar o scroll se for precisar deslizar a tela para baixo ou para cima
	document.getElementsByClassName('menu_body')[0].style.overflowY = 'scroll';	
}

// seleção do tipo de serviço
function selectService(service) {
	this.service = service; // armazena o tipo de serviço
	if (service != 'hospedagem') { // se não for de hospedagem de animal 
		// mostra a tela de opção de  tipo de serviços
		document.getElementById('opcoes').style.display = 'none';
		document.getElementById('horario').style.display = 'block';
		document.getElementById('preenchimento').style.display = 'none';
		document.getElementById('menubtn').style.display = 'none';
	} else {
		
	}

	// mantem ativado o scroll
	document.getElementsByClassName('menu_body')[0].style.overflowY = 'scroll';	
}

// seleção de um slot de horário do serviço
function selectSlot(start, end, index) {
	// salva o intervalo do slot
	this.start = start;
	this.end = end;

	if (flag[index]) { // verifica se esse slot está vazio
		// se estiver, mostra a opção de preenchimento do nome do animal e do nome do funcionário que deseja que atenda
		document.getElementById('opcoes').style.display = 'none';
		document.getElementById('horario').style.display = 'none';
		document.getElementById('preenchimento').style.display = 'block'; // mostra a tela de preenchimento
		document.getElementById('menubtn').style.display = 'block'; // mostra um botão para confirmar o agendamento
		document.getElementsByClassName('menu_body')[0].style.overflowY = 'hidden'; // desativa o overflow, pois não é necessário
	}
}

// implementar para salvar os dados coletados no indexedDB
function saveDataBase() {
	this.animal_name = document.getElementById('animal').value;
	this.func_name = document.getElementById('funcao').value;

	console.log(animal_name);
	console.log(func_name);
}

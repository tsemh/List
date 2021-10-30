const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

//Criando uma tag " li "
function criaLi() {
    const li = document.createElement('li');
    return li;
}
// keypress -> evento de pressionar a tecla // keyup -> pressionar e solta //keydown -> pressionar e deixar pressionado.
inputTarefa.addEventListener('keypress', function(e) { 
    if (e.keyCode === 13) {         // Aqui pedimos que caso o codigo chave do botão (código que aparece ao apertar um botão//é necessario ter chamado 'keyprerss' "escutador") 
        if (!inputTarefa.value) return; //pressionado for igual a 13 ele pode executar a próxima linha 
        criaTarefa(inputTarefa.value);  // assim que essa linha for executada ela cria uma tarefa
    }
} ); 

// Função para limpar o input ( a caixa para escrever ) depois de criar uma tarefa
function limpaInput() {
    inputTarefa.value = ''; // Aqui estamos dizendo que o valor a ser retornado quando a função " limpaInput " for executada é vazio, ou seja, retorna nada.
    inputTarefa.focus();   // " focus " é o evento de clicar e a seta ficar piscando mostrando que foi clicado em uma caixa de busca por exemplo    
}

// Criando uma função para apagar itens da lista. 
function criaBotaoApagar(li) {
    li.innerText += '  '; //Adicionando um espaço entre o botão eo texto.
    const botaoApagar = document.createElement('button');   //criando o botão
    botaoApagar.innerText = 'Apagar';   // Selecionando o botão e colocando um texto.
    li.appendChild(botaoApagar); // Adicionando o botão de apagar na tag " li ".
    botaoApagar.setAttribute('class', 'apagar') // Setando um atributo ao botão (class, id, ref etc...) e definindo 'apagar' como valor ou seja, ficou class="apagar".
    botaoApagar.setAttribute('title', 'apagar está tarefa') // Adicionando um titulo ao botão.
}

// Função para criar as tarefas
function criaTarefa(textoInput) {
    const li = criaLi();                 // Aqui não estou redeclarando a constante " li ", estou criando uma nova constante e dando o valor de " li " de " criaLi " para ela.
    li.innerText = textoInput;           // Selecionando  a tag " li " e a deixando ser alterada textoInput
    tarefas.appendChild(li);             /// Selecionando a a constante tarefas que chama a tag " lu " que tem como class "tarefas" e adicionando o " li " a ela.
    limpaInput();                 //chamando a função " limpaInput " para ele funcionar após a tarefa ser criada.
    criaBotaoApagar(li);         // Chamando a função " criaBotaoApagar "  para ele ser criado junto da tarefa.
    salvarTarefas();
}

//Criando um " escutador " de eventos para o " btnTarefa " que no caso é o botão que adiciona tarefas.
btnTarefa.addEventListener('click', function(e) {
    if (!inputTarefa.value) return;     // Aqui dizemos que caso o input não tenha valor sobre ele, não é para retornar nada "
    criaTarefa(inputTarefa.value);      // Aqui criamos uma tarefa ao executar a função de evento do botão 
});

document.addEventListener('click', function(e){
    const el = e.target; // Para saber qual elemento está sendo clicado

    if (el.classList.contains('apagar')) { // Se a class for " apagar "
        el.parentElement.remove();          // Selecionando o pai do elemento clicado e pedindo para remove-lo.
        salvarTarefas();
    }
});

//função para salvar as tarefas criadas.
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li'); // Armazenando as terefas na constante liTarefas.
    const listaDeTarefas = []; 

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); // Tirando a palavra apagar dos textos a serem salvos e apagando os espaços ao final dos textos com (.trim).
        listaDeTarefas.push(tarefaTexto); // Colocando os texto a serem salvos em um array
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); // Transformando o array em uma string em formato JSON para poder ser salva. 
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas); // Convertendo as tarefas de volta para array

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();
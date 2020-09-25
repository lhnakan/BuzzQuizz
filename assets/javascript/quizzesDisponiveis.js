function chamarListaQuizzes(tokenAcesso){
    var url = 'https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes';
    var config = {
        headers: {
            'User-Token': tokenAcesso ,
        }
    };
    var acessoListaQuizzes = axios.get(url, config);
    acessoListaQuizzes.then(acessoLiberado).catch(erroAcesso);   
}
function erroAcesso(infos){
    console.log(infos.data);
    window.location.reload();
}
function acessoLiberado(infos){
    dadosdoquizz = infos.data;
    limparTelaAtual();
    telaListaQuizzes(infos);
}

function telaListaQuizzes(infos){    
    var quizzesSalvos = infos.data;
    console.log(quizzesSalvos);
    document.querySelector("header").style.display = "block";
    secao1.classList.remove("telaLogin");
    secao1.classList.remove("criarQuizzes");
    secao1.classList.add("listaQuizzes");
    var tamanhoListaQuizes = quizzesSalvos.length;
    var ul = document.createElement("ul");
    ul.innerHTML = "<li class='botaoCriar'><button onclick='adicionarNovoQuizz()'><div><p>Novo</p><p>Quizz</p></div><ion-icon name='add-circle'></ion-icon></button></li>"
    
    // espaco pra repetir append li se necesario
    for(var i = 0; i < tamanhoListaQuizes; i++){
        // espaco pra repetir creat li se necessario
       
        ul.innerHTML += "<li><button onclick='quizzgame(" + i + ")'><p>" + infos.data[i].title + "</p></button></li>";
        secao1.appendChild(ul);
    }    
    
}
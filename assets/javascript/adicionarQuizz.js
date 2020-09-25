function adicionarNovoQuizz(){
    limparTelaAtual();
    secao1.classList.remove("listaQuizzes");
    secao1.classList.add("criarQuizzes");
    secao2.classList.add("criarQuizzes");
    secao1.innerHTML = "<input type='text' placeholder='Digite o titulo do seu quizz'>";
    
    var ulp = document.createElement("ul");
    secao1.appendChild(ulp);
    var uln = document.createElement("ul");
    secao2.appendChild(uln);
    
    adicionarPerguntasNovoQuizz();
    secao1.innerHTML += "<ion-icon onclick='adicionarPerguntasNovoQuizz()' name='add-circle'></ion-icon>";
    adicionarNivelNovoQuizz();
    secao2.innerHTML += "<ion-icon onclick='adicionarNivelNovoQuizz()' name='add-circle'></ion-icon>";
    secao2.innerHTML += "<button onclick='publicarQuizz()' > PUBLICAR </button>";
}
function adicionarPerguntasNovoQuizz(){
    contPerguntas++;
    var ul = document.querySelector("#s1 ul")
    var li = document.createElement("li");
    
    li.innerHTML = "<h3>Pergunta " + contPerguntas + "</h3>"
    li.innerHTML += "<input type='text' placeholder='Digite a pergunta'>"
    li.innerHTML += "<div class='corretos'><input type='text' placeholder='Digite a resposta correta'><input type='url' placeholder='Link para imagem correta'></div>"
    li.innerHTML += "<div><input type='text' placeholder='Digite a resposta errada 1'><input type='url' placeholder='Link para imagem errada 1'></div>"
    li.innerHTML += "<div><input type='text' placeholder='Digite a resposta errada 2'><input type='url' placeholder='Link para imagem errada 2'></div>"
    li.innerHTML += "<div><input type='text' placeholder='Digite a resposta errada 3'><input type='url' placeholder='Link para imagem errada 3'></div>";
    li.classList.add("perguntas");
    li.classList.add("p" + contPerguntas);

    ul.appendChild(li);  
}
function adicionarNivelNovoQuizz(){
    contNiveis++;
    var ul = document.querySelector("#s2 ul")
    var li = document.createElement("li");

    li.innerHTML = "<h3>Nivel " + contNiveis + "</h3>"
    li.innerHTML += "<div><input type='text' placeholder='% Minima de Acerto do nivel'><input type='text' placeholder='% Maxima de Acerto do nivel'></div>"
    li.innerHTML += "<input type='text'  placeholder='Titulo do nivel'>"
    li.innerHTML += "<input type='text'  placeholder='Link da imagem do nivel'>"
    li.innerHTML += "<input type='text' placeholder='Descricao do nivel'>"
    li.classList.add("niveis")
    li.classList.add("n" + contNiveis);

    ul.appendChild(li);   
}
function publicarQuizz(){
    gravarDadosPerguntas();
    gravarDadosNiveis();
    console.log(camposInputs);

    var url = 'https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes'
    var config = {
        headers: {
            "User-Token": tokenAcesso ,
        }
    };
    var camposInputs = {
        title: titulosQuizzAdicionados ,
        data: {
            perguntas: [{
                titulo: perguntasAdicionadas ,
                respostas: respostasAdicionadas
            }] ,
            niveis: [{
                titulo: titulosNiveisAdicionados ,
                porcentagens: minMaxAdicionados ,         
                link: linksNiveisAdicionados ,
                descricao: descricoesNiveisAdicionados 
            }]
        }               
    }    
    var data = camposInputs;
    var salvarNovoQuizz = axios.post(url, data, config);
    salvarNovoQuizz.then(sucessoAddNovoQuizz).catch(erroAddNovoQuizz);
}
function gravarDadosPerguntas(){
    var inputsQuizz = [];
    
    for (let i = 1; i <= contPerguntas; i++){
        var perguntas = [];
        var respostas = [];

        titulosQuizzAdicionados = (document.querySelector('#s1 > input').value);
        inputsQuizz = document.querySelectorAll(".p" + i + " input");
    
        perguntas.push(inputsQuizz[0].value);
        for(let i = 1; i < inputsQuizz.length; i++){
            respostas.push(inputsQuizz[i].value);
        }

        perguntasAdicionadas.push(perguntas);
        respostasAdicionadas.push(respostas);        
    }
}
function gravarDadosNiveis(){
    var inputsQuizz = [];
    
    for (let i = 1; i <= contNiveis; i++){
        var minMax = [];
        var titulos = [];
        var links = [];
        var descricoes = [];
        
        inputsQuizz = document.querySelectorAll(".n" + i + " input");
    
        minMax.push(inputsQuizz[0].value);
        minMax.push(inputsQuizz[1].value);
        titulos.push(inputsQuizz[2].value);
        links.push(inputsQuizz[3].value);
        descricoes.push(inputsQuizz[4].value);
    
        minMaxAdicionados.push(minMax);
        titulosNiveisAdicionados.push(titulos)
        linksNiveisAdicionados.push(links);
        descricoesNiveisAdicionados.push(descricoes);
    }
}
function sucessoAddNovoQuizz(informacoes){    
    console.log(informacoes);    
    chamarListaQuizzes(tokenAcesso);
}
function erroAddNovoQuizz(informacoes){
    console.log(informacoes);
    alert("Erro ao adicionar novo Quizz, tente mais tarde.")
    chamarListaQuizzes(tokenAcesso);
}
function quizzgame(seletor){ 
    seletorQuizz = seletor;
    limparTelaAtual();
    
    secao1.classList.remove("listaQuizzes");
    secao2.classList.remove("listaQuizzes");
    secao1.classList.add("jogandoQuizz");
    
    var tituloQuizz = document.querySelector(".tituloQuizz");
    tituloQuizz.innerHTML = "<h1>" + dadosdoquizz[seletor].title + "</h1>"; 

    renderizarQuizzDaRodada(seletor)
}
function renderizarQuizzDaRodada(seletor){
    var pergunta = dadosdoquizz[seletor].data.perguntas[0];
    var quantidadePerguntas = pergunta.titulo.length;

    var perguntasQuizz = pergunta.titulo[contadorJogadas];
    var respostasQuizz = pergunta.respostas[contadorJogadas];

    var conjuntosRespostas = [];
    
    if(contadorJogadas < quantidadePerguntas){
        for(let i = 0; i < respostasQuizz.length; i++){
        
            var resposta = [];
            resposta.push(respostasQuizz[i]);
            resposta.push(respostasQuizz[i+1]);
            conjuntosRespostas.push(resposta);
            i++;
        }
        var respostasAlternadas = conjuntosRespostas.sort(embaralhar);
        console.log(respostasAlternadas);
        

        secao1.innerHTML = "<div>" + perguntasQuizz + "</div>"

        var ul = document.createElement("ul");
        secao1.appendChild(ul);

        for(let i = 0; i < respostasAlternadas.length; i++){
            var li = document.createElement("li");
            li.innerHTML = "<img src=" + respostasAlternadas[i][1] + "><span>" + respostasAlternadas[i][0] + "</span>";
            li.setAttribute("onclick", "opcaoSelecionada(this)");

            ul.appendChild(li);
        }
        contadorJogadas++;
    }else{
        resultadoQuizz(quantidadePerguntas);
    }   
}
function opcaoSelecionada(marcar){
    var testeResposta = marcar.querySelector("span").textContent;
    var respostaCerta = dadosdoquizz[seletorQuizz].data.perguntas[0].respostas[contadorJogadas-1][0];
    if(testeResposta === respostaCerta){
        acertos++;
    }
    var liResposta = document.querySelectorAll("li");
    var marcarCertoErrado = document.querySelectorAll("span");
    for(let i = 0; i < marcarCertoErrado.length; i++){
        if(marcarCertoErrado[i].textContent !== respostaCerta){
            liResposta[i].classList.add("errado"); 
        } else{
            liResposta[i].classList.add("certo");
        }
    }
    setTimeout(trocarPerguntaQuizz, 2000);
}
function trocarPerguntaQuizz(){
    limparTelaAtual();
    renderizarQuizzDaRodada(seletorQuizz);
}
function resultadoQuizz(quantidadePerguntas){ 
    secao1.classList.remove("jogandoQuizz");
    secao1.classList.add("telaResultadoQuizz"); 
    
    var resultado = Math.round((acertos*100)/quantidadePerguntas);

    var nivel = dadosdoquizz[seletorQuizz].data.niveis[0];
    var quantidadeNiveis = nivel.titulo.length;
    var porcentagens = nivel.porcentagens;

    for(let i = 0; i < quantidadeNiveis; i++){
        var minimo = porcentagens[i][0];
        var maximo = porcentagens[i][1];
        if(resultado <= maximo && resultado >= minimo){
            var seletorNivel = i;
        }
    }

    secao1.innerHTML = "<div><span>Voce acertou " + acertos + " de " + quantidadePerguntas + " perguntas!</span><span>Score: " + resultado + "%</span></div>"
    
    var ul = document.createElement("ul");
    secao1.appendChild(ul);
    
    var li = document.createElement("li");
    
    li.innerHTML = "<h3>" + nivel.titulo[seletorNivel] + "</h3>";
    li.innerHTML += "<p>" + nivel.descricao[seletorNivel] + "</p>"
    
    ul.appendChild(li);
    
    var limg = document.createElement("li");
    limg.innerHTML = "<img src=" + nivel.link[seletorNivel] + "></img>";
    ul.appendChild(limg);
}
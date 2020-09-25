//----VARIAVEIS GLOBAIS
var tokenAcesso;
var dadosdoquizz;

var contPerguntas = 0;
var contNiveis = 0;

var titulosQuizzAdicionados = "";
var perguntasAdicionadas = [];
var respostasAdicionadas = [];
var minMaxAdicionados = [];
var titulosNiveisAdicionados = []
var linksNiveisAdicionados = [];
var descricoesNiveisAdicionados = [];

var secao1 = document.querySelector("#s1");
var secao2 = document.querySelector("#s2");


function iniciarQuizz(){
    var emailUsuario = document.querySelector(".email").value;
    var senhaUsuario = document.querySelector(".senha").value;
    var emailSenha = {
        email: emailUsuario ,
        password: senhaUsuario
    };
    if(emailUsuario !== "" && senhaUsuario !== ""){
        document.querySelector(".entrar").disabled = true;   
        var login = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users', emailSenha);
        login.then(emailSenhaCorretos).catch(emailSenhaIncorretos);
    } else{
        alert('E-mail e/ou senha incompletos, por favor preencha corretamente.');
        
    }    
}
function emailSenhaCorretos(dados){      
    tokenAcesso = dados.data.token;    
    chamarListaQuizzes(tokenAcesso);
}
function emailSenhaIncorretos(){
    alert('E-mail/Senha incorretos, por favor tente denovo.');
    document.querySelector(".entrar").disabled = false;
}

// --------FUNCOES GERAIS------------

function limparTelaAtual(){    
    secao1.innerHTML = "";
    secao2.innerHTML = "";
}
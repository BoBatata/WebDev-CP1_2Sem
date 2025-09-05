let jogadoras = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/17340952198d8818c8e140c64c743113f563cf750f.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/175094526199472a1c51895312eb49e4ae3cdac3bf.png",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/1750946630c7b03782920d35145eb4c97556d194a3.png",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/17509469717a68443f5c80d181c42967cd71612af1.png",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/1750946369cdcb2f5c7b071143529ef7f2705dfbc4.png",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
]

window.onload = function(){
    loadCards();
    displayPlayers();

    document.querySelector("#novaJogadora").addEventListener("submit", addJogadora);

    saveCards();
}


// Carrega os Cards e exibe na página.
function displayPlayers(){
    const playerCardList = document.getElementById('cardList');
    playerCardList.innerHTML = '';

    jogadoras.forEach((cardInfo, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add("card-jogadora");
        
        cardElement.innerHTML = `
            <img src="${cardInfo.foto}" alt="${cardInfo.nome}" class="card-jogadora">
            
            <h1 class="jogadorasInfos">${cardInfo.nome}</h1>
            
            <h2 class="jogadorasInfos">${cardInfo.posicao}</h2>
            
            <p class="jogadorasInfos">${cardInfo.clube}</p>
            
            <p class="jogadorasInfos">${cardInfo.gols}</p>
            
            <p class="jogadorasInfos">${cardInfo.assistencias}</p>
            
            <p class="jogadorasInfos">${cardInfo.jogos}</p> 

            ${cardInfo.favorita 
                ? `<img src="./images/starOn.png" alt="Favorita" style="max-width:50px;" class="estrla" data-index="${index}">` 
                : `<img src="./images/starOff.png" alt="Não favorita" style="max-width:50px;" class="star" data-index="${index}">`}
            <button class="btnEditar" data-index="${index}">Editar</button>
        `;

        playerCardList.append(cardElement);
    })
}

//Salva o banco de dados no localStorage e transforma em um JSON.
function saveCards(){
    localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
}

//Carrega o banco de dados do localStorage e transforma em um objeto.
function loadCards(){
    const playersInfo = localStorage.getItem("jogadoras");

    if(playersInfo){
        jogadoras = JSON.parse(playersInfo);
    }
}


// ----------- CREATE -------------

// PASSO A PASSO: 
// 1- Ouvir o evento de envio de formulario
function addJogadora(event){
    event.preventDefault(); // evita o reload da página

    const nome = document.querySelector("#nome").value;
   
    const posicao = document.querySelector("#posicao").value;
    const clube = document.querySelector("#clube").value;
    const foto = document.querySelector("#foto").value;
   
    const gols = document.querySelector("#gols").value;
    const assistencias = document.querySelector("#assistencias").value;
    const jogos = document.querySelector("#jogos").value;

    const novaJogadora = {
        nome: nome,
        posicao: posicao,
        clube: clube,
        foto: foto,
        gols: Number(gols), // Converter para número
        assistencias: Number(assistencias),
        jogos: Number(jogos),
        favorita: false,
        date: new Date().toLocaleString() 
    }

    if (!nome || !posicao || !clube || !foto || !gols || !assistencias || !jogos) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    jogadoras.unshift(novaJogadora); // UNSHIFT: Adiciona a nova jogadora no inicio do array

    alert("Jogadora adicionada com sucesso!");
    document.querySelector("#novaJogadora").reset(); // Limpa o formulário

    displayPlayers();
    saveCards();
}


// ----------- UPDATE -------------

function editarInfo(index){
    const novaInfo = prompt('Editar informações da jogadora:');
    posts[index].text = novoTexto;

    salvarPosts();

    displayPosts();
}

function salvarPosts(){
    localStorage.setItem("posts", JSON.stringify(posts)); // Transforma em string (imagens e etc)
}

function carregarPosts(){
    const postsGuardados = localStorage.getItem("posts");
    if(postsGuardados){
        posts = JSON.parse(postsGuardados)
    }
}



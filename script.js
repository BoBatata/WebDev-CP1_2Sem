let jogadoras = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
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
        
        cardElement.innerHTML = `
            <h1>${cardInfo.nome}</h1>
            <h2>${cardInfo.posicao}</h2>
            <p>${cardInfo.clube}</p>
            <img src="${cardInfo.foto}"> </img>
            <p>${cardInfo.gols}</p>
            <p>${cardInfo.assistencias}</p>
            <p>${cardInfo.jogos}</p>
            ${cardInfo.favorita ? `<img src="/images/starOff.png" alt="Imagem do post" style="max-width:50px;">` : `<img src="/images/starOn.png" alt="Imagem do post" style="max-width:50px;">`}
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

    jogadoras.unshift(novaJogadora); // UNSHIFT: Adiciona a nova jogadora no inicio do array

    alert("Jogadora adicionada com sucesso!");
    document.querySelector("#novaJogadora").reset(); // Limpa o formulário

    displayPlayers();
    saveCards();
}

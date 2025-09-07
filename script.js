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
    removeJogadora();
    setupFiltros();

    document.querySelector("#novaJogadora").addEventListener("submit", addJogadora);

    saveCards();
}


// Carrega os Cards e exibe na página.
function displayPlayers(jogadorasFiltradas = jogadoras){
    const playerCardList = document.getElementById('cardList');
    playerCardList.innerHTML = '';

    jogadorasFiltradas.forEach((cardInfo, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add("card-jogadora");
        
        cardElement.innerHTML = `
            <img src="${cardInfo.foto}" alt="${cardInfo.nome}" class="card-jogadora">
            
            <h1 class="jogadorasInfos">Nome: ${cardInfo.nome}</h1>
            
            <h2 class="jogadorasInfos">Posição: ${cardInfo.posicao}</h2>
            
            <p class="jogadorasInfos">Clube: ${cardInfo.clube}</p>
            
            <p class="jogadorasInfos">Gols: ${cardInfo.gols}</p>
            
            <p class="jogadorasInfos">Assistências: ${cardInfo.assistencias}</p>
            
            <p class="jogadorasInfos">Jogos: ${cardInfo.jogos}</p> 

            ${cardInfo.favorita 
                ? `<img src="./images/starOn.png" alt="Favorita" style="max-width:30px;" class="starFavorita" data-index="${index}">` 
                : `<img src="./images/starOff.png" alt="Não favorita" style="max-width:30px;" class="starFavorita" data-index="${index}">`}
            <button class="btnEditar" onclick="enableEdit(${index})">Editar</button>
            <button class="btnExcluir" data-index="${index}">Excluir</button>
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
    removeJogadora();
    saveCards();
}

// ----------- EDITAR/UPDATE -------------

function enableEdit(index) {
  const card = document.querySelectorAll('#cardList > div')[index]; 
  const infos = card.querySelectorAll('.jogadorasInfos'); 
  const img = card.querySelector('img');
  img.outerHTML = `<input type="text" value="${img.src}" class="editFoto" />`;

  infos.forEach(info => {
    info.contentEditable = "true";   
    info.style.border = "1px traced #e9c5d5"; 
  });

  
  const btn = card.querySelector('.btnEditar');
  btn.textContent = "Salvar";
  btn.onclick = function () { saveEdit(index) }; 
}

function saveEdit(index) {
  const card = document.querySelectorAll('#cardList > div')[index]; 
  const infos = card.querySelectorAll('.jogadorasInfos');
  const newFoto = card.querySelector('.editFoto').value;


  jogadoras[index].nome = infos[0].textContent;
  jogadoras[index].posicao = infos[1].textContent;
  jogadoras[index].clube = infos[2].textContent;
  jogadoras[index].gols = Number(infos[3].textContent);
  jogadoras[index].assistencias = Number(infos[4].textContent);
  jogadoras[index].jogos = Number(infos[5].textContent);
  jogadoras[index].foto = newFoto;

  saveCards(); 
  displayPlayers(); 
  removeJogadora(); // Reativa os event listeners
}


// ----------- DELETE -------------

function removeJogadora() {
    // Adiciona evento de clique a todos os botões "Excluir"
    document.querySelectorAll(".btnExcluir").forEach(function(botaoExcluir) {
        botaoExcluir.addEventListener("click", function() {
            // Coleta o índice da jogadora a ser excluída através do atributo data-index
            const index = parseInt(botaoExcluir.getAttribute('data-index'));
            const confirmacao = confirm("Tem certeza que deseja excluir esta jogadora?");
            if (confirmacao) {
                // Remove a jogadora do array usando o índice
                jogadoras.splice(index, 1);
                displayPlayers();
                removeJogadora(); 
                saveCards();
                alert("Jogadora removida com sucesso!");
            }
        });
    });
}

// ----------- FILTROS E BUSCA -------------

function setupFiltros() {
    // Busca por nome ou posição
    document.querySelector("#buscarNome").addEventListener("input", aplicarFiltros);
    
    // Filtro por time
    document.querySelector("#filtroTime").addEventListener("change", aplicarFiltros);
    
    // Ordenar por nome
    document.querySelector("#ordenarNome").addEventListener("click", function() {
        jogadoras.sort((a, b) => a.nome.localeCompare(b.nome));
        aplicarFiltros();
    });
    
    // Ordenar por posição
    document.querySelector("#ordenarPosicao").addEventListener("click", function() {
        jogadoras.sort((a, b) => a.posicao.localeCompare(b.posicao));
        aplicarFiltros();
    });
}

function aplicarFiltros() {
    const busca = document.querySelector("#buscarNome").value.toLowerCase();
    const timeFilter = document.querySelector("#filtroTime").value;
    
    let jogadorasFiltradas = jogadoras;
    
    // Filtro por nome ou posição
    if (busca) {
        jogadorasFiltradas = jogadorasFiltradas.filter(jogadora => 
            jogadora.nome.toLowerCase().includes(busca) || 
            jogadora.posicao.toLowerCase().includes(busca)
        );
    }
    
    // Filtro por time
    if (timeFilter) {
        jogadorasFiltradas = jogadorasFiltradas.filter(jogadora => 
            jogadora.clube === timeFilter
        );
    }
    
    displayPlayers(jogadorasFiltradas);
    removeJogadora();
}


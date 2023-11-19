
let carrinho = []
atualizarTabela()

// create -------------------------------------------------

function inserirCarrinho(){

    const btProduto = this;

    const card = btProduto.closest('.card');
    const boxImg = card.querySelector('.box').innerHTML;
    const produto = card.querySelector('.nome-produto').innerText;
    const valor = card.querySelector('.valor-produto').innerText;

    const compras = {
        boxImg: boxImg,
        produto: produto,
        valor: valor,
    };

    carrinho = getStorage()
    carrinho.push(compras)
    setStorage(carrinho)

    atualizarTabela()
}
//----------------------------------------------------

// evento ------------------------------------------------
const btAdicionar = document.querySelectorAll('.btAdicionar');
btAdicionar.forEach(function (botao) {
    botao.addEventListener("click", inserirCarrinho);
});


// local storage -------------------------------------------

function setStorage(carrinho){
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
}

function getStorage(){
    return JSON.parse(localStorage.getItem("carrinho"))|| []
}
//--------------------------------------------------------------

// remover---------------------------------------------------

function remover(index){
    carrinho = getStorage()
    carrinho.splice(index,1)
    setStorage(carrinho)

    atualizarTabela()
    location.reload()
}
//-------------------------------------------------------------

// criando tabela------------------------------------

function criarTabela(carrinho,index){
    let tabela = document.createElement('tr')

    tabela.innerHTML = `

    <th class="coluna1">
        <div class="box">${carrinho.boxImg}</div></th>
    <th class="coluna2">
        <h3>${carrinho.produto}</h3>
        <h4>${carrinho.valor}</h4>
        <span>Quantity</span>
        <div class="qtd-input">
            <i class="fa-solid fa-minus"></i>
            <input type="text" name="qtd" id="qtd" value="1" readonly>
            <i class="fa-solid fa-plus"></i>
        </div>
        <ol>
            <li>
                <i class="fa-regular fa-heart"></i>
                Add to Wishlist
            </li>
        </ol>
    </th>
    <th class="coluna3">
        <h4>${carrinho.valor}</h4>
        <ol>
            <li onclick='remover(${index})'>
                <i class="fa-regular fa-trash-can"></i>
                Remove
            </li>
        </ol>
    </th>

    `
    document.querySelector('#tabela-carrinho>thead').appendChild(tabela)
}
//------------------------------------------------------

// limpando duplicado

function limparTabela(){
    let duplicado = document.querySelectorAll('#tabela-carrinho>thead')
    duplicado.innerHTML = ""
}

//------------------------------------------------------

//mostrar informações

function atualizarTabela(){
    carrinho = getStorage()
    limparTabela()
    carrinho.forEach(criarTabela)
}
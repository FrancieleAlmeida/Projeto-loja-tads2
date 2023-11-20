let carrinho = []
atualizarTabela()
notificacao()
valorTotal()

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
    notificacao()
    atualizarTabela()

}
//----------------------------------------------------

function notificacao(){
    const carrinho = getStorage();
    const qtd = document.querySelector(".compra-qtd");
    let somaQtd = carrinho.length;

    if(somaQtd != 0){
    qtd.innerHTML = `${somaQtd}`;
    }else{
        qtd.innerHTML = ""
    }
    
}

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
    notificacao()
    location.reload()
}
//-------------------------------------------------------------

// criando tabela------------------------------------

function criarTabela(carrinho,index){
    if (document.querySelector('.main-carrinho')) {
        let tabela = document.createElement('tr')

        tabela.innerHTML = `

        <th class="coluna1">
            <div class="box">${carrinho.boxImg}</div></th>
        <th class="coluna2">
            <h3>${carrinho.produto}</h3>
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
        document.querySelector("#tabela-carrinho>thead").appendChild(tabela)
    }

    valorTotal()

}
//------------------------------------------------------

// limpando duplicado

function limparTabela(){
    let duplicado = document.querySelectorAll("#tabela-carrinho>thead")
    duplicado.innerHTML = ""
}

//------------------------------------------------------

//mostrar informações

function atualizarTabela(){
    const carrinho = getStorage()
    limparTabela()
    carrinho.forEach(criarTabela)
}
//---------------------------------------------------------

// total carrinho-----------------------------------------

function valorTotal(){
    if (document.querySelector('.main-carrinho')) {
        carrinho = getStorage()


        if(carrinho.length===0){
            document.querySelector(".tabela2").style.display = "none";
            document.querySelector(".tabela>h2").style.display = "flex";


        }else{
            let vTotal = document.querySelector(".v-total")
            const qtdItem = document.querySelector(".qtd-item")
            let somaQtd = carrinho.length;
            if(somaQtd != 0){
                qtdItem.innerHTML = `${somaQtd}`
            }
            let total = 0
            for(let i = 0; i < carrinho.length; i++){
                const itemValor = carrinho[i]
                let novoValor = parseFloat(itemValor.valor.replace("R$", "").replace("," , "."))
                total+=novoValor
            }

            vTotal.innerHTML= `${total.toFixed(2).replace("", "R$ ").replace(".", ",")}`
        }

    }

}
//-----------------------------------------------------------------------------------------
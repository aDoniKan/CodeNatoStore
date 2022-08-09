class Menu {
  #carrinho;
  #listaMenuHTML;

  constructor(carrinho) {
    this.#carrinho = carrinho;
    this.#listaMenuHTML = document.getElementById("lista-menu");
  }

  get carrinho () {
    return this.#carrinho;
  }

  set carrinho (carrinho) {
    if (!(carrinho instanceof Carrinho)) throw new Error('O carrinho deve ser instancia da classe Carrinho');

    this.#carrinho = carrinho;
  }

  exibeMenuTela () {
    const produtos = Banco.pegaTodosProdutos();
    produtos.forEach(produto => {
      const itemMenuHTML = this.#criarItemMenu(produto);
      this.#listaMenuHTML.appendChild(itemMenuHTML);
    });
  }

  #criarItemMenu (produto) {
    let menuItemHTML = document.createElement("div");
    menuItemHTML.className = "item-menu";

    let textoMenuHTML = document.createElement("span");
    textoMenuHTML.className = "texto-menu";
    textoMenuHTML.innerText = produto.nome + " - " + "R$" + produto.valor;

    let acaoMenuHTML = document.createElement("span");
    acaoMenuHTML.className = "acao-menu";

    const self = this;
    let botaoAdicionarHTML = document.createElement("button");
    botaoAdicionarHTML.className = "botao-adicionar";
    botaoAdicionarHTML.innerText = "+";
    botaoAdicionarHTML.dataset.produtoId = produto.id;
    botaoAdicionarHTML.dataset.acao = 'adicionar';
    botaoAdicionarHTML.onclick = function (evento) { self.#carrinho.adicionarRemoverProduto(evento) };

    acaoMenuHTML.appendChild(botaoAdicionarHTML);

    menuItemHTML.appendChild(textoMenuHTML);
    menuItemHTML.appendChild(acaoMenuHTML);

    return menuItemHTML;
  }

}

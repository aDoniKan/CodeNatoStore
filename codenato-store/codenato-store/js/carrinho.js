class Carrinho {
  #items;
  #listaCarrinhoHTML;
  #totalCarrinhoHTML;

  constructor() {
    this.#items = [];
    this.#listaCarrinhoHTML = document.getElementById('lista-carrinho');
    this.#totalCarrinhoHTML = document.getElementById('quantidade-total');
  }

  get items () {
    return this.#items;
  }

  set items (items) {
    if (!Array.isArray(items)) throw new Error('Os items do carrinho devem ser do tipo array');

    items.forEach(item => {
      if (!(item instanceof CarrinhoItem)) throw new Error('Os items da lista devem ser instancia da classe CarrinhoItem');
    });

    this.#items = items;
  }

  get quantidadeTotal () {
    let total = 0;
    this.#items.forEach(item => total += item.quantidade);
    return total;
  }

  get somaTotal () {
    let total = 0;
    this.#items.forEach(item => total += item.quantidade * item.produto.valor);
    return total;
  }

  adicionarRemoverProduto (evento) {
    const botao = evento.target;
    const produtoId = botao.dataset.produtoId;
    const acao = botao.dataset.acao;
    const produto = Banco.pegaTodosProdutos().find(produto => produto.id == produtoId);
    let item;

    if (acao === 'adicionar') {
      if (produto.quantidadeDisponivel === 0) {
        alert(produto.nome + ' não está disponível no estoque!');
      } else {
        item = this.#adicionarItem(produto, 1);
        this.#exibeItemTela(item);
        Banco.diminuirQuantidadeDisponivelProduto(produto);
      }
    } else if (acao === 'remover') {
      item = this.#removerItem(produto, 1);
      this.#atualizaItemTela(item);
      Banco.aumentarQuantidadeDisponivelProduto(produto);
    } else {
      throw new Error('Ação invalida!');
    }

    this.#atualizaTotalTela();
  }

  #exibeItemTela (item) {
    if (item.quantidade === 1) {
      const itemCarrinhoHTML = this.#criarItemCarrinho(item);
      this.#listaCarrinhoHTML.appendChild(itemCarrinhoHTML);
    } else {
      let itemCarrinhoHTML = document.getElementById('qtd' + item.produto.id);
      itemCarrinhoHTML.innerText = 'x ' + item.quantidade;
    }

    this.#totalCarrinhoHTML.innerText = this.somaTotal;
  }

  #atualizaItemTela (item) {
    if (item.quantidade === 0) {
      let itemCarrinhoHTML = document.getElementById('qtd' + item.produto.id);
      itemCarrinhoHTML.parentNode.remove();
    } else {
      let itemCarrinhoHTML = document.getElementById('qtd' + item.produto.id);
      itemCarrinhoHTML.innerText = 'x ' + item.quantidade;
    }
  }

  #atualizaTotalTela () {
    this.#totalCarrinhoHTML.innerText = this.somaTotal;
  }

  #adicionarItem (produto, quantidade) {
    let item = this.#encontrarItem(produto.id);

    if (item === undefined) {
      item = new CarrinhoItem(produto, 0);
      this.#items.push(item);
    }

    item.aumentarQuantidade();
    return item;
  }

  #removerItem (produto, quantidade) {
    let item = this.#encontrarItem(produto.id);

    if (item === undefined) throw new Error('Nao foi possivel remover o item pois ele nao existe no carrinho!');

    if (item.quantidade === 1) this.#items = this.#items.filter(item => item.produto.id != produto.id);

    item.diminuirQuantidade();
    return item;
  }

  #encontrarItem (produtoId) {
    return this.#items.find(item => item.produto.id === produtoId);
  }

  #criarItemCarrinho (item) {
    let itemCarrinhoHTML = document.createElement('div');
    itemCarrinhoHTML.className = 'item-carrinho';

    let textoNomeItemHTML = document.createElement('span');
    textoNomeItemHTML.innerText = item.produto.nome;

    let textoQuantidadeItemHTML = document.createElement('span');
    textoQuantidadeItemHTML.className = 'quantidade-item'
    textoQuantidadeItemHTML.innerText = 'x ' + item.quantidade;
    textoQuantidadeItemHTML.id = 'qtd' + item.produto.id;

    var textoValorTotalItemHTML = document.createElement('span');
    textoValorTotalItemHTML.className = 'total-item';
    textoValorTotalItemHTML.innerText = 'R$' + item.produto.valor * item.quantidade;

    var acaoMenuHTML = document.createElement('span');
    acaoMenuHTML.className = 'acao-menu';

    const self = this;
    var botaoAdicionarHTML = document.createElement('button');
    botaoAdicionarHTML.className = 'botao-adicionar';
    botaoAdicionarHTML.innerText = '+';
    botaoAdicionarHTML.dataset.produtoId = item.produto.id;
    botaoAdicionarHTML.dataset.acao = 'adicionar';
    botaoAdicionarHTML.onclick = function (evento) { self.adicionarRemoverProduto(event) };

    var botaoRemoverHTML = document.createElement('button');
    botaoRemoverHTML.className = 'botao-remover';
    botaoRemoverHTML.innerText = '-';
    botaoRemoverHTML.dataset.produtoId = item.produto.id;
    botaoRemoverHTML.dataset.acao = 'remover';
    botaoRemoverHTML.onclick = function (evento) { self.adicionarRemoverProduto(event) };

    acaoMenuHTML.appendChild(botaoAdicionarHTML);
    acaoMenuHTML.appendChild(botaoRemoverHTML);

    itemCarrinhoHTML.appendChild(textoNomeItemHTML);
    itemCarrinhoHTML.appendChild(textoQuantidadeItemHTML);
    itemCarrinhoHTML.appendChild(textoValorTotalItemHTML);
    itemCarrinhoHTML.appendChild(acaoMenuHTML);

    return itemCarrinhoHTML;
  }

}

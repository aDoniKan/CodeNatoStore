class CarrinhoItem {
  #produto;
  #quantidade;

  constructor(produto, quantidade) {
    this.#produto = produto;
    this.#quantidade = quantidade;
  }

  get produto () {
    return this.#produto;
  }

  set produto (produto) {
    if (typeof produto !== 'object') throw new Error('O produto deve ser do tipo Object');
    if (!(produto instanceof Produto)) throw new Error('O produto deve ser uma instancia de Produto');
    this.#produto = produto;
  }

  get quantidade () {
    return this.#quantidade;
  }

  set quantidade (quantidade) {
    if (typeof quantidade !== 'number') throw new Error('A quantidade deve ser do tipo Number');
    this.#quantidade = quantidade;
  }

  aumentarQuantidade () {
    this.#quantidade++;
  }

  diminuirQuantidade () {
    this.#quantidade--;
  }

}

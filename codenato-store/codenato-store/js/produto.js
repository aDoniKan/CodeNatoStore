class Produto {
  #id;
  #nome;
  #valor;
  #quantidadeDisponivel;

  constructor(nome, valor, quantidadeDisponivel) {
    this.#id = Math.floor(Math.random() * Date.now());
    this.#nome = nome;
    this.#valor = valor;
    this.#quantidadeDisponivel = quantidadeDisponivel;
  }

  get id () {
    return this.#id;
  }

  get nome () {
    return this.#nome;
  }

  set nome (nome) {
    if (typeof nome !== 'string') throw new Error('O nome do produto deve ser do tipo String');
    this.#nome = nome;
  }

  get valor () {
    return this.#valor;
  }

  set valor (valor) {
    if (typeof valor !== 'number') throw new Error('O valor do produto deve ser do tipo Number');
    this.#valor = valor;
  }

  get quantidadeDisponivel () {
    return this.#quantidadeDisponivel;
  }

  set quantidadeDisponivel (quantidadeDisponivel) {
    if (typeof quantidadeDisponivel !== 'number') throw new Error('A quantidade do produto deve ser do tipo Number');
    this.#quantidadeDisponivel = quantidadeDisponivel;
  }

  adicionarAoCarrinho (carrinho, quantidade) {
    carrinho.adicionarProduto(this, quantidade);
  }

  removerDoCarrinho (carrinho) {
    carrinho.removerProduto(this);
  }

  aumentarQuantidadeDisponivel () {
    this.#quantidadeDisponivel++;
  }

  diminuirQuantidadeDisponivel () {
    this.#quantidadeDisponivel--;
  }

  // Retorna o produto em formato de Objeto padrão e não um Objeto da classe Produto
  stringify () {
    return {
      id: this.#id,
      nome: this.#nome,
      valor: this.#valor,
      quantidadeDisponivel: this.#quantidadeDisponivel
    }
  }

}

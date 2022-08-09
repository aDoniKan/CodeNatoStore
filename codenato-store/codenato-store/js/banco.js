class Banco {
  static cadastrarProdutos () {
    // Cadastra os produtos disponíveis no sistema, ou seja, cria 4 objetos da classe Produto
    const mouse = new Produto('Mouse', 299, 10);
    const teclado = new Produto('Teclado', 599, 20);
    const monitor = new Produto('Monitor', 1999, 5);
    const fonte = new Produto('Fonte', 99, 50);
    const macBook = new Produto('MacBook', 12999, 3);

    // Insere os produtos no banco de dados local do navegador (localStorage)
    Banco.atualizarBancodeDados(
      [
        mouse.stringify(),
        teclado.stringify(),
        monitor.stringify(),
        fonte.stringify(),
        macBook.stringify()
      ]
    );
  }

  // Retorna todos os produtos que estão no banco de dados local do navegador (localStorage)
  static pegaTodosProdutos () {
    return JSON.parse(window.localStorage.getItem('produtos'));
  }

  // Aumenta a quantidade disponível de um produto no banco de dados local do navegador (localStorage)
  static aumentarQuantidadeDisponivelProduto (produto) {
    let produtos = Banco.pegaTodosProdutos(); // Pega todos os produtos
    const indice = produtos.findIndex((p => p.id == produto.id)); // Encontra o íncide do produto
    produtos[indice].quantidadeDisponivel++; // Atualiza o produto

    Banco.atualizarBancodeDados(produtos); // Atualiza a lista de produtos no banco
  }

  // Diminui a quantidade disponível de um produto no banco de dados local do navegador (localStorage)
  static diminuirQuantidadeDisponivelProduto (produto) {
    let produtos = Banco.pegaTodosProdutos(); // Pega todos os produtos
    const indice = produtos.findIndex((p => p.id == produto.id)); // Encontra o íncide do produto
    produtos[indice].quantidadeDisponivel--; // Atualiza o produto

    Banco.atualizarBancodeDados(produtos); // Atualiza a lista de produtos no banco
  }

  // Atualiza a lista de produtos no banco de dados local do navegador (localStorage)
  static atualizarBancodeDados (produtos) {
    window.localStorage.setItem('produtos', JSON.stringify(produtos));
  }
}

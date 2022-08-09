(function () {
  //Cadastra os produtos no banco de dados
  Banco.cadastrarProdutos();

  // Cria uma instancia da classe Carrinho que será nosso único objeto do tipo carrinho neste sistema
  const carrinho = new Carrinho();

  // Cria uma instancia da classe Menu que será nosso ponto de partida
  const menu = new Menu(carrinho);
  menu.exibeMenuTela(); // Exibe os produtos na tela
})();

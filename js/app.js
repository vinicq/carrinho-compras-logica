class CarrinhoDeCompras {
    constructor() {
        this.totalGeral = 0;
        this.limpar(); // Inicializa o estado do carrinho
    }

    // Método utilitário para simplificar o acesso a elementos pelo ID
    getById(id) {
        return document.getElementById(id);
    }

    // Adiciona um produto ao carrinho de compras
    adicionar() {
        let produto = this.getById('produto').value;
        let quantidade = this.getById('quantidade').value;

        // Verificar se o produto selecionado é válido
        if (!produto || produto.trim() === "") {
            alert("Selecione um produto válido.");
            return;
        }

        // Verificar se a quantidade inserida é válida
        if (isNaN(quantidade) || quantidade <= 0) {
            alert("Insira uma quantidade válida.");
            return;
        }

        let nomeProduto = produto.split('-')[0];
        let valorUnitario = parseFloat(produto.split('R$')[1]);
        let preco = quantidade * valorUnitario;

        let carrinho = this.getById('lista-produtos');
        carrinho.innerHTML = carrinho.innerHTML + `<section class="carrinho__produtos__produto">
            <span class="texto-azul">${quantidade}x</span> ${nomeProduto} <span class="texto-azul">R$${preco.toFixed(2)}</span>
        </section>`;

        this.totalGeral = this.totalGeral + preco;
        let campoTotal = this.getById('valor-total');
        campoTotal.textContent = `R$ ${this.totalGeral.toFixed(2)}`;
        this.getById('quantidade').value = 1; // Redefine para 1 após adicionar
    }

    // Limpa o carrinho de compras e redefine o total geral
    limpar() {
        this.totalGeral = 0;
        this.getById('lista-produtos').innerHTML = '';
        this.getById('valor-total').textContent = 'R$ 0,00';
        this.getById('quantidade').value = 1;  // Inicializa a quantidade como 1
    }
}

// Instancia a classe CarrinhoDeCompras e executa os métodos diretamente
const carrinho = new CarrinhoDeCompras();

// Funções globais para interagir com a classe, mantendo os nomes originais
function adicionar() {
    carrinho.adicionar();
}

function limpar() {
    carrinho.limpar();
}

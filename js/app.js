class CarrinhoDeCompras {
    constructor() {
        this.totalGeral = 0;
        this.itens = {}; // Armazena os itens no carrinho com a quantidade e preço
        this.limpar(); // Inicializa o estado do carrinho
    }

    // Método utilitário para simplificar o acesso a elementos pelo ID
    getById(id) {
        return document.getElementById(id);
    }

    // Adiciona um produto ao carrinho de compras ou atualiza a quantidade se já estiver no carrinho
    adicionar() {
        let produto = this.getById('produto').value;
        let quantidade = parseInt(this.getById('quantidade').value);

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

        let nomeProduto = produto.split('-')[0].trim();
        let valorUnitario = parseFloat(produto.split('R$')[1]);

        // Se o produto já estiver no carrinho, atualize a quantidade e o preço
        if (this.itens[nomeProduto]) {
            this.itens[nomeProduto].quantidade += quantidade;
            this.itens[nomeProduto].preco += quantidade * valorUnitario;
        } else {
            // Se não estiver no carrinho, adicione o novo item
            this.itens[nomeProduto] = {
                quantidade: quantidade,
                preco: quantidade * valorUnitario
            };
        }

        // Atualize o total geral
        this.totalGeral += quantidade * valorUnitario;
        this.atualizarCarrinho();
    }

    // Atualiza a exibição do carrinho de compras na interface
    atualizarCarrinho() {
        let carrinho = this.getById('lista-produtos');
        carrinho.innerHTML = ''; // Limpa a lista para re-renderizar

        for (let nomeProduto in this.itens) {
            carrinho.innerHTML += `
                <section class="carrinho__produtos__produto">
                    <span class="texto-azul">${this.itens[nomeProduto].quantidade}x</span> 
                    ${nomeProduto} 
                    <span class="texto-azul">R$${this.itens[nomeProduto].preco.toFixed(2)}</span>
                </section>`;
        }

        let campoTotal = this.getById('valor-total');
        campoTotal.textContent = `R$ ${this.totalGeral.toFixed(2)}`;
        this.getById('quantidade').value = 1; // Redefine para 1 após adicionar
    }

    // Limpa o carrinho de compras e redefine o total geral
    limpar() {
        this.totalGeral = 0;
        this.itens = {}; // Limpa todos os itens do carrinho
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

function Formulario() {
    this.nome = ko.observable('');
    this.ano = ko.observable('');
    this.genero = ko.observable('');
    this.avaliacao = ko.observable('');
    this.temporadas = ko.observable('');
    this.estaSerie = ko.observable(false); // Indica se o formulário é para série ou filme

    this.tituloFormulario = ko.computed(() => {
        return this.estaSerie() ? 'Cadastrar Série' : 'Cadastrar Filme';
    });

    // Limpa o formulário após salvar
    this.limparFormulario = function () {
        this.nome('');
        this.ano('');
        this.genero('');
        this.avaliacao('');
        this.temporadas('');
    };
}

function AppViewModel() {
    this.formulario = new Formulario();

    // Lista de itens cadastrados
    this.itensCadastrados = ko.observableArray([]);

    // Filtro para exibir somente filmes, séries ou ambos
    this.filtro = ko.observable('todos');

    // Computed para filtrar os itens cadastrados
    this.itensFiltrados = ko.computed(() => {
        if (this.filtro() === 'filmes') {
            return this.itensCadastrados().filter(item => !item.temporadas);
        } else if (this.filtro() === 'series') {
            return this.itensCadastrados().filter(item => item.temporadas);
        }
        return this.itensCadastrados();
    });

    // Alterna para o formulário de filme
    this.mostrarFormularioFilme = function () {
        this.formulario.estaSerie(false);
        $('#formulario').show();
    };

    // Alterna para o formulário de série
    this.mostrarFormularioSerie = function () {
        this.formulario.estaSerie(true);
        $('#formulario').show();
    };

    // Salva os dados no `localStorage`
    this.salvarDados = function () {
        localStorage.setItem('itensCadastrados', JSON.stringify(this.itensCadastrados()));
    };

    // Carrega os dados do `localStorage`
    this.carregarDados = function () {
        const dadosSalvos = localStorage.getItem('itensCadastrados');
        if (dadosSalvos) {
            this.itensCadastrados(JSON.parse(dadosSalvos));
        }
    };
    //remver filme
    this.removerItem = (item) => {
        if (confirm(`Tem certeza de que deseja apagar "${item.nome}"?`)) {
            this.itensCadastrados.remove(item); // Remove o item da lista observável
            this.salvarDados(); // Atualiza o localStorage
            alert('Item removido com sucesso!');
        }
    };

    // Função para salvar os dados do formulário
    this.salvarFormulario = () => {
        const formulario = this.formulario;
        if (formulario.nome() && formulario.ano() && formulario.genero() && formulario.avaliacao()) {
            const novoItem = {
                nome: formulario.nome(),
                ano: formulario.ano(),
                genero: formulario.genero(),
                avaliacao: formulario.avaliacao(),
                temporadas: formulario.estaSerie() ? formulario.temporadas() : null,
            };
            this.itensCadastrados.push(novoItem);
            this.salvarDados();
            formulario.limparFormulario();
            alert('Cadastro realizado com sucesso!');
            $('#formulario').hide();
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    };

    // Carrega os dados ao inicializar
    this.carregarDados();
}

// Inicializa o modelo de visualização
const appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);

// Esconde o formulário inicialmente Jquery
$(document).ready(function () {
    $('#formulario').hide();

    // Adiciona os manipuladores de clique para os botões 
    $('#mostrarFilmeForm').click(function () {
        appViewModel.mostrarFormularioFilme();
    });

    $('#mostrarSerieForm').click(function () {
        appViewModel.mostrarFormularioSerie();
    });
});

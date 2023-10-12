document.querySelector("#botao-cadastrar").addEventListener("click", () => {
    
    const tarefa = {
        titulo: "Produto",
        descricao: "Descrição",
        pontos: 399
    }

    const titulo = document.querySelector('#titulo').value
    const descricao = document.querySelector('#descricao').value
    const pontos = document.querySelector('#pontos').value

    console.log(tarefa)
})  
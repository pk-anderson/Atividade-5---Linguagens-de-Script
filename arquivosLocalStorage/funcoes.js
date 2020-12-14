let operacao = 'A'
let usuarios = []
let indice_selecionado = -1

const frmCadastro = document.getElementById('frmCadastro')
frmCadastro.addEventListener('submit', function(event){
    if(operacao==='A'){
        return Adicionar()
    } else {
        return Editar()
    }
})

function Adicionar() {
    let usuario = {
        codigo:document.querySelector('#txtCodigo').value,
        nome:document.querySelector('#txtNome').value,
        telefone:document.querySelector('#txtTelefone').value,
        email:document.querySelector('#txtEmail').value,
    }
    usuarios.push(usuario)
    localStorage.setItem('usuarios',JSON.stringify(usuarios))
    alert('Registro Adicionado')
    return true
}

function handleEditar(e) {
    operacao = "E"
    indice_selecionado = parseInt(e.getAttribute("alt"))
    let users = JSON.parse(localStorage.getItem('usuarios'))
    let user = users[indice_selecionado]
    document.querySelector("#txtCodigo").value = user.codigo
    document.querySelector("#txtNome").value = user.nome
    document.querySelector("#txtTelefone").value = user.telefone
    document.querySelector("#txtEmail").value = user.email
   
}

function Editar() {
    let users = JSON.parse(localStorage.getItem('usuarios'))

    const userAtualizado = {
        codigo: document.querySelector("#txtCodigo").value,
        nome:  document.querySelector("#txtNome").value,
        telefone: document.querySelector("#txtTelefone").value,
        email: document.querySelector("#txtEmail").value,
    }

    users[indice_selecionado] = userAtualizado
    localStorage.setItem('usuarios', JSON.stringify(users))
    alert('usuario atualizado')
    operacao = 'A'
}

function listar() {
    let tbody = document.querySelector('#tblListar tbody')
    let linhas = ''
    let users = JSON.parse(localStorage.getItem('usuarios'))

    for (let i in users) {
        let user = users[i]
        linhas += `<tr>
                    <td>
                        <img src='images/editar.png' alt='${i}' onclick='handleEditar(this)' />
                        <img src='images/delete.png' alt='${i}' onclick='handleDeletar(this)' />
                    </td>
                    <td>${user.codigo}</td>
                    <td>${user.nome}</td>
                    <td>${user.telefone}</td>
                    <td>${user.email}</td>
                    </tr>`
    }
    tbody.innerHTML = linhas
}

document.querySelector('#btnListar').addEventListener('click', function(e){
    listar();
})

function deletar(indice) {
    let users = JSON.parse(localStorage.getItem('usuarios'))
    users.splice(indice,1)
    if(users.length == 0) {
        localStorage.removeItem('usuarios')
        return
    }
    localStorage.setItem('usuarios',JSON.stringify(users))
    alert("Registro excluído")
}

function handleDeletar(e) {
    indice_selecionado = parseInt(e.getAttribute("alt"))
    deletar(indice_selecionado)
    listar()
}
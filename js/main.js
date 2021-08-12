'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getDatabase = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setDatabase = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

// CRUD -> Create    
const createClient = (client) => {
    const dbClient = getDatabase()
    dbClient.push(client)
    setDatabase(dbClient)
    console.log(`Cliente ${JSON.stringify(client.nome)} Adicionado`)
}

// CRUD -> Read
const readClient = () => getDatabase()

// CRUD -> Update
const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setDatabase(dbClient)
}

// CRUD -> Deleted
const deletedClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index,1)
    setDatabase(dbClient)
}

// Validações
const isValidFields = () => {
    if(isValidPhone()){
        if(isValidDocument()){
            return document.getElementById('form').reportValidity()
        }
    }
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

//interação com layout
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cpf: document.getElementById('cpf').value,
            foto: `https://robohash.org/${document.getElementById('email').value}?size=80x80`
        }
        const index = document.getElementById('nome').dataset.index
        if(index == 'new'){
            createClient(client)
            updateTable()
            closeModal()
        }
        else{
            updateClient(index, client)
            updateTable()
            closeModal()
        }

    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cpf}</td>
        <td><img src='${client.foto}'></td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('#tbclient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tbclient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cpf').value = client.cpf
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDeleted = (event) => {
    if (event.target.type == 'button'){
        const [action, index] = event.target.id.split('-')
        if(action == 'edit'){
            editClient(index)
        }
        if(action == 'delete'){
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if(response) {
                deletedClient(index)
                updateTable()
                closeModal()
            }
        }
    }
}

updateTable()

//Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.getElementById('cancel')
    .addEventListener('click', closeModal)

document.querySelector('#tbclient>tbody')
    .addEventListener('click', editDeleted)
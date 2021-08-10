'use strict'

function testelog() {
    console.log("Oi" + tempClient.nome)
};

const tempClient = {
    nome: "Testeupdate",
    email: "testeup@email.com",
    celular: "412093404",
    cidade: "Curitiba"
};

const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => document.getElementById('modal')
    .classList.remove('active');

const getDatabase = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setDatabase = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

// CRUD -> Create    
const createClient = (client) => {
    const dbClient = getDatabase();
    dbClient.push(client);
    setDatabase(dbClient);
    console.log("Cliente " + JSON.stringify(client.nome) + " Adicionado" );
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

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//interação com layout
const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        createClient(client)
    }
}

//Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);

document.getElementById('salvar')
    .addEventListener('click', saveClient)
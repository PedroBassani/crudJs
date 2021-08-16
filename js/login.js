'use strict'

const tempAdm = {
    usuario: "adm",
    senha: "password"
}

const createUser = (user) => {
    const dbUsers = getUsersDatabase()
    dbUsers.push(user)
    setUserDatabase(dbUsers)
}

const getUsersDatabase = () => JSON.parse(localStorage.getItem('db_user')) ?? [];
const setUserDatabase = (dbUsers) => localStorage.setItem("db_user", JSON.stringify(dbUsers));

const readUsers = () => getUsersDatabase()

const login = () => {
    console.log('logando')
    if(isUser(dataUser) && isPassword(dataUser)) {
        return true
        document.getElementById("entrar").onclick.value = "windown.location.href = 'index.html'" 
    }
    else {
        alert('Usuário ou Senha incorreto')
    }
    
}

const dataUser = () => {
    let users = {
        user: document.getElementById('usuario').value,
        password: document.getElementById('senha').value
    }
    return users
}

const isUser = (elemet) => {
    console.log(dataUser.user)
    return dataUser.user === elemet.user
}

const isPassword = (elemet) => {
    console.log(dataUser.password)
    return dataUser.password === elemet.password
}

//eventos
document.getElementById('entrar')
    .addEventListener('click', login)

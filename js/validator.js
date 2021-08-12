const isValidPhone = () => {
    const re = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
    const phone = document.getElementById('celular').value
    if(re.test(phone)){
        return true
    }
    else{
        alert(`${phone} não é um telefone valido!`)
        return false
    }
}

// Validação de CPF
const isValidDocument = () => {
    const recpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    let cpf = document.getElementById('cpf').value
    if(recpf.test(cpf)){
        cpf = cpf.toString().replace(/\.|-/gm,'')
        if(cpfTrue(cpf)) return true
        else {
            alert(`${cpf} não é um CPF valido!`)
        }
    }
    else{
        alert(`${cpf} esse CPF não tem 11 digitos!`)
        return false
    }
}

// CPF Verdadeiro
const cpfTrue = (cpf) => {
    let soma = 0
    let resto
    
    for(let i=1;i<=9;i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
    resto = (soma * 10) % 11

        if((resto == 10) || (resto == 11)) resto =0
        if(resto != parseInt(cpf.substring(9,10))) return false;

    soma = 0
    for(let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
    resto = (soma * 10) % 11

    if ((resto == 10) || (resto == 11))  resto = 0
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
    return true

}
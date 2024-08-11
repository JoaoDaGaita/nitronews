import { AlertError } from "./alert-error.js"
import { createRequest } from "./api.js"

const form = document.querySelector('#my-form')
const inputName = document.querySelector('#name')
const inputEmail = document.querySelector('#email')
const inputPassword = document.querySelector('#password')
const inputPasswordConfirm = document.querySelector('#password-confirm')
let spanEmailErrorMessage = document.querySelector('.email-exists-error')

const validate = () => {
  if(inputPassword.value !== inputPasswordConfirm.value) {
    inputPasswordConfirm.setCustomValidity("Deve ser idêntico ao campo **Senha**")
    return
  }
  inputPasswordConfirm.setCustomValidity("")
}

inputPassword.addEventListener("change", validate)
inputPasswordConfirm.addEventListener("change", validate)

form.onsubmit = async event => {
  event.preventDefault()
  spanEmailErrorMessage.innerHTML = ""
  const nome = inputName.value
  const email = inputEmail.value
  const senha = inputPasswordConfirm.value
  const confirmacaoSenha = inputPassword.value

  const showAlertError = emptyString(nome) || emptyString(email) || emptyString(senha) || emptyString(confirmacaoSenha)

  if (showAlertError) {
      AlertError.open()
      return;
  }

  AlertError.close()


  const user = {
    nome,
    email,
    senha,
    confirmacaoSenha
  }

  try {
    const {erro, tipoErro} = await createRequest(JSON.stringify(user))
    if(erro){
      spanEmailErrorMessage.innerHTML = "Usuário já Existente"
      return 
    }
  } catch (error) {
    return error.message
  }
}

function emptyString(value) {
  return value == "" || value.trim() == ""
}
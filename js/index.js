'use strict'
const input = document.getElementById('input')
const estado = document.getElementById('uf')
const city = document.getElementById('cidade')
const local = document.getElementById('bairro')
const street = document.getElementById('rua')
const labelerro = document.getElementById('labelerro')
const diverro = document.getElementById('diverro')
const iconexit = document.getElementById('icon-exit')
const iconsearch = document.getElementById('icon-search')


 async function  get(cep){
        const resultado = await fetch(`https://viacep.com.br/ws/${cep}/json`)
        const res = await resultado.json()
        const {erro} = res
        const result = res
        if(erro == true){
            return {erro:true}
        }else{
            return result
        }
}
function LimpaLabel(){
    estado.innerText = ''
    city.innerText = ''
    local.innerText = ''
    street.innerText = ''
}
function ColorirBordaeIcon(cor1,cor2){
    iconsearch.style.cssText = `color:${cor1};`
    input.style.cssText = `border: solid 2px ${cor2};`
}
async function Validator(){
    const cep = input.value
    
    if(cep.length < 8){
        ColorirBordaeIcon('rgb(117, 27, 0)','red')
        LimpaLabel()
    }if(cep.length > 8){
        ColorirBordaeIcon('rgb(117, 27, 0)','red')
        LimpaLabel()
    }if(cep.length == 8){
        ColorirBordaeIcon('green','green')
        const endereco = await get(cep)
        const {uf, localidade, bairro, logradouro, erro} = endereco
        if(erro == true){
            diverro.style.cssText = 'display:flex;'
            labelerro.innerText = cep

        }else{
            estado.innerText = 'Estado: '+uf
            city.innerText = 'Cidade: '+localidade
            local.innerText = 'Bairro: '+bairro
            street.innerText = 'Rua: '+logradouro
        }
    }
}
iconexit.addEventListener('click',(e)=>{
    e.preventDefault()
    diverro.style.cssText = 'display:none;'
})
input.addEventListener('keyup',(e)=>{
    e.preventDefault()
    Validator()
})

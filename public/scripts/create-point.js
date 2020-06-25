// console.log("olá eu sou o ricardo")
// document
//     .querySelector("select[name=uf]")
//     .addEventListener("change", () => { //arrow function
//         console.log("mudei")
//     }) 

function populateUFs() {
    const ufSelect = document.querySelector("[name=uf]")


    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>'
    citySelect.disabled = false
    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens para recolher
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectItem(event) {

    const itemLi = event.target

    // adiconar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id


    //verificar se exitem items selecionados, se sim
    // pegar os items selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item === itemId
        return itemFound
    })

    //se ja estiver selecionado,
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecinado
        //adicionar seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os dados ou items selecionados
    collectedItems.value = selectedItems

}






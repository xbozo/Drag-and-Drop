let areas = {
    a: null,
    b: null,
    c: null
}

document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("dragstart", dragstart)       // dragstart e dragend eventos nativos
    item.addEventListener("dragend", dragend)
})

document.querySelectorAll(".area").forEach(area => {
    area.addEventListener("dragover", dragOver)         // roda a função quando o item passar por cima da área designada
    area.addEventListener("dragleave", dragLeave)       // roda a função quando o item sai da área designada
    area.addEventListener("drop", drop)                 
})

document.querySelector(".neutralArea").addEventListener("dragover", dragOverNeutral)
document.querySelector(".neutralArea").addEventListener("dragleave", dragLeaveNeutral)
document.querySelector(".neutralArea").addEventListener("drop", dropNeutral)

// Functions Item

function dragstart(e) {
    e.currentTarget.classList.add("dragging")       // o currentTarget se refere ao evento em que está sendo aplicado, já o target se refere ao exato elemento em que o evento foi aplicado
}

function dragend(e) {
    e.currentTarget.classList.remove("dragging")
}

// Functions Area

function dragOver(e) {
    if (e.currentTarget.querySelector(".item") === null) {          // se a área designada ainda não está preenchida
        e.preventDefault()          // obrigatório pro drop funcionar. comportamento padrão dele é de negar
    e.currentTarget.classList.add("hover")
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove("hover")
}

function drop(e) {
    e.currentTarget.classList.remove("hover")

    if (e.currentTarget.querySelector(".item") === null) {          // se nenhuma área está preenchida com um item
        let dragItem = document.querySelector(".item.dragging")         // reconhece que um item está sendo puxado
        e.currentTarget.appendChild(dragItem)                       // aqui o appendChild move o item existente, não adiciona um clone
        updateAreas()
    }

}

// Functions Neutral Area

function dragOverNeutral(e) {
    e.preventDefault()
    e.currentTarget.classList.add("hover")
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove("hover")
}

function dropNeutral(e) {
    e.currentTarget.classList.remove("hover")
    let dragItem = document.querySelector(".item.dragging")         // reconhece que um item está sendo puxado
    e.currentTarget.appendChild(dragItem)  
    updateAreas()
}

// Logic Functions

function updateAreas() {
    document.querySelectorAll(".area").forEach(area => {
        let name = area.getAttribute("data-name")

        if(area.querySelector(".item") !== null) {
            areas[name] = area.querySelector(".item").innerHTML         // pega se o item preenchido é o 1, 2 ou 3 e preenche no objeto da linha 1
        } else {
            areas[name] = null
        }
    })

    if(areas.a === "1" && areas.b === "2" && areas.c === "3") {         // função de deixar verde em caso de sequencia correta
        document.querySelector(".areas").classList.add("correct")
    } else {
        document.querySelector(".areas").classList.remove("correct")
    }
}
const obtenerPokemones = async (urlApi = 'https://pokeapi.co/api/v2/pokemon') => {
    let htmlContenido = document.querySelector("#contenido")
    htmlContenido.innerHTML = ""
    try {
        let dataPokemones = await fetch(urlApi)
        dataPokemones = await dataPokemones.json()
        let arrPokemones = dataPokemones.results
        const infoPokemones = []

        for (const data of arrPokemones) {
            let info = await obtenerInfoPokemon(data.url)
            infoPokemones.push(info)
        }
       

        infoPokemones.forEach(pokemonn => {
            let disabledBtnAnt = (dataPokemones.previous == null) ? 'disabled' : ''
            let disabledBtnSig = (dataPokemones.next == null) ? 'disabled' : ''
            htmlContenido.innerHTML += `
                <div class="col">
                    <div class="card">
                        <img src="${pokemonn.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${pokemonn.name}</h5>
                        </div>
                    </div>
                </div>
                `
            document.querySelector("#divPaginacion").innerHTML = `
                <button class="btn btn-dark" ${disabledBtnAnt} data-url="${dataPokemones.previous}">Anterior</button>
                <button class="btn btn-dark" ${disabledBtnSig} data-url="${dataPokemones.next}">Siguiente</button>
            `
        });
        asignarEventosPaginacion()

    } catch (error) {
        htmlContenido.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Ah ocurrido algo! comunícate con el administrador
            </div>
        `
    }
}
obtenerPokemones()
function asignarEventosPaginacion() {
    let botones = document.querySelectorAll("[data-url]")
    botones.forEach(boton => {
        boton.addEventListener("click", (evento) => {
            obtenerPokemones(evento.target.dataset.url)
        })
    });
}

document.querySelector("#busqueda").addEventListener("submit", (evento) => {
    evento.preventDefault()
  

    console.log(obtenerInfoPokemonSolito(`https://pokeapi.co/api/v2/pokemon/${evento.target.txtBusqueda.value}/`, true));
    obtenerInfoPokemonSolito(`https://pokeapi.co/api/v2/pokemon/${evento.target.txtBusqueda.value}/`, true)



 
})




async function obtenerInfoPokemon(urlPokemon) {
    try {
        let dataPokemon = await fetch(urlPokemon)
        dataPokemon = await dataPokemon.json()
        return dataPokemon
    } catch (error) {
        console.error("PASO ALGO -> ", error)
    }
}
async function obtenerInfoPokemonSolito (urlpoke){
    try {
        let htmlContenido = document.querySelector("#contenido")
        let dataPok = await fetch(urlpoke)
        
        dataPok= await dataPok.json()
        Object.values(dataPok)
        console.log(dataPok);
        htmlContenido.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${dataPok.sprites.other["official-artwork"].front_default}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${dataPok.species.name}</h5>
                </div>
            </div>
        </div>
        `
     

        }

        
        
     catch (error) {
        console.error("PASO ALGO -> ", error)
    }
}
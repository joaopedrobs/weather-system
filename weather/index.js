const api = {
    key: "b78c71313bcafdc17dca98282c63db4b",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

//Variaveis coluna pesquisa
const cidade = document.querySelector('.cidade');
const container_img = document.querySelector('.container_img');
const clima = document.querySelector('.clima');
const container_temp = document.querySelector('.temp');
const temp_number = document.querySelector('.temp div');
const temp_unit = document.querySelector('.temp span');
const MaxMin = document.querySelector('.MaxMin');
const number_umidade = document.querySelector('.numero-umidade')
const umidade_unit = document.querySelector('.sensacao span');
const sensacao_number = document.querySelector('.sensacao_number')
const number_vento = document.querySelector('.numero-vento')

const search_button = document.querySelector('.btn');
const search_input = document.querySelector('.form-control');


//Variaveis coluna cidades padrões
const cidade_tab = document.querySelectorAll('.cidade-tab');
const temp_right = document.querySelectorAll('.temp-right');
const MaxMin_tab = document.querySelectorAll('.MaxMin-tab');
const img_right = document.querySelectorAll('.img-right');

//botao pesquisa
search_button.addEventListener('click', function() {
    searchResults(search_input.value)
})

//cidades da tabela iniciais
const city = ["sao%20paulo", "rio%20de%20janeiro", "belo%20horizonte", "porto%20alegre", "manaus", "brasilia", "vitoria"];

search_input.addEventListener('keypress', enter)

function enter(event) {
    key = event.keyCode
    if (key === 13) {
        searchResults(search_input.value)
    }
}


function searchResults(city) {
    fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(climadados => {
            if (!climadados.ok) {
                throw new Error(`Cidade não identificada`)
            }
            return climadados.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });
}

function displayResults(weather) {
    console.log(weather)

    cidade.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = `${Math.round(weather.main.temp)}`
    temp_number.innerHTML = temperature;
    temp_unit.innerHTML = `°C`;
    
    let iconName = weather.weather[0].icon;
    container_img.innerHTML = `<img src="./icons/${iconName}.png">`;

    clima.innerText = weather.weather[0].description;

    MaxMin.innerText = `${Math.round(weather.main.temp_min)} °C | ${Math.round(weather.main.temp_max)} °C`;

    number_umidade.innerText = weather.main.humidity

    let sensacao = `${Math.round(weather.main.feels_like)}`
    sensacao_number.innerHTML = sensacao;
    umidade_unit.innerHTML = `°C`;

    let vento = `${weather.wind.speed}`
    vento = Math.round(vento *3.6)
    number_vento.innerHTML = vento

}


function fixcity (i) {    
    fetch(`${api.base}weather?q=${city[i]}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(climadados => {
            if (!climadados.ok) {
                throw new Error(`Cidade não identificada`)
            }
            return climadados.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResultsCitys(response, i)
        });
}

function displayResultsCitys(weather, cidades) {
        
    cidade_tab[cidades].dataset.city = city[cidades]

    cidade_tab[cidades].innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = `${Math.round(weather.main.temp)}`
    temp_right[cidades].innerHTML = temperature;

    MaxMin_tab[cidades].innerText = `${Math.round(weather.main.temp_min)} °C | ${Math.round(weather.main.temp_max)} °C`; 
   
    let icon_right = weather.weather[0].icon;
    img_right[cidades].innerHTML = `<img src="./icons/${icon_right}.png" width="80px" height="80px">`;
}  

function getcity(event) {
    const tabela = event.currentTarget

    const cidades = document.querySelectorAll('.cidade-tab')
    cidades.forEach(cidade => {
        if (tabela.contains(cidade)) {
            const nomeCidade = cidade.dataset.city 
            searchResults(nomeCidade)
        }        
    })
}

//valores para as cidades
for (i = 0; i < 7; i++) {
    fixcity(i);        
}

const tabelas = document.querySelectorAll('.tabela-unica')

tabelas.forEach(tabela => {
    tabela.addEventListener("click", getcity)
})
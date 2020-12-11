// URL för att hämta info.
const url = 'https://restcountries.eu/rest/v2/all';

// Ger tillgång till alla h3 element.
let H3 = document.querySelectorAll('h3');

// Min fetch för att hämta info
fetch(url).then(
    function (response) {
        return response.json();
    }
).then(
    function (data) {

        // ger tillgång till alla img element för flaggor
        let flags = document.querySelectorAll('img');

        // ger tillgång till alla h1 element för landets namn
        let countryName = document.querySelectorAll('h1');

        // tom array för att välja tre länder 
        let lander = [];

        // Väljer tre random länder från response
        for (let i = 0; i < flags.length; i++) {
            let random = Math.floor(Math.random() * data.length);

            // Väljer ut information vi vill ha från objekten
            lander[i] = new Country(data[random].name, data[random].flag, data[random].timezones);
        }

        // Loop för att hämta flaggor och namn 

        for (let i = 0; i < lander.length; i++) {
            flags[i].src = lander[i].flag;
            countryName[i].innerText = lander[i].name;

        }

        // Väljer alla h3 element och sätter min function på alla
        for (let i = 0; i < H3.length; i++) {
            lander[i].calculateTime(H3[i]);
        }

    })

// Constructor

function Country(_name, _flag, _timezone) {
    this.name = _name;
    this.flag = _flag;
    this.timezone = _timezone;
}

// Prototype för constructor
Country.prototype.calculateTime = function (H3) {

    // Skapar en klocka för tid
    let klocka = new Date();

    // landets UCT timme. substringar fram enbart timmen. 
    let currentTime = this.timezone[0].substr(3, 2);


    /* klocka.getUTCHours();
    console.log(klocka.getUTCHours)
    parseInt(currentTime);
    console.log(currentTime)
    klocka.getUTCMinutes();
    console.log(klocka.getUTCMinutes()) */


    // Ändrar alla h3 till nuvarande timmar plus minuter
    H3.innerText = klocka.getUTCHours() + parseInt(currentTime) + ' : ' + klocka.getUTCMinutes();



}
const cityname = document.getElementById("txtcity");
const searchbtn = document.getElementById("btnsearchcity");
const defaultdata = document.getElementById("txtdefault");
const statusicon = document.getElementById("statusicon")

const getInfo = async (event) => {
    let cityVal = cityname.value;
    if (cityVal === "") {
        defaultdata.innerText="Please Enter City Name"
        return; // Prevent further execution if the city name is empty
    }

    try {
        event.preventDefault();
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=91f0b67a4a052645970549f3aec58d2b`;
        let response = await fetch(api);

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let weatherdata = await response.json();
        let weatherArr = [weatherdata];

        console.log("Weather main value: ", weatherArr[0].weather[0].main);
        console.log(statusicon);
        if (weatherArr[0].cod === "404") {
            defaultdata.innerText = `Oops!!! Weather status of ${cityVal} not found, please check city name!`;
            defaultdata.style.display = "block";
        } else {
            defaultdata.style.display = "none";
            document.getElementById("temp").innerHTML="<p></p>"
           // document.getElementById("cityname").innerHTML = `<p> ${weatherArr[0].name}, ${weatherArr[0].sys.country} <span><i class='fa-solid fa-sun' style='color: #ffcc00;'></i><span></p>`;
            document.getElementById("cityname").innerText = `${weatherArr[0].name}, ${weatherArr[0].sys.country}`;
            //document.getElementById("temp").innerText = `${weatherArr[0].main.temp}°C`;
            document.getElementById("mintemp").innerText = `Minimum Temperature: ${weatherArr[0].main.temp_min}°C`;
            document.getElementById("maxtemp").innerText = `Maximum Temperature: ${weatherArr[0].main.temp_max}°C`;

            if(weatherArr[0].weather[0].main=="Sunny"){
                document.getElementById("temp").innerHTML = `${weatherArr[0].main.temp}°C <p> <span><i class='fa-solid fa-sun fa-2x' style='color: yellow;'></i><span></p>`;
            }
           else if(weatherArr[0].weather[0].main=="Clouds" || weatherArr[0].weather[0].main=="Clear"){
                document.getElementById("temp").innerHTML = `${weatherArr[0].main.temp}°C <p> <span><i class='fa-solid fa-cloud fa-2x' style='color: white;'></i><span></p>`;
            }
            else if(weatherArr[0].weather[0].main == "Rain"||weatherArr[0].weather[0].main == "Drizzle"){
                document.getElementById("temp").innerHTML = `${weatherArr[0].main.temp}°C <i class='fa-solid fa-cloud-showers-heavy fa-2x' style='color:white;'></i>`;
            }
            else{
                document.getElementById("temp").innerHTML = `${weatherArr[0].main.temp}°C <p> <span><i class='fa-solid fa-cloud fa-2x' style='color: white;'></i><span></p>`;
            }
        }
    } catch (error) {
        console.error("Error fetching weather data: ", error);
        defaultdata.innerText="Something went wrong!!! Please enter correct City name"
    }
}

searchbtn.addEventListener('click', getInfo);

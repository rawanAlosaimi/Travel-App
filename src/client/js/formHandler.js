const tripResultBox = document.getElementsByClassName('tripResultBox')[0];
var box = document.getElementsByClassName("box")[0];
function handleSubmit(event) {
    event.preventDefault()

    tripResultBox.style.opacity = 1;
    
    let formlocation = document.getElementById('location').value;
    let date = document.getElementById('dateForm').value;

    if (Client.checkForValue(formlocation, date)) {

        postData('http://localhost:8081/API', { location: formlocation })
            .then(function (res) {
                document.getElementById('date').innerHTML = date;
                document.getElementById('name').innerHTML = res.Geonames_data.name;
                document.getElementById('countryName').innerHTML = res.Geonames_data.countryName;
                document.getElementById('high_temp').innerHTML = res.Weatherbit_data.high_temp;
                document.getElementById('low_temp').innerHTML = res.Weatherbit_data.low_temp;
                document.getElementById('description').innerHTML = res.Weatherbit_data.description;
                box.style.backgroundImage = `url('${res.Pixabay_data.img}')`;
            })
    } else {
        alert('Please Enter your trip Information!');
    }
}

//POST request to add the API data
const postData = async (location = '', data = {}) => {
    console.log('Data is : ', data)
    const response = await fetch(location, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

export { handleSubmit }
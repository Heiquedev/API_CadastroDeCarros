async function fetchData() {
    let tableBody = document.getElementById("carrosCadastrados")

    tableBody.innerHTML = "<td colspan='5' class='text-center'>Carregando Carros...</td>";

    try {
        const response = await fetch("https://carangas.herokuapp.com/cars")

        const data = await response.json()
        const cars = data
        console.log(cars);

        tableBody.innerHTML = "";

        cars.reverse().forEach((car) => {
            const fuel = fuelName(car.gasType)
            const row = `
            <tr data-id="${car._id}">
                <td>${car.brand}</td>
                <td>${car.name}</td>
                <td>${car.price}</td>
                <td>${fuel}</td>
                <td>
                <button class='btn btn-danger btn-sm' id='delete-btn' data-id='${car._id}'>Deletar</button>
                </td>
            `
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error(error);

    }
}

function fuelName(fuel) {
    const fuelType = {
        "0": "Desconhecido",
        "1": "Gasolina",
        "2": "Etanol + Gasolina",
        "3": "Eletricidade",
        "4": "Etanol"
    };
    return fuelType[fuel] || " - ";
}

async function addCar(event) {
    event.preventDefault();
    var data = {
        "brand": "SENAC",
        "gasType": 3,
        "name": "Celso",
        "price": 10000000
    }

    try {
        const response = await fetch(`https://carangas.herokuapp.com/cars`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log("Carro adicionado com sucesso!!");

    } catch (error) {
        console.error(error);

    }
}

document.addEventListener('click', function (event) {
    if (event.target.id.startsWith('delete-btn')) {
        const carId = event.target.getAttribute('data-id')
        deleteCar(carId)
    }
})

async function deleteCar(carId) {
    try {
        const response = await fetch(`https://carangas.herokuapp.com/cars/${carId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao Deletar o carro");
        }
        alert(`SENAC PATROCINA NOIS id=${carId}`)
        console.log("Carro deletado com sucesso!");

        location.reload()

    } catch (error) {
        console.error(error);
    }
}

fetchData();
window.onload = () => {
    fetch('http://127.0.0.1:8000/active-cases')
        .then(data => data.json())
        .then((data) => {
            document.querySelector('.date').innerHTML = data.date;
            document.querySelector('.active-data').innerHTML = data.active;
            document.querySelector('.new-cases').innerHTML = data.newCases;
        })
}
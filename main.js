window.onload = () => {
    fetch('https://vibrant-grammar-254613.ew.r.appspot.com/active-cases')
        .then(data => data.json())
        .then((data) => {
            document.querySelector('.date').innerHTML = data.date;
            document.querySelector('.active-data').innerHTML = data.active;
            document.querySelector('.symptomatic-data').innerHTML = data.casesSymptomatic;
            document.querySelector('.contacts-data').innerHTML = data.contacts;
        })
}
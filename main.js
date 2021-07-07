window.onload = () => {
    fetch('https://vibrant-grammar-254613.ew.r.appspot.com/active-cases')
        .then(data => data.json())
        .then((data) => {
            document.querySelector('.date').innerHTML = data[1].date;
            document.querySelector('.active-data').innerHTML = data[1].active;
            document.querySelector('.symptomatic-data').innerHTML = data[1].casesSymptomatic;
            document.querySelector('.contacts-data').innerHTML = data[1].contacts;

            if((data[1].dayOfWeek != 5 || data[1].dayOfWeek != 6) && (data[0].dayOfWeek != 5 || data[0].dayOfWeek != 6))
            {if(data[1].active - data[0].active > 0){
                document.querySelector('.active-data-delta').innerHTML = `+${data[1].active - data[0].active}`;
                document.querySelector('.active-data-delta').classList.add('positive')
            }else{
                document.querySelector('.active-data-delta').innerHTML = `-${data[1].active - data[0].active}`;
                document.querySelector('.active-data-delta').classList.add('negative')
            }


            if(data[1].casesSymptomatic - data[0].casesSymptomatic > 0){
                document.querySelector('.symptomatic-data-delta').innerHTML = `+${data[1].casesSymptomatic - data[0].casesSymptomatic}`;
                document.querySelector('.symptomatic-data-delta').classList.add('positive')
            }else{
                document.querySelector('.symptomatic-data-delta').innerHTML = `-${data[1].casesSymptomatic - data[0].casesSymptomatic}`;
                document.querySelector('.symptomatic-data-delta').classList.add('negative')
            }

            if(data[1].contacts - data[0].contacts > 0){
                document.querySelector('.contacts-data-delta').innerHTML = `+${data[1].contacts - data[0].contacts}`;
                document.querySelector('.contacts-data-delta').classList.add('positive')
            }else{
                document.querySelector('.contacts-data-delta').innerHTML = `-${data[1].contacts - data[0].contacts}`;
                document.querySelector('.contacts-data-delta').classList.add('negative')
            }
            document.querySelector('.previous-day').innerHTML = data[0].date
}else{
    document.querySelector('.previous-day').innerHTML = "Previous day was a weekend so no data to compare"
}
            console.log("test")
            
        })
}
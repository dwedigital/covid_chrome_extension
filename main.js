var Chart = require('chart.js');

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
            
        })

        
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      
}
var Chart = require('chart.js');

window.onload = () => {
    fetch('https://vibrant-grammar-254613.ew.r.appspot.com/active-cases')
    //fetch('http://127.0.0.1:8000/active-cases')
        .then(data => data.json())
        .then((data) => {
            var ctx = document.getElementById("myChart").getContext("2d");
            var myChart = new Chart(ctx, {
              type: "bar",
              data: {
                labels: data[3].dates.reverse().slice(-60),
                datasets: [
                  {
                    label: "# of Non Symptomatic Cases",
                    data: data[3].activeCases.reverse().slice(-60),
                    backgroundColor: [
                        "rgba(50, 99, 132, 1)",

                    ],
                  },
                  {
                    label: "# of Symptomatic Cases",
                    data: data[3].symptomaticCases.reverse().slice(-60),
                    backgroundColor: [
                      "rgba(255, 99, 132, 1)"
                    ],
                  }
                ]
              },
              options: {
                  responsive: true,
                scales: {
                    x:{stacked:true},
                  y: {
                    stacked: true
                  }
                },
                plugins:{
                    title:{
                        display: true,
                        text: "Active case numbers for the last 60 Days"
                    },
                    subtitle: {
                        display: true,
                        text: 'Weekends are excluded due to no data collection',
                        color: 'blue',
                        font: {
                          size: 12,
                          family: 'tahoma',
                          weight: 'normal',
                          style: 'italic'
                        },
                      padding: {
                        bottom: 10
                      }
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
              }
            });
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

        document.querySelector('.title').addEventListener('click', ()=>window.close())

}
var Chart = require("chart.js");

window.onload = () => {
  fetch("https://vibrant-grammar-254613.ew.r.appspot.com/active-cases")
    //fetch('http://127.0.0.1:8000/active-cases')
    .then((data) => data.json())
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
              backgroundColor: ["rgba(50, 99, 132, 1)"],
            },
            {
              label: "# of Symptomatic Cases",
              data: data[3].symptomaticCases.reverse().slice(-60),
              backgroundColor: ["rgba(255, 99, 132, 1)"],
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: { stacked: true },
            y: {
              stacked: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Active case numbers for the last 60 Days",
            },
            subtitle: {
              display: true,
              text: "Weekends are excluded due to no data collection",
              color: "blue",
              font: {
                size: 12,
                family: "tahoma",
                weight: "normal",
                style: "italic",
              },
              padding: {
                bottom: 10,
              },
            },
            legend: {
              position: "bottom",
            },
          },
        },
      });

      const numFormat = new Intl.NumberFormat('en-US')

      // Set up today's dataset

      document.querySelector(".date").innerHTML = data[1].date;
      document.querySelector(".active-data").innerHTML = numFormat.format(data[1].active);
      document.querySelector(".symptomatic-data").innerHTML = numFormat.format(data[1].casesSymptomatic);
      document.querySelector(".contacts-data").innerHTML = numFormat.format(data[1].contacts);
      document.querySelector(".hospital-data").innerHTML = numFormat.format(data[1].hospitalCases);

      // check that any of the days were not weekend days as no data is recorded by Gov
      if (
        (data[1].dayOfWeek != 5 || data[1].dayOfWeek != 6) &&
        (data[0].dayOfWeek != 5 || data[0].dayOfWeek != 6)
      ) {

        document.querySelector(".previous-day").innerHTML = data[0].date;

          // active cases comparison
          if (data[1].active - data[0].active > 0) {
            document.querySelector(".active-data-delta").innerHTML = `+${
                numFormat.format(data[1].active - data[0].active)
            }`;
            document
              .querySelector(".active-data-delta")
              .classList.add("table-danger");
          } 
          else if (data[1].active - data[0].active == 0){
            document.querySelector(".active-data-delta").innerHTML = "No change";
              document
                .querySelector(".active-data-delta")
                .classList.add("table-info");
          }
          else {
            document.querySelector(".active-data-delta").innerHTML = `-${
                numFormat.format(data[1].active - data[0].active)
            }`;
            document
              .querySelector(".active-data-delta")
              .classList.add("table-success");
          }

        // symptomatic cases comparison
        if (data[1].casesSymptomatic - data[0].casesSymptomatic > 0) {
            document.querySelector(".symptomatic-data-delta").innerHTML = `+${
                numFormat.format(data[1].casesSymptomatic - data[0].casesSymptomatic)
            }`;
            document
              .querySelector(".symptomatic-data-delta")
              .classList.add("table-danger");
          } 
          else if (data[1].casesSymptomatic - data[0].casesSymptomatic == 0){
            document.querySelector(".symptomatic-data-delta").innerHTML = "No change";
              document
                .querySelector(".symptomatic-data-delta")
                .classList.add("table-info");
          }
          else {
            document.querySelector(".symptomatic-data-delta").innerHTML = `-${
                numFormat.format(data[1].casesSymptomatic - data[0].casesSymptomatic)
            }`;
            document
              .querySelector(".symptomatic-data-delta")
              .classList.add("table-success");
          } 
        // hospital cases comparison
        if (data[1].hospitalCases - data[0].hospitalCases > 0) {
            document.querySelector(".hospital-data-delta").innerHTML = `+${
                numFormat.format(data[1].hospitalCases - data[0].hospitalCases)
            }`;
            document
              .querySelector(".hospital-data-delta")
              .classList.add("table-danger");
          } 
          else if (data[1].hospitalCases - data[0].hospitalCases == 0){
            document.querySelector(".hospital-data-delta").innerHTML = "No change";
              document
                .querySelector(".hospital-data-delta")
                .classList.add("table-info");
          }
          else {
            document.querySelector(".hospital-data-delta").innerHTML = `-${
                numFormat.format(data[1].hospitalCases - data[0].hospitalCases)
            }`;
            document
              .querySelector(".hospital-data-delta")
              .classList.add("table-success");
          }

        // case contacts comparison
        if (data[1].contacts - data[0].contacts > 0) {
            document.querySelector(".contacts-data-delta").innerHTML = `+${
                numFormat.format(data[1].contacts - data[0].contacts)
            }`;
            document
              .querySelector(".contacts-data-delta")
              .classList.add("table-danger");
          } 
          else if (data[1].contacts - data[0].contacts == 0){
            document.querySelector(".contacts-data-delta").innerHTML = "No change";
              document
                .querySelector(".contacts-data-delta")
                .classList.add("table-info");
          }
          else {
            document.querySelector(".contacts-data-delta").innerHTML = `-${
                numFormat.format(data[1].contacts - data[0].contacts)
            }`;
            document
              .querySelector(".contacts-data-delta")
              .classList.add("table-success");
          } 
    }
      // If any of the days were a weekend. Used as a safety fallback
      else {
        document.querySelector(".previous-day").innerHTML =
          "Previous day was a weekend so no data to compare";
      }
    });
    
  document
    .querySelector(".btn-close")
    .addEventListener("click", () => window.close());
};

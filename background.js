var today = false;

// API call to check if today's data has been published and update badge
function fetchData() {
  console.log("checking");
  fetch("https://vibrant-grammar-254613.ew.r.appspot.com/check-update")
    .then((data) => data.json())
    .then((data) => {
      if (data.today) {
        chrome.action.setBadgeBackgroundColor({ color: "#F00" });
        chrome.action.setBadgeText({ text: "NEW" });
        today = true;
      }
    });
}

chrome.runtime.onInstalled.addListener(function () {
  fetchData();
  chrome.alarms.create("dateChecker", { periodInMinutes: 15 });
});

chrome.alarms.onAlarm.addListener((e) => {
  if (e.name === "dateChecker") {
    if (today == false) {
      fetchData();
    }
  } else if (e.name === "reset") {
    console.log("reset");
    today = false;
  }
});

chrome.runtime.onMessage.addListener(() => {
    // set to today + 1 day at 12:00pm
  var restart = new Date();
  restart.setDate(restart.getDate() + 1);
  restart.setHours(12);
  restart.setMinutes(0);
  restart.setMilliseconds(0);
  
  if (today == true) {
    console.log("set timer");
    chrome.alarms.create("reset", { when: restart.getTime()/1000 });
  }
});
//chartul de tip line
var options = {
  series: [{
  name: 'Income',
  type: 'column',
  data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
}, {
  name: 'Cashflow',
  type: 'column',
  data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
}, {
  name: 'Revenue',
  type: 'line',
  data: [20, 29, 37, 36, 44, 45, 50, 58]
}],
  chart: {
  height: 350,
  type: 'line',
  stacked: false,
  toolbar: {
    show: false
  },
},
dataLabels: {
  enabled: false
},
stroke: {
  width: [1, 1, 4]
},
title: {
  text: 'XYZ - Stock Analysis (2009 - 2016)',
  align: 'left',
  offsetX: 110
},
xaxis: {
  categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
},
yaxis: [
  {
    seriesName: 'Income',
    axisTicks: {
      show: true,
    },
    axisBorder: {
      show: true,
      color: '#008FFB'
    },
    labels: {
      style: {
        colors: '#008FFB',
      }
    },
    title: {
      text: "Income (thousand crores)",
      style: {
        color: '#008FFB',
      }
    },
    tooltip: {
      enabled: true
    }
  },
  {
    seriesName: 'Cashflow',
    opposite: true,
    axisTicks: {
      show: true,
    },
    axisBorder: {
      show: true,
      color: '#00E396'
    },
    labels: {
      style: {
        colors: '#00E396',
      }
    },
    title: {
      text: "Operating Cashflow (thousand crores)",
      style: {
        color: '#00E396',
      }
    },
  },
  {
    seriesName: 'Revenue',
    opposite: true,
    axisTicks: {
      show: true,
    },
    axisBorder: {
      show: true,
      color: '#FEB019'
    },
    labels: {
      style: {
        colors: '#FEB019',
      },
    },
    title: {
      text: "Revenue (thousand crores)",
      style: {
        color: '#FEB019',
      }
    }
  },
],
tooltip: {
  fixed: {
    enabled: true,
    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
    offsetY: 30,
    offsetX: 60
  },
},
legend: {
  horizontalAlign: 'left',
  offsetX: 40
}
};
var chart = new ApexCharts(document.querySelector("#progressChart"), options);
chart.render();
   
//chartul de tip bar
  var options1 = {
    series: [{
    data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
  }],
    chart: {
    type: 'line',
    width: 100,
    height: 35,
    sparkline: {
      enabled: true
    },
    
  },
  tooltip: {
    fixed: {
      enabled: false
    },
    x: {
      show: false
    },
    
    y: {
      title: {
        formatter: function (seriesName) {
          return ''
        }
      }
    },
    marker: {
      show: false
    },
  
  },
  colors: ['red'],
  
  };

  var chart1 = new ApexCharts(document.querySelector("#chartper"), options1);
  chart1.render();
  
  //chartul de tip pie

  var options = {
    series: [25, 15, 44, 55, 41, 17],
    chart: {
    width: '100%',
    height: '100%',
    type: 'pie',
  },
  labels: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  theme: {
    monochrome: {
      enabled: true,
      color: '#FF0000',
      shadeTo: 'light',
      shadeIntensity: 0.6,
    },
  },
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5,
      },
    },
  },
  grid: {
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  dataLabels: {
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex]
      return [name, val.toFixed(1) + '%']
    },
  },
  legend: {
    show: false,
  },
  
  };

  var chart = new ApexCharts(document.querySelector("#grupchart"), options);
  chart.render();

  //adaugare in todo list
  function loadTodayTasks() {
    const schedule = JSON.parse(localStorage.getItem("gym-schedule")) || {};
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  
    const tasks = schedule[today] || [];
    const list = document.getElementById("todo-list");
  
    list.innerHTML = "";
    tasks.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} (${item.sets} serii)`;
      list.appendChild(li);
    });
  }
  window.addEventListener("load", loadTodayTasks);

  //timer start
  let startBtn=document.getElementById("start-button");
  let stopBtn=document.getElementById("stop-button");

  let hours= 0;
  let minutes= 0;
  let seconds= 0;
  let count= 0;
  let timer= false;
  let stopcnt=0;

   startBtn.addEventListener("click",function(){
    timer=true;
    stopWatch();
  });

  stopBtn.addEventListener("click", function () {
    stopcnt++;
    timer = false;
    if (stopcnt === 1) {
      stopBtn.innerHTML = "RESET";
    }
  
    if (stopcnt === 2) {
      resetStopwatch();
      stopcnt = 0; 
      stopBtn.innerHTML = "STOP";
    }
  });

 

  function stopWatch() {
    if (timer) {
        count++;

        if (count == 100) {
            seconds++;
            count = 0;
        }

        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }

        if (minutes == 60) {
            hours++;
            minutes = 0;
            seconds = 0;
        }

        let hrString = hours;
        let minString = minutes;
        let secString = seconds;

        if (hours < 10) {
            hrString = "0" + hrString;
        }

        if (minutes < 10) {
            minString = "0" + minString;
        }

        if (seconds < 10) {
            secString = "0" + secString;
        }

        document.getElementById('hours').innerHTML = hrString;
        document.getElementById('minutes').innerHTML = minString;
        document.getElementById('seconds').innerHTML = secString;
  
        setTimeout(stopWatch, 10);
    }
}
function resetStopwatch() {
  hours = 0;
  minutes = 0;
  seconds = 0;
  count = 0;

  document.getElementById('hours').innerHTML = "00";
  document.getElementById('minutes').innerHTML = "00";
  document.getElementById('seconds').innerHTML = "00";
}
  //calorie burn


  //calendar heatmap

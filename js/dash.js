async function loadProgressChartData() {
  const res = await fetch('php/progress_chart.php');
  const data = await res.json();

  // Extract date-wise data
  const labels = data.map(item => item.date);
  const totalWeights = data.map(item => parseInt(item.total_weight));
  const totalReps = data.map(item => parseInt(item.total_reps)); // or total_sets if preferred

  const options = {
    series: [
      {
        name: 'Reps',
        type: 'column',
        data: totalReps
      },
      {
        name: 'Weight',
        type: 'line',
        data: totalWeights
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: [0, 4]
    },
    title: {
      text: 'Progress Chart',
       align: 'center',
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#263238'
          }
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1]
    },
    labels: labels,
    yaxis: [
      {
        title: {
          text: 'Reps'
        }
      },
      {
        opposite: true,
        title: {
          text: 'Weight (kg)'
          
        }
      }
    ],
    colors: ['red', 'black'],
  };

  const chart = new ApexCharts(document.querySelector("#progressChart"), options);
  chart.render();
}
 
  //chartul de tip pie

function renderMuscleGroupPieChart() {
  const schedule = JSON.parse(localStorage.getItem('gym-schedule')) || {};
  const muscleCount = {};

  Object.values(schedule).flat().forEach(ex => {
    const muscle = ex.muscle || 'unknown';
    muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
  });

  const labels = Object.keys(muscleCount);
  const values = Object.values(muscleCount);

   const options = {
          series: values,
          chart: {
          width: '100%',
          height: '100%',
          type: 'pie',
        },
        labels: labels,
        theme: {
          monochrome: {
            enabled: true,
            color: '#FF4560',
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
        title: {
          text: 'Muscle Group Distribution',
          align: 'center',
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#263238'
          }
        },
        };

       

  const chart = new ApexCharts(document.querySelector("#grupchart"), options);
  chart.render();
}


  //adaugare in todo list
 async function loadTodayTasks() {
  const response = await fetch("php/load_schedule.php");
  const schedule = await response.json();

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const todayExercises = schedule.filter(item => item.day_of_week.toLowerCase() === today);

  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  todayExercises.forEach(item => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("exercise-checkbox");
    checkbox.dataset.name = item.exercise_name;
    checkbox.dataset.sets = item.sets;
    checkbox.dataset.muscle = item.muscle_group || "unknown";
    li.appendChild(checkbox);

    const label = document.createElement("label");
    label.textContent = ` ${item.exercise_name} (${item.sets} sets) `;
    li.appendChild(label);

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = ">";
    toggleBtn.classList.add("toggle-dropdown");
    li.appendChild(toggleBtn);

    const setsContainer = document.createElement("div");
    setsContainer.classList.add("sets-container");
    setsContainer.style.display = "none";

    for (let i = 1; i <= item.sets; i++) {
      const setDiv = document.createElement("div");
      setDiv.classList.add("set-input");

      const repsInput = document.createElement("input");
      repsInput.type = "number";
      repsInput.placeholder = `Reps (Set ${i})`;
      repsInput.classList.add("reps-input");

      const weightInput = document.createElement("input");
      weightInput.type = "number";
      weightInput.placeholder = `Weight (Set ${i})`;
      weightInput.classList.add("weight-input");

      setDiv.appendChild(repsInput);
      setDiv.appendChild(weightInput);
      setsContainer.appendChild(setDiv);
    }

    toggleBtn.addEventListener("click", () => {
      setsContainer.style.display = setsContainer.style.display === "none" ? "block" : "none";
    });

    li.appendChild(setsContainer);
    list.appendChild(li);
  });
}


  function calculateWeeklyStats() {
    const schedule = JSON.parse(localStorage.getItem("gym-schedule")) || {};
    let totalSets = 0;
    let totalExercises = 0;
    let activeDays = 0;
  
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
    days.forEach(day => {
      const dayExercises = schedule[day] || [];
      if (dayExercises.length > 0) activeDays++;
      totalExercises += dayExercises.length;
      dayExercises.forEach(ex => {
        totalSets += parseInt(ex.sets);
      });
    });
  
    const avgSetsPerDay = activeDays > 0 ? (totalSets / activeDays).toFixed(1) : 0;
  
    // Afișare pe pagină
    document.getElementById("exercise-week-count").textContent = totalExercises;
    document.getElementById("avg-sets-day").textContent = avgSetsPerDay;
  }

async function calculateAverageRepsPerDay() {
  try {
    const response = await fetch('php/average_reps_per_day.php');
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      document.getElementById("avg-reps-day").textContent = "0";
      return;
    }

    const totalReps = data.reduce((sum, day) => sum + parseInt(day.total_reps), 0);
    const avgReps = (totalReps / data.length).toFixed(1);

    document.getElementById("avg-reps-day").textContent = avgReps;
  } catch (error) {
    console.error('Error:', error);
  }
}

calculateAverageRepsPerDay();

async function loadWeeklyWeight() {
  try {
    const response = await fetch('php/weekly_weight.php');
    const data = await response.json();
    document.getElementById('progress-percentage').textContent = data.total + ' kg';
  } catch (error) {
    console.error('Weight Load Error:', error);
  }
}

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


//buton finish day
async function finishDay() {
  const tasks = [];
  const listItems = document.querySelectorAll("#todo-list li");

  listItems.forEach(li => {
    const checkbox = li.querySelector(".exercise-checkbox");
    if (!checkbox.checked) return;

    const name = checkbox.dataset.name;
    const muscle = checkbox.dataset.muscle || "unknown";
    const setsData = [];

    const setDivs = li.querySelectorAll(".set-input");
    setDivs.forEach(setDiv => {
      const reps = parseInt(setDiv.querySelector(".reps-input").value) || 0;
      const weight = parseInt(setDiv.querySelector(".weight-input").value) || 0;
      setsData.push({ reps, weight });
    });

    tasks.push({
      name,
      muscle,
      setsData,
      date: new Date().toISOString().split('T')[0]
    });
  });

  if (tasks.length === 0) {
    alert("N-ai completat nimic!");
    return;
  }

  const response = await fetch("php/salveaza_progres.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tasks)
  });

  const result = await response.json();
  if (result.status === "success") {
    alert("Progresul a fost salvat cu succes!");
    calculateAverageRepsPerDay();
    calculateWeeklyStats();
    loadWeeklyWeight();
    loadProgressChartData()
    renderMuscleGroupPieChart();

  } else {
    alert("Eroare la salvare: " + result.message);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  loadTodayTasks();
  calculateWeeklyStats();
  calculateAverageRepsPerDay();
  loadWeeklyWeight();
  loadProgressChartData()
  renderMuscleGroupPieChart();
});


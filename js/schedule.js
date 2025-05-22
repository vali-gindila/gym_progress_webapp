async function loadCategories() {
  const res = await fetch("json/exercises.json");
  const data = await res.json();

  const select = document.getElementById("category-select");
  select.innerHTML = "";

  data.forEach(group => {
    const opt = document.createElement("option");
    opt.textContent = group.muscle;
    opt.value = group.muscle;
    select.appendChild(opt);
  });

  if (data.length > 0) {
    loadExercisesByCategory(data[0].muscle);
  }
}

async function loadExercisesByCategory(muscleGroup) {
  const res = await fetch("json/exercises.json");
  const data = await res.json();

  const select = document.getElementById("exercise-select");
  select.innerHTML = "";

  const group = data.find(g => g.muscle === muscleGroup);


  group.exercises.forEach(ex => {
    const opt = document.createElement("option");
    opt.value = ex.name;
    opt.textContent = ex.name;
    select.appendChild(opt);
  });

}

document.getElementById("category-select").addEventListener("change", (e) => {
  loadExercisesByCategory(e.target.value);
});


window.onload = () => {
  loadCategories();
};

async function addToSchedule() {
  const exerciseSelect = document.getElementById("exercise-select");
  const selectedOption = exerciseSelect.options[exerciseSelect.selectedIndex];
  const day = document.getElementById("day-select").value;
  const sets = document.getElementById("sets").value;

  const categorySelect = document.getElementById("category-select");
  const muscle = categorySelect?.value || "unknown";

  if (!selectedOption) return;

  const name = selectedOption.value;

  const newItem = {
    name: name,
    sets: sets,
    muscle: muscle,
    day: day
  };

  // Trimitem exercițiul către server
  const response = await fetch("php/save_schedule.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem)
  });

  const result = await response.json();
  if (result.status === "success") {
    renderExerciseToDay(day, newItem);
  } else {
    alert("Eroare la salvare!");
  }
}




function renderExerciseToDay(day, item) {
  const container = document.getElementById(day);
  const el = document.createElement("div");
  el.className = "exercise-item";
  el.innerHTML = `
  <button class="remove-btn">✖</button>
    <strong>${item.name}</strong> (${item.sets} sets)
  `;
  el.querySelector(".remove-btn").addEventListener("click", () => {
    el.remove();
    removeFromSchedule(day, item.id);
  });
  container.appendChild(el);
}

function removeFromSchedule(day, id) {
  const schedule = JSON.parse(localStorage.getItem("gym-schedule")) || {};
  if (!schedule[day]) return;

  schedule[day] = schedule[day].filter(item => item.id !== id);
  localStorage.setItem("gym-schedule", JSON.stringify(schedule));
}

async function loadScheduleFromDatabase() {
  const response = await fetch("php/load_schedule.php");
  const schedule = await response.json();

  schedule.forEach(item => {
    const day = item.day_of_week.toLowerCase();
    const renderedItem = {
      name: item.exercise_name,
      sets: item.sets,
      muscle: item.muscle_group,
      id: item.exercise_name
    };
    renderExerciseToDay(day, renderedItem);
  });
}


window.addEventListener("load", () => {
  loadCategories();
  loadScheduleFromDatabase();
});

//dropdown menu
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
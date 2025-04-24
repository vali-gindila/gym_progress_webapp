let muscleGroups = [];

fetch('json/exercises.json')
  .then(res => res.json())
  .then(data => {
    muscleGroups = data;
    populateMuscleGroupSelect(data);
  });

  function populateMuscleGroupSelect(data) {
    const select = document.getElementById("category-select");
    select.innerHTML = "";

    data.forEach(group => {
      const opt = document.createElement("option");
      opt.value = group.muscle;
      opt.textContent = group.muscle;
      select.appendChild(opt);
    });
  }

let exerciseList = [];

fetch('json/exercises.json')
  .then(res => res.json())
  .then(data => {
    exerciseList = data;
    populateExerciseSelect(data);
  });

function populateExerciseSelect(data) {
  const select = document.getElementById("exercise-select");
  select.innerHTML = "";

  data.forEach(group => {
    group.exercises.forEach(ex => {
      const opt = document.createElement("option");
      opt.value = ex.name;
      opt.textContent = `${ex.name} (${group.muscle})`;
      select.appendChild(opt);
    });
  });
}
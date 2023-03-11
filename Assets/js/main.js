// Todo: Get all DOM elements
const [nextBtns, prevBtns, firstBtn, rootDocument, themeBtn] = [
  qsa(".next-btn"),
  qsa(".prev-btn"),
  _("firstBtn"),
  qs(":root"),
  _("themeBtn"),
];

// Toggle dark and light themes;
document.addEventListener("DOMContentLoaded", () => {
  let theme =
    JSON.parse(localStorage.getItem("weightCaclTheme")) ||
    localStorage.setItem("weightCaclTheme", JSON.stringify("light"));
  rootDocument.setAttribute("color-scheme", `${theme}`);
});

themeBtn.addEventListener("click", () => {
  theme = JSON.parse(localStorage.getItem("weightCaclTheme"));
  if (theme === "light") {
    localStorage.setItem("weightCaclTheme", JSON.stringify("dark"));
    rootDocument.setAttribute("color-scheme", `dark`);
  } else {
    localStorage.setItem("weightCaclTheme", JSON.stringify("light"));
    rootDocument.setAttribute("color-scheme", `light`);
  }
});

// ----------------------------------SLIDER FUNCTIONALITY-------------------------
// Call function when next Btns are clicked
nextBtns.forEach((nextBtn) => {
  nextBtn.addEventListener("click", slideNext);
});

// Call function when previous Btns are clicked
prevBtns.forEach((prevBtn) => {
  prevBtn.addEventListener("click", slidePrevious);
});

// FUNCTION: slideNext
function slideNext() {
  let slide = this.parentNode.parentNode;
  let nextSlide = slide.nextElementSibling;
  slide.style.left = "-400px";
  nextSlide.style.left = "0px";
}

// FUNCTION: slidePrevious
function slidePrevious() {
  let slide = this.parentNode.parentNode;
  let previousSlide = slide.previousElementSibling;
  slide.style.left = "400px";
  previousSlide.style.left = "0px";
}

//--------------------------------------------CALCUALTING O'LEVEL WEIGHTS------------------------------------------------------------------------------------------
firstBtn.addEventListener("click", totalOlevelWeights);
function totalOlevelWeights() {
  let allGrades = qsa(".grades option");
  let selectedGrades = [];
  allGrades.forEach((grade) => {
    if (grade.selected) {
      selectedGrades.push(grade.value);
    }
  });
  let gradePoints = [],
    distinctions = [],
    credits = [],
    passes = [],
    failures = [];
  selectedGrades.forEach((grade) => {
    switch (grade) {
      case "D1":
      case "D2":
        gradePoints.push(0.3);
        distinctions.push(grade);
        break;
      case "C3":
      case "C4":
      case "C5":
      case "C6":
        gradePoints.push(0.2);
        credits.push(grade);
        break;
      case "P7":
      case "P8":
        gradePoints.push(0.1);
        passes.push(grade);
        break;

      default:
        gradePoints.push(0.0);
        failures.push(grade);
        break;
    }
  });
  olevelWeights = gradePoints
    .reduce((total, point) => total + point, 0)
    .toFixed(1);
  _("totalOlevelWeights").innerHTML = olevelWeights;
  calculatePercentageProgress(distinctions, credits, passes, failures);
  calculateCircularPercentProgress(olevelWeights);

  return olevelWeights;
}

function calculatePercentageProgress(distinctions, credits, passes, failures) {
  qs(".distinctions").style.width = `${distinctions.length * 10}%`;
  qs(".credits").style.width = `${credits.length * 10}%`;
  qs(".passes").style.width = `${passes.length * 10}%`;
  qs(".failures").style.width = `${failures.length * 10}%`;
  qs(".dist").innerText = `(${distinctions.length} * 0.3) `;
  qs(".cred").innerText = `(${credits.length} * 0.2) `;
  qs(".pass").innerText = `(${passes.length} * 0.1) `;
  qs(".fail").innerText = `(${failures.length} * 0.0) `;
}

function calculateCircularPercentProgress(weights) {
  if (weights > 1.5) {
    qs(".circular-progress .left .progres").style.transform = `rotate(180deg)`;
    qs(".circular-progress .right .progres").style.transform = `rotate(${
      ((weights - 1.5) / 1.5) * 180
    }deg)`;
  } else {
    qs(".circular-progress .right .progres").style.transform = `rotate(0)`;
    qs(".circular-progress .left .progres").style.transform = `rotate(${
      (weights / 1.5) * 180
    }deg)`;
  }
}

//--------------------------------------------CALCUALTING A'LEVEL WEIGHTS------------------------------------------------------------------------------------------
function toggleActiveClass(list) {
  list.forEach((li) => {
    li.addEventListener("click", (e) => {
      let btn =
        e.target.parentNode.parentNode.nextElementSibling.lastElementChild;
      removeActiveClass(list);
      e.target.classList.add("active");

      let takenSubjects = [];
      let scoredGrades = [];

      let subjectsTaken = qsa(".a-subjects .active");
      let gradesScored = qsa(".a-grades .active");

      let activeElm = qsa(".active");
      if (activeElm.length < 0) {
        btn.classList.add("hide");
      } else {
        btn.classList.remove("hide");
      }

      subjectsTaken.forEach((subjectTaken) => {
        takenSubjects.push(subjectTaken.innerText);
      });
      gradesScored.forEach((gradeScored) => {
        scoredGrades.push(gradeScored.innerText);
      });
      printAlevelSubjects(takenSubjects);
      computeAlevelGrades(scoredGrades);
    });
  });
}
function removeActiveClass(list) {
  list.forEach((li) => {
    li.classList.remove("active");
  });
}

toggleActiveClass(qsa(".relevant-1 li"));
toggleActiveClass(qsa(".relevant-2 li"));
toggleActiveClass(qsa(".essential li"));
toggleActiveClass(qsa(".subsidiary-subjects li"));
toggleActiveClass(qsa(".relevant-1-grades li"));
toggleActiveClass(qsa(".relevant-2-grades li"));
toggleActiveClass(qsa(".essential-grades li"));
toggleActiveClass(qsa(".subsidiary-grades li"));
toggleActiveClass(qsa(".gp-grades li"));

// ---------------------------Compute Alevel Scored Grades------------------------
function computeAlevelGrades(grades) {
  let points = [];
  var equivalencePoints;
  grades.forEach((grade) => {
    switch (grade) {
      case "A":
        equivalencePoints = 6;
        break;
      case "B":
        equivalencePoints = 5;
        break;
      case "C":
        equivalencePoints = 4;
        break;
      case "D":
        equivalencePoints = 3;
        break;
      case "E":
        equivalencePoints = 2;
        break;
      case "O":
        equivalencePoints = 1;
        break;

      default:
        equivalencePoints = 0;
        break;
    }
    points.push(equivalencePoints); //i.e [6,6,5,1,1]

    qs(
      ".grades-scored"
    ).innerText = `${grades[0]}${grades[1]}${grades[2]}${points[3]}${points[4]}`;

    let totalPoints = points.reduce((total, point) => total + point);

    _(
      "totalPoints"
    ).innerHTML = `${totalPoints} <span class="text-12 flex-end">points</span>`;
    calculatePointsPercentage(totalPoints);

    let relevantOneWeights = points[0] * 3;
    let relevantTwoWeights = points[1] * 3;
    let essentialWeights = points[2] * 2;
    let subsidiaryWeights = points[3] * 1;
    let gpWeights = points[4] * 1;

    let totalAlevelWeights =
      relevantOneWeights +
      relevantTwoWeights +
      essentialWeights +
      subsidiaryWeights +
      gpWeights;

    _("totalWeights").innerText = totalAlevelWeights;
    calculateWeightsPercentage(totalAlevelWeights);

    calculateSubjectProgress(points);

    genderPoints(totalAlevelWeights);
  });
}

// ---------------------------Print Alevel Take Subjects------------------------
function printAlevelSubjects(subjects) {
  qs(".rel-1").innerText = subjects[0];
  qs(".rel-2").innerText = subjects[1];
  qs(".ess").innerText = subjects[2];
  qs(".sub").innerText = subjects[3] + " & GP";
}

// FUNCTION: Calculate total points percentage
function calculatePointsPercentage(points) {
  if (points > 10) {
    qs(".points .left .progres").style.transform = `rotate(180deg)`;
    qs(".points .right .progres").style.transform = `rotate(${
      ((points - 10) / 10) * 180
    }deg)`;
  } else {
    qs(".points .right .progres").style.transform = `rotate(0)`;
    qs(".points .left .progres").style.transform = `rotate(${
      (points / 10) * 180
    }deg)`;
  }
}

// FUNCTION: Calculate total alevel weights percentage
function calculateWeightsPercentage(weights) {
  if (weights > 25) {
    qs(".alevel-weights .left .progres").style.transform = `rotate(180deg)`;
    qs(".alevel-weights .right .progres").style.transform = `rotate(${
      ((weights - 25) / 25) * 180
    }deg)`;
  } else {
    qs(".alevel-weights .right .progres").style.transform = `rotate(0)`;
    qs(".alevel-weights .left .progres").style.transform = `rotate(${
      (weights / 25) * 180
    }deg)`;
  }
}

// FUNCTION: Calculate alevel subject progress percentage
function calculateSubjectProgress(points) {
  qs("#rel-1").style.width = `${(points[0] / 6) * 100}%`;
  qs("#rel-2").style.width = `${(points[1] / 6) * 100}%`;
  qs("#ess").style.width = `${(points[2] / 6) * 100}%`;
  qs("#sub_gp").style.width = `${((points[3] + points[4]) / 2) * 100}%`;
  qs(".r1").innerText = `(${points[0]} * 3) `;
  qs(".r2").innerText = `(${points[1]} * 3) `;
  qs(".es").innerText = `(${points[2]} * 2) `;
  qs(".s-g").innerText = `(${points[3]} + ${points[4]}) `;
}

// FUNCTION: calculate gender based weights;
function genderPoints(weights) {
  qsa(".gender-img").forEach((gender) => {
    gender.addEventListener("click", (e) => {
      let prevBtn =
        e.target.parentNode.parentNode.nextElementSibling.firstElementChild;
      let nextBtn =
        e.target.parentNode.parentNode.nextElementSibling.lastElementChild;

      nextBtn.classList.remove("hide");

      removeActiveClass(qsa(".gender-img"));
      gender.classList.add("active");

      let id = gender.id;
      var genderPoints = id === "female" ? 1.5 : 0;

      qs(".gen").innerText = id === "female" ? "Female + (1.5)" : "Male";

      prevBtn.addEventListener("click", (e) => {
        gender.classList.remove("active");
        nextBtn.classList.add("hide");
      });

      calculateOverallProgress(weights);

      var olevelAlevelWeights = Number(weights) + Number(totalOlevelWeights());
      var totalOverallWeights =
        Number(weights) + Number(genderPoints) + Number(totalOlevelWeights());

      _("totalOverall").innerText = totalOverallWeights;

      calculateOverallWeightsPercentage(olevelAlevelWeights);
    });
  });
}

// FUNCTION: Calculate overall weights percentage
function calculateOverallWeightsPercentage(weights) {
  if (weights > 26.5) {
    qs(".overall-weights .left .progres").style.transform = `rotate(180deg)`;
    qs(".overall-weights .right .progres").style.transform = `rotate(${
      ((weights - 26.5) / 26.5) * 180
    }deg)`;
  } else {
    qs(".overall-weights .right .progres").style.transform = `rotate(0)`;
    qs(".overall-weights .left .progres").style.transform = `rotate(${
      (weights / 26.5) * 180
    }deg)`;
  }
}

// FUNCTION: Calculate overall progress percentage
function calculateOverallProgress(weights) {
  qs(".olevel-weights").style.width = `${(totalOlevelWeights() / 3) * 100}%`;
  qs(".alevel-weight").style.width = `${(weights / 50) * 100}%`;
  qs("#olevel").innerText = `(${totalOlevelWeights()}) `;
  qs("#alevel").innerText = `(${weights}) `;
}

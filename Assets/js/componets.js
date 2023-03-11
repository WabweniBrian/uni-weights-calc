// FUNCTION:: Get DOM elements by id
const _ = (elm) => document.getElementById(elm);

// FUNCTION: Get DOM elements by querySelector
const qs = (elm) => document.querySelector(elm);

// FUNCTION: Get DOM elements by querySelectorAll
const qsa = (elm) => document.querySelectorAll(elm);

// Todo: Get all DOM elements

let [
  olevelSubjectsList,
  alevelSubjectsContainers,
  alevelGradesContainers,
  subsidiarySubjectContainer,
  subsidiaryGradesContainer,
  gpGradesContainer,
] = [
  qs(".olevel-subjects"),
  qsa(".alevel-subjects"),
  qsa(".alevel-grades"),
  qs(".subsidiary-subjects"),
  qs(".subsidiary-grades "),
  qs(".gp-grades"),
];

// Olevel Compulsory Subjects
let olevelSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Geography",
  "History",
];

// Olevel Optional Subjects
let olevelOptionalSubjects = [
  "Computer Science",
  "Literature",
  "CRE",
  "Entreprenuership",
  "Commerce",
  "Fine Arts",
  "French",
  "Luganda",
];

// Olevel Grades
let olevelGrades = ["D1", "D2", "C3", "C4", "C5", "C6", "P7", "P8", "F9"];

// Removing English subject
let eng = "English";
let newOlevelSubjects = olevelSubjects.filter((subject) => subject !== eng);

// Removing Computer Science subject
let compSci = "Computer Science";
let newOlevelOptionalSubjects = olevelOptionalSubjects.filter(
  (subject) => subject !== compSci
);

// Alevel Subjects
let alevelSubjects = [
  ...newOlevelSubjects,
  "Economics",
  ...newOlevelOptionalSubjects,
  "Lumasaba",
  "Acholi",
  "Ateso",
  "Germany",
  "Kiswahili",
  "Latin",
  "Arabic",
  "IRE",
  "Textile & Clothing",
  "Geo & Mech.Drawing",
  "Geo & Mech.Building",
  "Woodwork",
  "Music Literature",
];

// Alevel Grades
let alevelGrades = ["A", "B", "C", "D", "E", "O", "F"];

// Alevel Subsidiary subjects
let alevelSubsidiarySubjects = ["Subsidiary ICT", "Sub Math"];

// Alevel Subsidiary grades
let alevelSubsidiaryGrades = ["O", "F"];

// FUNCTION:: generates the select  options
function generateSelectOptions(element) {
  let selectHtml;
  element.forEach((elm) => {
    selectHtml += `<option value="${elm}">${elm}</option>`;
  });
  return selectHtml;
}

// Todo: Loop through the Olevel Compulsory Subjects and add them to the list of subjects
olevelSubjects.forEach((olevelSubject) => {
  olevelSubjectsList.innerHTML += `
    <li class="bg-white shadow-lg rounded px-2 pt-1 pb-1">
                <span class="subject">${olevelSubject}</span>
                <select name="" id="" class="form-control grades">
                    ${generateSelectOptions(olevelGrades)};
                </select>
            </li>
`;
});

// Todo: Loop through the Olevel Optional Subjects and add them to the list of subjects
for (let i = 1; i <= 3; i++) {
  olevelSubjectsList.innerHTML += `
    <li class="bg-white shadow-lg rounded px-2 pt-1 pb-1">
                <span class="subject">
                    <select name="" id="" class="form-control subject-select">
                        <option value="Optional 2">Optional ${i}</option>
                            ${generateSelectOptions(olevelOptionalSubjects)};
                    </select>
                    <select name="" id="" class="form-control grades ">
                            ${generateSelectOptions(olevelGrades)};
                    </select>
            </li>
`;
}

// ----------------------------------------------------------------A'LEVEL-----------------------------------------------------------------------------------------
// FUNCTION: populateAlevelSubjects list
function populateAlevelSubjects(subject) {
  alevelSubjectsContainers.forEach((container) => {
    container.innerHTML += `<li class="bg-white shadow-lg rounded px-2 pt-1 pb-1">${subject}</li>`;
  });
}

// FUNCTION: populateAlevelGrades list
function populateAlevelGrades(grade) {
  alevelGradesContainers.forEach((container) => {
    container.innerHTML += `<li class="bg-white shadow-lg rounded-full grid place-center">${grade}</li>`;
  });
}

alevelSubjects.forEach((alevelSubject) => {
  populateAlevelSubjects(alevelSubject);
});

alevelGrades.forEach((alevelGrade) => {
  populateAlevelGrades(alevelGrade);
});

alevelSubsidiarySubjects.forEach((alevelSubsidiarySubject) => {
  subsidiarySubjectContainer.innerHTML += `<li class="bg-white shadow-lg rounded px-2 pt-1 pb-1">${alevelSubsidiarySubject}</li>`;
});

alevelSubsidiaryGrades.forEach((alevelSubsidiaryGrade) => {
  subsidiaryGradesContainer.innerHTML += `<li class="bg-white shadow-lg rounded-full grid place-center">${alevelSubsidiaryGrade}</li>`;
});

alevelSubsidiaryGrades.forEach((alevelSubsidiaryGrade) => {
  gpGradesContainer.innerHTML += `<li class="bg-white shadow-lg rounded-full grid place-center">${alevelSubsidiaryGrade}</li>`;
});

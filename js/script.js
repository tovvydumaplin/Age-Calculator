//Define
let inputDay,
  inputMonth,
  inputYear,
  outputDays,
  outputMonths,
  outputYears,
  inputErrorDay,
  inputErrorMonth,
  inputErrorYear,
  inputLabelDay,
  inputLabelMonth,
  inputLabelYear;

document.addEventListener("DOMContentLoaded", function () {
  inputDay = document.getElementById("inputDay");
  inputMonth = document.getElementById("inputMonth");
  inputYear = document.getElementById("inputYear");
  outputDays = document.getElementById("outputDays");
  outputMonths = document.getElementById("outputMonths");
  outputYears = document.getElementById("outputYears");
  inputErrorDay = document.getElementById("inputErrorDay");
  inputErrorMonth = document.getElementById("inputErrorMonth");
  inputErrorYear = document.getElementById("inputErrorYear");
  inputLabelDay = document.getElementById("inputLabelDay");
  inputLabelMonth = document.getElementById("inputLabelMonth");
  inputLabelYear = document.getElementById("inputLabelYear");

  // event listeners pang call the functions
  inputDay.addEventListener("input", function () {
    this.value = this.value.slice(0, 2);
    calculateAge();
    validation();
    numbersOnly(event);
  });
  inputMonth.addEventListener("input", function () {
    this.value = this.value.slice(0, 2);
    calculateAge();
    validation();
    numbersOnly(event);
  });
  inputYear.addEventListener("input", function () {
    this.value = this.value.slice(0, 4);
    calculateAge();
    validation();
    numbersOnly(event);
  });
});

// Functions
function calculateAge() {
  // Parse ng input
  const day = parseInt(inputDay.value);
  const month = parseInt(inputMonth.value) - 1; // need mag lagay -1 kasi 0 based ang index ng month
  const year = parseInt(inputYear.value);

  // Validate input
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day < 1 ||
    day > 31 ||
    month < 0 ||
    month > 11 ||
    year > new Date().getFullYear()
  ) {
    // Pag invalid yung input, iseset lang sa - - yung output.
    outputYears.innerText = "- -";
    outputMonths.innerText = "- -";
    outputDays.innerText = "- -";
    return; // Exit agad para di mag tuloy
  }

  const currentDate = new Date();

  // date object para sa user
  const birthDate = new Date(year, month, day);

  let ageInMilliseconds = currentDate - birthDate;
  let ageDate = new Date(ageInMilliseconds);

  // Extract years, months, and days from age
  let ageInYears = ageDate.getUTCFullYear() - 1970;
  let ageInMonths = ageDate.getUTCMonth();
  let ageInDays = ageDate.getUTCDate() - 1; // need negative 1 kasi nag i-start ang getdate ng 1

  // Output the age
  outputYears.innerText = ageInYears;
  outputMonths.innerText = ageInMonths;
  outputDays.innerText = ageInDays;
}

function validation() {
  if (parseInt(inputDay.value) > 31) {
    inputDay.style.borderColor = "var(--error-color)";
    inputLabelDay.style.color = "var(--error-color)";
    inputErrorDay.style.visibility = "visible";
  } else {
    inputDay.style.borderColor = "";
    inputLabelDay.style.color = "";
    inputErrorDay.style.visibility = "hidden";
  }

  if (parseInt(inputMonth.value) > 12) {
    inputMonth.style.borderColor = "red";
    inputLabelMonth.style.color = "var(--error-color)";
    inputErrorMonth.style.visibility = "visible";
  } else {
    inputMonth.style.borderColor = "";
    inputLabelMonth.style.color = "";
    inputErrorMonth.style.visibility = "hidden";
  }

  if (parseInt(inputYear.value) > new Date().getFullYear()) {
    inputYear.style.borderColor = "red";
    inputLabelYear.style.color = "var(--error-color)";
    inputErrorYear.style.visibility = "visible";
  } else {
    inputYear.style.borderColor = "";
    inputLabelYear.style.color = "";
    inputErrorYear.style.visibility = "hidden";
  }
}
// pang limit ng input
function numbersOnly(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

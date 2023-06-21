//Form selectors
const form = document.querySelector(".form");
const formInput = form.querySelectorAll(".form__input")
const formContainer = document.querySelector(".form-container");
const completeStateContainer = document.querySelector(".complete-state-container")
const alert = form.querySelectorAll(".alert");
let validator = true; // if nothing is wrong validate the form inside a function
// Cardholder name selectors
const cardNameDisplay = document.querySelector(".card__details-name");
const cardNameInput = document.querySelector("#cardHolder");
const cardNameAlert = document.querySelector(".form__input-cardholder--alert");
// Card numbers selectors 
const cardNumberDisplay = document.querySelector(".card__number");
const cardNumberInput = document.querySelector("#cardNumber");
const cardNumberAlert = document.querySelector (".form__input-cardNumber--alert");            
// Month selectors
const cardMonthDisplay = document.querySelector(".card__month");
const cardMonthInput = document.querySelector("#cardMonth");
const cardMonthAlert = document.querySelector(".form__input__MM--alert")
// Year selectors
const cardYearDisplay = document.querySelector(".card__year");
const cardYearInput = document.querySelector("#cardYear");
const cardYearAlert = document.querySelector(".form__input__YY--alert")
// Reverse CVC selectors
const CardReverseDisplay = document.querySelector(".card-reverse__cvc");
const cardReverseInput = document.querySelector("#cvc");
const cardReverseAlert = document.querySelector(".form__input-cvc--alert")

//Sync inputs and card display
function inputDisplaySync(input, display) {
    input.addEventListener("input", () => {
      display.innerText = input.value;
    });
  }

//Calling displaySync function
inputDisplaySync(cardNameInput, cardNameDisplay);
inputDisplaySync(cardNumberInput, cardNumberDisplay);
inputDisplaySync(cardMonthInput, cardMonthDisplay);
inputDisplaySync(cardYearInput, cardYearDisplay);
inputDisplaySync(cardReverseInput, CardReverseDisplay);

// Validate number inputs format (card number, cvc, date)
  function numbersFormatAlert(input, alert) {
    input.addEventListener("input", e => {
      let regex = /^(?:\d(?:\s?\d)*)?$/;
      let inputValue = e.target.value;
      input.value = inputValue.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();    
      if (!regex.test(input.value)) {
        alert.innerText = "Wrong format, numbers only";
        input.classList.add("input-alert");
        validator = false;
      }
      else {
        alert.innerText = "";
        input.classList.remove("input-alert");
        
      }
    });
  }

// Calling number format validator
numbersFormatAlert(cardNumberInput, cardNumberAlert);
numbersFormatAlert(cardMonthInput, cardMonthAlert);
numbersFormatAlert(cardYearInput, cardYearAlert);
numbersFormatAlert(cardReverseInput, cardReverseAlert);

// Validate form before submit, alert messages if something is not correctly filled 
form.addEventListener("submit", e => {
  e.preventDefault();
  formInput.forEach((input, index) => {
    if (input.value.trim() === "") {
      input.classList.add("input-alert");
      alert[index].innerText = "Can't be blank"
      validator = false;
    } else {
      if (cardNumberInput.value.length !== 19 ){
        cardNumberInput.classList.add("input-alert");
        cardNumberAlert.innerText = "Wrong card number format";
        validator = false;
      }
      if (cardMonthInput.value.length !== 2 ||  !(parseInt(cardMonthInput.value) > 0 && parseInt(cardMonthInput.value) <= 12)) {
        cardMonthInput.classList.add("input-alert");
        cardMonthAlert.innerText = "Wrong month format";
        validator = false;
      }
      if (cardYearInput.value.length !== 2) {
        cardYearInput.classList.add("input-alert");
        cardYearAlert.innerText = "Wrong year format";
        validator = false;
      }
      if (cardReverseInput.value.length != 3) {
        cardReverseInput.classList.add("input-alert");
        cardReverseAlert.innerText = "Wrong CVC format";
        validator = false;
      }
    }
  });
  if (validator) {
    console.log("Hello World")
    formContainer.classList.add("hidden");
    completeStateContainer.classList.remove("hidden");
  } else {
    validator = true;
  }
});

// Remove alert message in the placeholder name
cardNameInput.addEventListener("input", ()=> {cardNameAlert.innerText = ""; cardNameInput.classList.remove("input-alert")});
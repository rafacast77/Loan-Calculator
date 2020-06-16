/** @format */

//Declaring, identifying and initializing UI-Variables
const amount_EL = document.querySelector('#amount');
const interest_EL = document.querySelector('#interest');
const yearsToPay_EL = document.querySelector('#years');
const calculateBtn_EL = document.querySelector('#calculate');
const monthlyPayment_EL = document.querySelector('#monthly-payment');
const totalPayment_EL = document.querySelector('#total-payment');
const totalInterest_EL = document.querySelector('#total-interest');
const card_EL = document.querySelector('.card');
const cardTittle_EL = document.querySelector('.card-title');
const loading_EL = document.querySelector('#loading');
const results_EL = document.querySelector('#results');

//Event Listener
document.querySelector('.loan-form').addEventListener('submit', function (e) {
  loading_EL.style.display = 'block';
  results_EL.style.display = 'none';
  calculateBtn_EL.disabled = 'true';
  // Dismisses the loader and brings the results
  setTimeout(function () {
    calculateLoan();
    calculateBtn_EL.removeAttribute('disabled');
  }, 2000);

  e.preventDefault();
});

function calculateLoan(e) {
  console.log('calculating...');
  const principal = parseFloat(amount_EL.value);
  const calculatedInterest = parseFloat(interest_EL.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsToPay_EL.value) * 12;

  //Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment_EL.value = monthly.toFixed(2);
    totalPayment_EL.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest_EL.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
    loading_EL.style.display = 'none';
    results_EL.style.display = 'block';
  } else {
    loading_EL.style.display = 'none';
    alertMessage();
  }
}

function alertMessage() {
  const alert_EL = document.createElement('div');
  alert_EL.className = 'alert alert-warning';
  alert_EL.appendChild(
    document.createTextNode("Information wasn't entered correctly")
  );
  card_EL.insertBefore(alert_EL, cardTittle_EL);

  //Dismisses the alert after 3 seconds and disable the button for 3 seconds
  setTimeout(function () {
    $(alert_EL).alert('close');
    calculateBtn_EL.removeAttribute('disabled');
  }, 2000);
}

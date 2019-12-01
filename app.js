// Listen for Submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // hide results
  document.getElementById("results").style.display = "none";

  // show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  console.log("calc...");
  // UI Vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute Monthly Payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // show results and hide spinner
    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please Check Your Numbers");
  }
}

// Error function
function showError(error) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";
  const errorDiv = document.createElement("div");

  // get els
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add Class
  errorDiv.className = "alert alert-danger";

  // Creat text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 2 seconds
  setTimeout(clearError, 2000);
}

// clear err
function clearError() {
  document.querySelector(".alert").remove();
}

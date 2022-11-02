// Document is ready
$(document).ready(function () {
  Pull_Total_Amount_From_Storage();
  //display number of days left
  daysLeft();
  //extract left progess
  pull_Progress_From_Storage();
  //extract donors from local Storage
  Pull_Donors_From_Storage();
  //extract data from local Storage if saved
  Pull_Saved_Amount_From_Storage();
  // Validate amount
  $("#usercheck").hide();
  let amountError = false;
  $("#amount").keyup(function () {
    Pull_Total_Amount_From_Storage();

    validateAmount();
    showRunTimeProgess();

    // calculateLeftBudget();
  });

  function pull_Progress_From_Storage() {
    const budget = 300;
    const totalAmount = parseInt(localStorage.getItem("totalAmount"));
    let percentage = 0;

    if (totalAmount > 300) percentage = 300;
    else if (totalAmount < 0) percentage = 0;
    else percentage = (totalAmount / budget) * 100 + "%";
    $(".progress-bar").css("width", percentage);
  }

  function daysLeft() {
    const endDate = new Date("2022-11-30");
    const todayDate = new Date();
    const miliseconds = endDate.getTime() - todayDate.getTime();
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));
    $("#daysCount").html(days);
  }

  function showRunTimeProgess() {
    const budget = 300;
    const totalAmount = parseInt(localStorage.getItem("totalAmount"));
    let amountValue = parseInt($("#amount").val());
    if (totalAmount === 300) amountValue = 0;

    let calculateProgress;

    if (totalAmount && amountValue)
      calculateProgress = totalAmount + amountValue;
    else if (totalAmount) calculateProgress = totalAmount;
    else calculateProgress = amountValue;

    let percentage = 0;
    if (calculateProgress > 300) percentage = 300;
    else if (calculateProgress < 0) percentage = 0;
    else percentage = (calculateProgress / budget) * 100 + "%";
    $(".progress-bar").css("width", percentage);
  }

  function Pull_Total_Amount_From_Storage() {
    const budget = 300;
    const totalAmount = parseInt(localStorage.getItem("totalAmount"));
    let amountValue = $("#amount").val() ? parseInt($("#amount").val()) : 0;

    if (amountValue > budget - totalAmount) {
      amountValue = 0;
    }

    let total;
    if (totalAmount) total = totalAmount + amountValue;
    else total = amountValue;
    if (total <= 300 && total >= 0) {
      const leftBudget = budget - total;
      $("#leftAmount").html(leftBudget);
    }
  }

  function Pull_Donors_From_Storage() {
    const stored_donors = localStorage.getItem("donorNumber");
    if (stored_donors) $("#donors").html(stored_donors);
    else $("#donors").html(0);
  }

  function Pull_Saved_Amount_From_Storage() {
    const stored_text_data = localStorage.getItem("amount");
    document.getElementById("amount").value = stored_text_data;
  }

  function validateAmount() {
    let amountValue = $("#amount").val();
    amountError = false;
    if (amountValue.length == "") {
      $("#usercheck").show();
      amountError = true;
      return false;
    } else if (!$.isNumeric(amountValue)) {
      $("#usercheck").show();
      $("#usercheck").html("**Input must be integer value");
      amountError = true;
      return false;
    } else if (amountValue < 0) {
      $("#usercheck").show();
      $("#usercheck").html("**Negative values are not allowed");
      amountError = true;
      return false;
    } else if (amountValue > 300) {
      $("#usercheck").show();
      $("#usercheck").html("**Value cannot be greater than 300");
      amountError = true;
      return false;
    } else {
      $("#usercheck").hide();
    }
  }

  // Add Amount
  function addAmount() {
    const totalAmount = parseInt(localStorage.getItem("totalAmount"));
    let amountValue = parseInt($("#amount").val());

    let amountToBeAdd = 0;
    if (totalAmount) amountToBeAdd = amountValue + totalAmount;
    else amountToBeAdd = amountValue;

    localStorage.setItem("totalAmount", amountToBeAdd);
  }
  // Add Donor
  function addDonor() {
    const noOfDonors = parseInt(localStorage.getItem("donorNumber"));
    let totalDonors;
    if (noOfDonors) totalDonors = noOfDonors + 1;
    else totalDonors = 1;
    localStorage.setItem("donorNumber", totalDonors);
  }

  // Submit button
  $("#submitbtn").click(function () {
    validateAmount();
    console.log("amountError", amountError);
    if (amountError == true) {
      return false;
    } else {
      let amountValue = parseInt($("#amount").val());

      addDonor();
      addAmount();
      Pull_Donors_From_Storage();
      $("form").trigger("reset");
      showRunTimeProgess();
      alert(`Press Ok to Donate $${amountValue}`);
      Pull_Total_Amount_From_Storage();

      return true;
    }
  });
});

$("#save").click(function () {
  let amountValue = $("#amount").val();
  localStorage.setItem("amount", amountValue);
  alert("Saved");
});

import { calculateShippingCost } from "./iShop";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("shipping-form");
  const resultDiv = document.getElementById("result");
  const costParagraph = document.getElementById("cost");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const weight = parseFloat(document.getElementById("weight").value);
    const source = document.getElementById("source").value;

    if (isNaN(weight) || weight <= 0) {
      alert("Please enter a valid weight greater than 0kg.");
      return;
    }

    if (source !== "USA" && source !== "UK") {
      alert("Please select a valid source (USA or UK).");
      return;
    }

    const cost = calculateShippingCost(weight, source);
    costParagraph.textContent = `£${cost.toFixed(2)}`;
    resultDiv.style.display = "block";
  });
});

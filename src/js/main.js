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
    const costAnchor = document.createElement("a");
    costAnchor.textContent = `£${cost.toFixed(2)}`;
    costAnchor.href = `https://www.xe.com/currencyconverter/convert/?Amount=${cost.toFixed(
      2
    )}&From=GBP&To=ZMW`;
    costAnchor.target = "_blank";
    costAnchor.rel = "noopener noreferrer";
    costAnchor.title = "Click to convert to Kwacha";
    costAnchor.classList.add("dark-mode");
    costParagraph.innerHTML = "";
    costParagraph.appendChild(costAnchor);
    resultDiv.style.display = "block";
  });
});

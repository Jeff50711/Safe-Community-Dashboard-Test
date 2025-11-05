const sliders = document.querySelectorAll("input[type='range']");
const labels = {
  staffing: document.getElementById("staffingVal"),
  cso: document.getElementById("csoVal"),
  lighting: document.getElementById("lightingVal"),
  liquor: document.getElementById("liquorVal"),
  food: document.getElementById("foodVal"),
  youth: document.getElementById("youthVal"),
  mental: document.getElementById("mentalVal"),
  tech: document.getElementById("techVal"),
};

// Update slider labels
sliders.forEach(slider => {
  slider.addEventListener("input", () => {
    labels[slider.id].innerText = slider.value + "%";
    updateChart();
  });
});

// Baseline crime values
const baseline = {
  violent: 100,
  property: 100,
  disorder: 100,
};

const ctx = document.getElementById("impactChart").getContext("2d");
let chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Violent Crime", "Property Crime", "Disorder"],
    datasets: [{
      label: "Projected Index (100 = Baseline)",
      data: [100, 100, 100],
      backgroundColor: ["#003366", "#d4af37", "#779ecb"]
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true, max: 120 }
    }
  }
});

function updateChart() {
  const values = getImpactScores();
  chart.data.datasets[0].data = [values.violent, values.property, values.disorder];
  chart.update();
}

// Simple model: weighting effects on crime
function getImpactScores() {
  const v = {
    staffing: +document.getElementById("staffing").value,
    cso: +document.getElementById("cso").value,
    lighting: +document.getElementById("lighting").value,
    liquor: +document.getElementById("liquor").value,
    food: +document.getElementById("food").value,
    youth: +document.getElementById("youth").value,
    mental: +document.getElementById("mental").value,
    tech: +document.getElementById("tech").value,
  };

  // Weighted impact calculation
  const violent =
    100 -
    (v.staffing * 0.2 +
      v.cso * 0.15 +
      v.mental * 0.15 +
      v.tech * 0.1 +
      v.youth * 0.05 -
      v.liquor * 0.1);
  const property =
    100 -
    (v.staffing * 0.1 +
      v.cso * 0.1 +
      v.lighting * 0.2 +
      v.food * 0.1 +
      v.tech * 0.1 -
      v.liquor * 0.1);
  const disorder =
    100 -
    (v.cso * 0.2 +
      v.youth * 0.15 +
      v.lighting * 0.1 +
      v.food * 0.1 -
      v.liquor * 0.15);

  return {
    violent: Math.max(60, violent),
    property: Math.max(60, property),
    disorder: Math.max(60, disorder),
  };
}

// Generate PDF Proposal
document.getElementById("implementBtn").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.text("Rochester Safe Communities Proposal", 10, 10);
  doc.setFont("helvetica", "normal");
  doc.text("This proposal outlines targeted interventions based on simulation inputs.", 10, 20);
  doc.text("Intervention Levels:", 10, 30);

  let y = 40;
  sliders.forEach(s => {
    doc.text(`${s.id.toUpperCase()}: ${s.value}%`, 10, y);
    y += 8;
  });

  const results = getImpactScores();
  y += 10;
  doc.text("Projected Outcomes:", 10, y);
  y += 10;
  doc.text(`Violent Crime Index: ${results.violent.toFixed(1)}`, 10, y);
  doc.text(`Property Crime Index: ${results.property.toFixed(1)}`, 10, y + 10);
  doc.text(`Disorder Index: ${results.disorder.toFixed(1)}`, 10, y + 20);

  y += 40;
  doc.text("Each slider adjustment reflects actionable strategies identified in research such as:", 10, y);
  y += 10;
  doc.text("• Braga et al. (2019) – Hot spots policing and focused deterrence", 10, y);
  y += 8;
  doc.text("• Lum & Nagin (2021) – Evidence-based policing and community collaboration", 10, y);
  y += 8;
  doc.text("• Welsh & Farrington (2008) – Street lighting and environmental design", 10, y);
  y += 8;
  doc.text("• Sampson et al. (2012) – Collective efficacy and community structure", 10, y);

  y += 15;
  doc.text("This simulation supports data-informed decision-making to improve safety and trust.", 10, y);

  doc.save("Rochester_Safe_Communities_Proposal.pdf");
});


    let selectedPlan = null;
    let progressData = [];

    function toggleTheme() {
      document.body.classList.toggle("dark");
    }

    function genererPlans() {
      const montant = parseInt(document.getElementById("montant").value);
      const jours = parseInt(document.getElementById("jours").value);
      const titre = document.getElementById("objectifTitre").value || "Mon objectif";
      const desc = document.getElementById("objectifDesc").value;

      if (!montant || !jours) return alert("Remplis tous les champs !");

      const container = document.getElementById("plansContainer");
      container.innerHTML = "";

      const plans = [
        { label: `${jours} jours`, montantJour: (montant / jours).toFixed(2) },
        { label: `${Math.ceil(jours / 2)} jours`, montantJour: (montant / Math.ceil(jours / 2)).toFixed(2) },
        { label: `${Math.ceil(jours / 4)} jours`, montantJour: (montant / Math.ceil(jours / 4)).toFixed(2) },
        { label: `1 semaine`, montantJour: (montant / 7).toFixed(2) },
      ];

      plans.forEach((plan, index) => {
        const card = document.createElement("div");
        card.className = "plan-card";
        card.innerHTML = `
          <h3>${titre}</h3>
          <p>${desc}</p>
          <strong>Plan ${index + 1} :</strong>
          <p>${plan.label} — 💰 ${plan.montantJour} Fr / jour</p>
          <button onclick="choisirPlan(${index}, ${plan.montantJour}, ${jours})">Choisir ce plan</button>
        `;
        container.appendChild(card);
      });
    }

    function choisirPlan(index, montantJour, jours) {
      selectedPlan = { montantJour, jours };
      document.querySelectorAll(".plan-card").forEach(c => c.classList.remove("selected"));
      document.querySelectorAll(".plan-card")[index].classList.add("selected");
      lancerSuivi(jours);
    }

    function lancerSuivi(jours) {
      const container = document.getElementById("daysList");
      container.innerHTML = "";
      progressData = [];

      const startDate = new Date();
      for (let i = 0; i < jours; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];

        const checked = JSON.parse(localStorage.getItem("progress-" + dateStr)) || false;
        progressData.push(checked);

        const div = document.createElement("div");
        div.className = "day-check";
        div.innerHTML = `
          <input type="checkbox" id="day-${i}" ${checked ? "checked" : ""} onchange="updateProgress(${i}, '${dateStr}')"/>
          <label for="day-${i}">${dateStr}</label>
        `;
        container.appendChild(div);
      }

      updateProgressBar();
      document.getElementById("progressSection").style.display = "block";
    }

    function updateProgress(index, dateStr) {
      const checkbox = document.getElementById("day-" + index);
      progressData[index] = checkbox.checked;
      localStorage.setItem("progress-" + dateStr, checkbox.checked);
      updateProgressBar();
    }

    function updateProgressBar() {
      const total = progressData.length;
      const done = progressData.filter(Boolean).length;
      const percent = Math.round((done / total) * 100);
      document.getElementById("progressFill").style.width = percent + "%";
    }
 
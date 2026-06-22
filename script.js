const form = document.querySelector("#demo-feedback-form");
const note = document.querySelector("#form-note");
const issueUrl = "https://github.com/lpociask/RoadToUCI-site/issues/new";

function fieldValue(data, name) {
  return String(data.get(name) || "").trim();
}

function checkedValues(formElement, name) {
  return Array.from(formElement.querySelectorAll(`input[name="${name}"]:checked`))
    .map((input) => input.value)
    .join(", ");
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const liked = fieldValue(data, "liked");
  const unclear = fieldValue(data, "unclear");
  const wish = fieldValue(data, "wish");
  const rating = fieldValue(data, "rating");
  const contact = fieldValue(data, "contact") || "brak";
  const next = checkedValues(form, "next") || "brak wskazania";

  if (!liked || !unclear || !wish || !rating) {
    note.textContent = "Uzupełnij wymagane pola, żeby przygotować opinię.";
    return;
  }

  const body = [
    "## Co najbardziej mi się podobało",
    liked,
    "",
    "## Co było niejasne albo słabsze",
    unclear,
    "",
    "## Co chcę zobaczyć dalej",
    next,
    "",
    "## Najważniejsza sugestia",
    wish,
    "",
    "## Ocena dema",
    rating,
    "",
    "## Kontakt opcjonalny",
    contact
  ].join("\n");

  const params = new URLSearchParams({
    title: "Feedback z dema RoadToUCI",
    body,
    labels: "demo-feedback"
  });

  const target = `${issueUrl}?${params.toString()}`;
  const opened = window.open(target, "_blank", "noopener,noreferrer");

  if (opened) {
    note.textContent = "Gotowe. Otworzyłem zgłoszenie z przygotowaną treścią.";
  } else {
    note.innerHTML = `<a href="${target}" target="_blank" rel="noreferrer">Otwórz przygotowaną opinię na GitHubie</a>`;
  }
});

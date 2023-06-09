export default function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };

  const dateFormatted = `${date.toLocaleDateString("ru-RU", options).replace("г.", "")} `;
  return dateFormatted;
}

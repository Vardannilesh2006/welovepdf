document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const toolButtons = document.querySelectorAll(".tool-btn");

  searchInput.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    toolButtons.forEach((btn) => {
      const name = btn.getAttribute("data-name") || "";
      if (!q || name.includes(q)) {
        btn.style.display = "flex";
      } else {
        btn.style.display = "none";
      }
    });
  });
});

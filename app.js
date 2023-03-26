
document.addEventListener("DOMContentLoaded", () => {
  const pageInput = document.getElementById("page");
  const limitInput = document.getElementById("limit");
  const requestButton = document.getElementById("request");
  const errorElement = document.getElementById("error");
  const imagesContainer = document.getElementById("images");

  function displayImages(images) {
    imagesContainer.innerHTML = "";
    images.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.download_url;
      img.alt = image.author;
      imagesContainer.appendChild(img);
    });
  }

  function showError(message) {
    errorElement.textContent = message;
  }

  function fetchImages(page, limit) {
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("lastImages", JSON.stringify(data));
        displayImages(data);
      })
      .catch((error) => {
        showError("Ошибка загрузки данных");
      });
  }

  requestButton.addEventListener("click", () => {
    const page = parseInt(pageInput.value);
    const limit = parseInt(limitInput.value);
    let errorMessage = "";

    if (isNaN(page) || page < 1 || page > 10) {
      errorMessage = "Номер страницы вне диапазона от 1 до 10";
    }

    if (isNaN(limit) || limit < 1 || limit > 10) {
      if (errorMessage) {
        errorMessage = "Номер страницы и лимит вне диапазона от 1 до 10";
      } else {
        errorMessage = "Лимит вне диапазона от 1 до 10";
      }
    }

    if (errorMessage) {
      showError(errorMessage);
    } else {
      errorElement.textContent = "";
      fetchImages(page, limit);
    }
  });

  const lastImages = localStorage.getItem("lastImages");

  if (lastImages) {
    displayImages(JSON.parse(lastImages));
  }
});

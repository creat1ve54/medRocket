export default {
  bind(el, binding) {
    const popup = document.createElement("div");
    popup.className = "popup";

    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup__overlay";

    const popupContainer = document.createElement("div");
    popupContainer.className = "popup__container";

    const popupClose = document.createElement("button");
    popupClose.className = "popup__close";
    popupClose.innerHTML = `
    <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1.00049 1L25 24.9995" stroke="white" stroke-width="2" />
        <path d="M24.9995 1L1 24.9995" stroke="white" stroke-width="2" />
      </svg>
      `;

    popup.appendChild(popupContainer);
    popup.appendChild(popupOverlay);
    popup.appendChild(popupClose);

    const img = document.createElement("img");
    img.setAttribute("src", binding.value.imgSrc);
    img.setAttribute("alt", binding.value.imgTitle);

    // Флаг для отслеживания состояния видимости
    let isVisible = false;
    let isOpen = false;

    const onClosePopup = () => {
      if (isVisible) {
        isOpen = false;
        popup.style.visibility = "hidden";
        document.body.removeChild(popup);
        isVisible = false;
      }
    };

    const onOpenPopup = () => {
      isOpen = true;
      if (isOpen) {
        popupContainer.appendChild(img);
        popup.style.visibility = "visible";
        isVisible = true;
        // Добавляем тултип в body
        document.body.appendChild(popup);
      }
    };

    popupOverlay.addEventListener("click", onClosePopup);
    popupClose.addEventListener("click", onClosePopup);

    //открытие попапа
    el.addEventListener("click", onOpenPopup);

    // Сохраняем ссылку на тултип для последующего удаления
    el.popup = popup;
  },
  unbind(el) {
    //удаление события
    el.addEventListener("click", el.onOpenPopup);
  },
};

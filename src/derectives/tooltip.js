export default {
  bind(el, binding) {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";

    // Флаг для отслеживания состояния видимости
    let isVisible = false;

    const showTooltip = () => {
      tooltip.innerText = binding.value;
      tooltip.style.visibility = "visible";
      isVisible = true;
      // Добавляем тултип в body
      document.body.appendChild(tooltip);
    };

    const hideTooltip = () => {
      if (isVisible) {
        tooltip.style.visibility = "hidden";
        // Удаляем тултип из body
        document.body.removeChild(tooltip);
        isVisible = false;
      }
    };

    const updateTooltipPosition = (event) => {
      if (!isVisible) return;     

      const { pageX: x, pageY: y } = event;
      //позиция относительно курсора
      tooltip.style.top = `${y + 30}px`; // Ниже курсора
      tooltip.style.left = `${x - 50}px`; // Слева от курсора

      // Проверяем границы окна, чтобы не выходила за рамки видимой части сайта
      const tooltipRect = tooltip.getBoundingClientRect();
      const offset = 20; // Отступ от границы окна

      if (tooltipRect.right > window.innerWidth - offset) {
        tooltip.style.left = ` ${
          window.innerWidth - tooltipRect.width - offset
        }px`;
      }

      if (tooltipRect.bottom > window.innerHeight) {
        tooltip.style.top = `${y - tooltipRect.height - offset}px`; // Поднимаем тултип
      }

      if (tooltipRect.left < 0) {
        tooltip.style.left = `${offset}px`; // Сдвигаем тултип вправо
      }
    };

    el.addEventListener("mouseenter", showTooltip);
    el.addEventListener("mouseleave", hideTooltip);
    // Добавляем слежение за мышью
    el.addEventListener("mousemove", updateTooltipPosition);

    // Сохраняем ссылку на тултип для последующего удаления
    el.tooltip = tooltip;
  },
  unbind(el) {
    el.removeEventListener("mouseenter", el.showTooltip);
    el.removeEventListener("mouseleave", el.hideTooltip);
    // Удаляем обработчик
    el.removeEventListener("mousemove", el.updateTooltipPosition);
  },
};

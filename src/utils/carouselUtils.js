export function createCarousel(options) {
    const { rimgArr, itemsPerPage, slideWidth, onMove } = options;
    let currentPage = 0;
    let intervalId = null;
  
    function setA() {
      const allA = document.querySelectorAll('#MV_liitch a');
      allA.forEach((a, i) => {
        a.classList.remove("active");
      });
      if (currentPage >= 0 && currentPage < allA.length) {
        allA[currentPage].classList.add("active");
      }
    }
  
    function moveToPage(newPage) {
      currentPage = newPage;
      setA();
      if (rimgArr.value) {
        rimgArr.value.style.transform = `translateX(${(-slideWidth * currentPage)}px)`;
      }
      onMove?.(currentPage);
    }
  
    function startAutoChange(totalPages) {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        currentPage = (currentPage + 1) % totalPages;
        moveToPage(currentPage);
      }, 30000);
    }
  
    function stopAutoChange() {
      clearInterval(intervalId);
    }
  
    function arrowAction(direction, totalPages) {
      stopAutoChange();
      if (direction === 'left') {
        moveToPage((currentPage - 1 + totalPages) % totalPages);
      } else if (direction === 'right') {
        moveToPage((currentPage + 1) % totalPages);
      }
      startAutoChange(totalPages);
    }
  
    return {
      moveToPage,
      startAutoChange,
      stopAutoChange,
      arrowAction,
    };
  }
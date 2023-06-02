document.addEventListener('DOMContentLoaded', function() {
  var startButton = document.getElementById('start-button');
  var stopButton = document.getElementById('stop-button');
  var countdownTimer = document.getElementById('countdown-timer');
  var datetimeInput = document.getElementById('datetime-input');
  const imageContainer = document.getElementById('image-container');
  var timerInterval;

  startButton.addEventListener('click', function() {
    var selectedDate = new Date(datetimeInput.value).getTime();
    var now = new Date().getTime();
    var remainingTime = selectedDate - now;

    if (remainingTime <= 0) {
      alert('Выбранное время должно быть в будущем');
      return;
    }

    startButton.disabled = true;
    datetimeInput.disabled = true;
    imageContainer.innerHTML = '';
    timerInterval = setInterval(updateTimer, 1000);
    
    updateTimer();

    function updateTimer() {
      now = new Date().getTime();
      remainingTime = selectedDate - now;

      if (remainingTime >= 0) {
        var seconds = Math.floor((remainingTime / 1000) % 60);
        var minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        var hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        var formattedTime = formatTimeComponent(days) + ':' + formatTimeComponent(hours) + ':' + formatTimeComponent(minutes) + ':' + formatTimeComponent(seconds);

        countdownTimer.textContent = formattedTime;
      } else {
        clearInterval(timerInterval);
        countdownTimer.textContent = 'Время истекло';
        const imageElement = document.createElement('img');
        imageElement.src = 'bb.jpg';
        imageContainer.appendChild(imageElement); // Добавляем картинку в контейнер
        startButton.disabled = false;
        datetimeInput.disabled = false;
      }
    }
  });

  stopButton.addEventListener('click', function() {
    clearInterval(timerInterval);
    countdownTimer.textContent = '00:00:00';
    startButton.disabled = false;
    datetimeInput.disabled = false;
    imageContainer.innerHTML = ''; // Удаляем картинку из контейнера
  });

  function formatTimeComponent(time) {
    return time.toString().padStart(2, '0');
  }
  
  // Получаем ссылку на элемент body
  const body = document.querySelector('body');

  // Функция для изменения цвета фона страницы
  function changeBackgroundColor(color) {
    body.style.backgroundColor = color;
  }

  // изменяем цвет фона страницы при клике на кнопку
  const button = document.querySelector('#change-color-button');
  button.addEventListener('click', function() {
    const colorInput = document.querySelector('#color-input');
    const color = colorInput.value;
    changeBackgroundColor(color);
  });
});
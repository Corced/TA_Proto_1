document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const daysGrid = document.querySelector('.days-grid');
  const monthName = document.querySelector('.month-name');
  const prevMonthBtn = document.querySelector('.prev-month');
  const nextMonthBtn = document.querySelector('.next-month');
  const todayBtn = document.querySelector('.today-btn');
  const tomorrowBtn = document.querySelector('.tomorrow-btn');
  const appointmentForm = document.getElementById('appointment-form');
  const selectedDateInput = document.getElementById('selected-date');

  // Current date state
  let currentDate = new Date();
  let selectedDate = null;

  // Initialize the calendar
  function initCalendar() {
    renderCalendar();
    selectToday();
  }

  // Render the calendar for the current month
  function renderCalendar() {
    // Clear previous days
    daysGrid.innerHTML = '';

    // Set month name
    const monthNames = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", 
                       "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
    monthName.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Get first day of month and total days in month
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
    // Get days from previous month to show
    const startDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Create date elements
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Previous month days
    for (let i = 0; i < startDay; i++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'day other-month';
      daysGrid.appendChild(dayElement);
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dayElement = document.createElement('div');
      dayElement.className = 'day';
      dayElement.textContent = i;

      // Check if this date is today
      if (date.toDateString() === today.toDateString()) {
        dayElement.classList.add('today');
      }

      // Check if this date is selected
      if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
        dayElement.classList.add('selected');
      }

      dayElement.addEventListener('click', () => selectDate(date));
      daysGrid.appendChild(dayElement);
    }
  }

  // Select a date
  function selectDate(date) {
    selectedDate = date;
    renderCalendar();
    
    // Format the date for storage
    const formattedDate = formatDateForStorage(date);
    selectedDateInput.value = formattedDate;
  }

  // Select today's date
  function selectToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectDate(today);
  }

  // Select tomorrow's date
  function selectTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    selectDate(tomorrow);
  }

  // Format date for storage (YYYY-MM-DD)
  function formatDateForStorage(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Format date for display (e.g., "Senin, 12 Maret 2023")
  function formatDateForDisplay(date) {
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                       "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
  }

  // Event Listeners
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  todayBtn.addEventListener('click', selectToday);
  tomorrowBtn.addEventListener('click', selectTomorrow);

  // Form submission
  appointmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!selectedDate) {
      alert('Silakan pilih tanggal janji temu');
      return;
    }

    const formData = {
      name: document.getElementById('guest-name').value,
      phone: document.getElementById('guest-phone').value,
      description: document.getElementById('description').value,
      date: formatDateForDisplay(selectedDate)
    };

    console.log('Form submitted:', formData);
    alert(`Janji temu berhasil dibuat!\n\n` +
          `Nama: ${formData.name}\n` +
          `No HP: ${formData.phone}\n` +
          `Keterangan: ${formData.description}\n` +
          `Tanggal: ${formData.date}`);

    // Reset form
    appointmentForm.reset();
    selectToday();
  });

  // Initialize the calendar
  initCalendar();
});
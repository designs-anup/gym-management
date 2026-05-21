// ==========================
// SIDEBAR TOGGLE (MOBILE)
// ==========================
const sidebar =
  document.querySelector(".sidebar");

function toggleSidebar() {
  sidebar.classList.toggle("active");
}

// Close sidebar on outside click
document.addEventListener(
  "click",
  function (e) {

    const menuBtn =
      document.querySelector(
        ".menu-toggle"
      );

    if (
      window.innerWidth < 991 &&
      !sidebar.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      sidebar.classList.remove(
        "active"
      );
    }
  }
);

// ==========================
// MODAL FUNCTIONS
// ==========================
function openModal(modalId) {
  const modal = document.getElementById(modalId);

  if (modal) {
    modal.style.display = "flex";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);

  if (modal) {
    modal.style.display = "none";
  }
}

// Close modal when clicking outside
window.addEventListener("click", function (e) {
  const modals = document.querySelectorAll(".modal");

  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});


// ==========================
// PROFILE DROPDOWN
// ==========================
function toggleProfileMenu() {
    const menu =
      document.getElementById(
        "profileMenu"
      );
  
    menu.classList.toggle("show");
  }
  
  // Close dropdown on outside click
  document.addEventListener(
    "click",
    function (e) {
  
      const profileDropdown =
        document.querySelector(
          ".profile-dropdown"
        );
  
      if (
        profileDropdown &&
        !profileDropdown.contains(
          e.target
        )
      ) {
        document
          .getElementById(
            "profileMenu"
          )
          ?.classList.remove(
            "show"
          );
      }
    }
  );


// ==========================
// SEARCH TABLE FUNCTION
// ==========================
function searchTable(inputId, tableId) {
  const input = document
    .getElementById(inputId)
    .value
    .toLowerCase();

  const rows = document.querySelectorAll(
    `#${tableId} tbody tr`
  );

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();

    row.style.display = text.includes(input)
      ? ""
      : "none";
  });
}

// ==========================
// TOGGLE PASSWORD
// ==========================
function togglePassword() {
  const password =
    document.getElementById("password");

  if (!password) return;

  password.type =
    password.type === "password"
      ? "text"
      : "password";
}

// ==========================
// FORM SUBMISSION ALERT
// ==========================
const forms = document.querySelectorAll("form");

forms.forEach(form => {
  form.addEventListener("submit", function (e) {

    // Prevent reload for demo
    if (!form.action.includes("index.html")) {
      e.preventDefault();

      alert("Data saved successfully!");

      // Close modal automatically
      const modal = form.closest(".modal");

      if (modal) {
        modal.style.display = "none";
      }

      form.reset();
    }
  });
});

// ==========================
// DELETE BUTTON FUNCTION
// ==========================
const deleteButtons =
  document.querySelectorAll(".delete-btn");

deleteButtons.forEach(button => {
  button.addEventListener("click", function () {

    const confirmDelete = confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      const row =
        this.closest("tr");

      row.remove();

      alert("Deleted successfully!");
    }
  });
});

// ==========================
// EDIT BUTTON FUNCTION
// ==========================
const editButtons =
  document.querySelectorAll(".edit-btn");

editButtons.forEach(button => {
  button.addEventListener("click", function () {
    alert(
      "Edit feature will be connected later."
    );
  });
});

// ==========================
// ACTIVE NAVIGATION LINK
// ==========================
const currentPage =
  window.location.pathname.split("/").pop();

const navLinks =
  document.querySelectorAll(
    ".nav-links li a"
  );

navLinks.forEach(link => {
  const href = link.getAttribute("href");

  if (href === currentPage) {
    link.parentElement.classList.add(
      "active"
    );
  }
});

// ==========================
// SIMPLE DASHBOARD COUNTER
// ==========================
const counters =
  document.querySelectorAll(".card-info h3");

counters.forEach(counter => {

  const target =
    counter.innerText.replace(/[^\d]/g, "");

  if (!target) return;

  let count = 0;
  const speed = target / 50;

  const updateCounter = () => {

    if (count < target) {
      count += speed;

      counter.innerText =
        Math.floor(count);

      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});



// ==========================
// THEME SWITCHER
// ==========================
function changeTheme(mode) {

    const body =
      document.body;
  
    const cards =
      document.querySelectorAll(
        ".theme-card"
      );
  
    cards.forEach(card =>
      card.classList.remove(
        "active-theme"
      )
    );
  
    event.currentTarget.classList.add(
      "active-theme"
    );
  
    if (mode === "dark") {
  
      body.classList.add(
        "dark-theme"
      );
  
      localStorage.setItem(
        "theme",
        "dark"
      );
  
    } else if (mode === "light") {
  
      body.classList.remove(
        "dark-theme"
      );
  
      localStorage.setItem(
        "theme",
        "light"
      );
  
    } else {
  
      const systemDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
  
      body.classList.toggle(
        "dark-theme",
        systemDark
      );
  
      localStorage.setItem(
        "theme",
        "auto"
      );
    }
  }
  
  // Load Saved Theme
  window.addEventListener(
    "DOMContentLoaded",
    () => {
  
      const savedTheme =
        localStorage.getItem(
          "theme"
        );
  
      if (
        savedTheme === "dark"
      ) {
        document.body.classList.add(
          "dark-theme"
        );
      }
  
      if (
        savedTheme === "auto"
      ) {
  
        const systemDark =
          window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
  
        document.body.classList.toggle(
          "dark-theme",
          systemDark
        );
      }
    }
  );

  

// ==========================
// RESPONSIVE TABLE SCROLL
// ==========================
window.addEventListener("resize", () => {

  const tables =
    document.querySelectorAll("table");

  if (window.innerWidth < 768) {
    tables.forEach(table => {
      table.style.display = "block";
      table.style.overflowX = "auto";
    });
  }
});

console.log(
  "Gym Management System Loaded Successfully!"
);

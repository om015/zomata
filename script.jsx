// Get modal elements
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");

// Get button elements
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Get close button elements
const closeLogin = document.getElementById("closeLogin");
const closeSignup = document.getElementById("closeSignup");

// Show Login Modal
loginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

// Show Sign Up Modal
signupBtn.addEventListener("click", () => {
    signupModal.style.display = "flex";
});

// Close Login Modal
closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
});

// Close Sign Up Modal
closeSignup.addEventListener("click", () => {
    signupModal.style.display = "none";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === signupModal) signupModal.style.display = "none";
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("restaurantForm");
    const restaurantList = document.getElementById("restaurantList");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const food = document.getElementById("food").value.trim();

        if (name && food) {
            const listItem = document.createElement("li");
            listItem.textContent = `${name} - Serves: ${food}`;
            restaurantList.appendChild(listItem);

            form.reset();
        } else {
            alert("Please enter all details.");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const signupSubmit = document.getElementById("signupSubmit");

    signupSubmit.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent page reload

        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        if (!email || !password) {
            alert("Please enter email and password!");
            return;
        }

        try {
            const response = await fetch("https://back-7xr80y1l5-om-ahirraaos-projects.vercel.app/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Signup successful! Please log in.");
                document.getElementById("signupModal").style.display = "none";
            } else {
                alert("Signup failed: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        }
    });
});


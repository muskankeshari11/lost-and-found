// ================================
// CampusFind JavaScript
// ================================

// Sample items for our demo
const items = [
    {
        name: "Black Backpack",
        type: "Found",
        location: "Central Library",
        date: "Today",
        icon: "🎒"
    },
    {
        name: "Wireless Headphones",
        type: "Found",
        location: "Computer Lab",
        date: "Yesterday",
        icon: "🎧"
    },
    {
        name: "Student ID Card",
        type: "Lost",
        location: "Main Cafeteria",
        date: "2 days ago",
        icon: "💳"
    },
    {
        name: "Black Smart Watch",
        type: "Found",
        location: "Sports Complex",
        date: "Yesterday",
        icon: "⌚"
    }
];


// ================================
// Report Lost Item button
// ================================

function reportLost() {

    const reportSection = document.getElementById("report");

    if (reportSection) {

        reportSection.classList.add("active");

        reportSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}



// ================================
// Browse Found Items button
// ================================

function browseItems() {

    const browseSection = document.getElementById("browse");

    if (browseSection) {

        browseSection.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// ================================
// Student Login
// ================================

function studentLogin() {

    alert(
        "🎓 Student Login\n\n" +
        "Login functionality will be added later."
    );

}


// ================================
// Lost Item Form
// ================================

const lostItemForm = document.getElementById("lostItemForm");

if (lostItemForm) {

    lostItemForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const itemName =
            document.getElementById("itemName").value;

        const category =
            document.getElementById("category").value;

        const color =
            document.getElementById("color").value;

        const location =
            document.getElementById("location").value;

        // Demo AI result
        alert(
            "🤖 AI MATCHING STARTED!\n\n" +

            "Item: " + itemName + "\n" +
            "Category: " + category + "\n" +
            "Color: " + color + "\n" +
            "Location: " + location + "\n\n" +

            "🎯 Potential Match Found!\n" +
            "Similarity: 94%"
        );

    });

}
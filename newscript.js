// ================================
// CampusFind JavaScript
// ================================

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
    window.location.href = "login.html";
}

// ================================
// Fetch and Render Items
// ================================

async function fetchItems() {
    const itemsGrid = document.getElementById("itemsGrid");
    if (!itemsGrid) return;

    try {
        const { data: items, error } = await supabase
            .from('items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching items:", error);
            itemsGrid.innerHTML = "<p>Error loading items.</p>";
            return;
        }

        if (items.length === 0) {
            itemsGrid.innerHTML = "<p>No items found.</p>";
            return;
        }

        itemsGrid.innerHTML = ""; // Clear loading message

        items.forEach(item => {
            const isFound = item.type === "Found" || item.type === "found";
            const statusClass = isFound ? "found" : "lost";
            const statusText = isFound ? "FOUND" : "LOST";
            // Choose an icon based on category or default to a generic one
            let icon = "📦";
            if (item.category && item.category.toLowerCase().includes("tech")) icon = "💻";
            else if (item.category && item.category.toLowerCase().includes("wallet")) icon = "💳";
            else if (item.category && item.category.toLowerCase().includes("keys")) icon = "🔑";

            const cardHTML = `
                <div class="item-card">
                    <div class="item-image">${icon}</div>
                    <div class="item-info">
                        <span class="status ${statusClass}">
                            ${statusText}
                        </span>
                        <h3>${item.name}</h3>
                        <p>📍 ${item.location}</p>
                        <p>🕒 ${new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            `;
            itemsGrid.innerHTML += cardHTML;
        });

    } catch (err) {
        console.error("Exception fetching items:", err);
        itemsGrid.innerHTML = "<p>Error loading items.</p>";
    }
}

// ================================
// Lost Item Form
// ================================

const lostItemForm = document.getElementById("lostItemForm");

if (lostItemForm) {
    lostItemForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const itemName = document.getElementById("itemName").value;
        const category = document.getElementById("category").value;
        const color = document.getElementById("color").value;
        const location = document.getElementById("location").value;

        // Make sure user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("You must be logged in to report an item.");
            window.location.href = "login.html";
            return;
        }

        const { data, error } = await supabase
            .from('items')
            .insert([
                {
                    name: itemName,
                    category: category,
                    color: color,
                    location: location,
                    type: 'Lost', // default to lost from this form
                    user_id: user.id
                }
            ]);

        if (error) {
            alert("Error reporting item: " + error.message);
        } else {
            alert("✅ Item reported successfully!");
            lostItemForm.reset();
            fetchItems(); // Refresh the grid
        }
    });
}

// Fetch items on page load
document.addEventListener("DOMContentLoaded", fetchItems);
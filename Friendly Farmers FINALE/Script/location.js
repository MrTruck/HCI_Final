//--------------------------------------- locationpopup -----------------------------------------
function toggleLocationPopup() {
    const locpopup = document.getElementById("location-popup");
    const loccontainer = document.getElementById("location-container");

    // Get container position
    const rect = loccontainer.getBoundingClientRect();
  //  locpopup.style.top = `${rect.bottom + window.scrollY}px`; // Position below container
    locpopup.style.left = `${rect.left + window.scrollX}px`; // Align horizontally

    // Toggle visibility
    locpopup.classList.toggle("hidden");
}

function filterLocations() {
    const query = document.getElementById("location-search").value.toLowerCase();
    const locations = document.querySelectorAll("#location-list li");
    locations.forEach(function (location) {
        const locationText = location.textContent.toLowerCase();
        location.style.display = locationText.includes(query) ? "block" : "none";
    });
}

function updateLocation(locationName) {
    document.querySelector(".location_name").textContent = locationName;
    toggleLocationPopup(); // Close the popup
}
//--------------------------------------------------------------------------------
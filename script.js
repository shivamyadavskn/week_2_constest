// script.js
const apiKey = "d35b4e7c42msh1f0b5e5d3f362a0p175f73jsn248fbaa674ac";

// Function to fetch and display listings
function fetchAndDisplayListings(searchInput) {
    fetch(`https://rapidapi.com/3b-data-3b-data-default/api/airbnb13?search=${searchInput}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
        }
    })
    .then(response => response.json())
    .then(data => {
        const listingsContainer = document.getElementById('listings-container');
        listingsContainer.innerHTML = ''; // Clear previous listings

        data.data.forEach(listing => {
            const listingCard = document.createElement('div');
            listingCard.className = 'listing-card';

            // Display images, property type, price, beds/bathrooms, and amenities
            listingCard.innerHTML = `
                <h2>${listing.name}</h2>
                <p>Property Type: ${listing.type}</p>
                <p>Price: $${listing.price.rate} ${listing.price.currency}</p>
                <p>Beds: ${listing.beds}, Bathrooms: ${listing.bathrooms}</p>
                <p>Amenities: ${listing.previewAmenities.join(', ')}</p>
                <p>Total Reviews: ${listing.reviewsCount}, Average Rating: ${listing.rating}
            `;

            listingsContainer.appendChild(listingCard);
        });
    })
    .catch(error => {
        console.error("Error fetching data: ", error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the form from actually submitting

        const searchValue = searchInput.value;
        fetchAndDisplayListings(searchValue);
    });
});

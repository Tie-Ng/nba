async function fetchNBAGames() {
    const apiKey = "9145376e-18b8-4f11-aa88-e87fb116ea88"; // Replace with your actual API key
    const apiUrl = "https://api.balldontlie.io/v1/games?per_page=10";

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': apiKey,
            }
        });

        if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);

        const data = await response.json();
        console.log("Games Data:", data); // Debugging

        const gameListContainer = document.getElementById("game-list");
        gameListContainer.innerHTML = ""; // Clear previous content

        data.data.forEach((game) => {
            const gameCard = document.createElement("div");
            gameCard.classList.add("game-card");

            // Format game date
            const gameDate = new Date(game.date).toISOString().split("T")[0];

            gameCard.innerHTML = `
            <div class="container">
                <h2>${game.home_team.full_name}  🆚 ${game.visitor_team.full_name}</h2>
                <p><strong>Date:</strong> ${gameDate}</p>
                <p><strong>Score:</strong> ${game.home_team_score} - ${game.visitor_team_score}</p>
                <a class="details-link" href="details.html?id=${game.id}">View Details</a>
            </div>
            `;

            gameListContainer.appendChild(gameCard);
        });
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("game-list").innerHTML = "Failed to load NBA games.";
    }
}

// Fetch NBA Games on page load
fetchNBAGames();

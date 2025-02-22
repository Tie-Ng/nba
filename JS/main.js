

async function fetchNBAPlayers() {
    const apiKey = '9145376e-18b8-4f11-aa88-e87fb116ea88'; // Replace with your actual API key
    const apiUrl = `https://api.balldontlie.io/v1/players?per_page=50`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': apiKey,
            }
        });

        if (!response.ok) throw new Error('Error fetching data');

        const data = await response.json();
        const players = data.data.slice(0, 50); // Get top 35 players

        displayPlayers(players);

        // Search functionality
        const searchInput = document.getElementById("searchInput");
        searchInput.addEventListener("keyup", function () {
            const searchQuery = this.value.toLowerCase();
            const filteredPlayers = players.filter(player =>
                `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchQuery)
            );
            displayPlayers(filteredPlayers);
        });

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('player-list').innerHTML = "Error loading player rankings. Please try again.";
    }
}

// Function to display players
function displayPlayers(players) {
    const playerListContainer = document.getElementById('player-list');
    playerListContainer.innerHTML = '';

    if (players.length === 0) {
        playerListContainer.innerHTML = "<p>No players found.</p>";
        return;
    }

    players.forEach((player, index) => {
        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');

        playerCard.innerHTML = `
            <h2 class="rank">  ${player.first_name} ${player.last_name}</h2>
            <p class="stats">🏀 Team: ${player.team.full_name}</p>
            <p class="stats">📏 Height: ${player.height || 'N/A'}</p>
            <p class="stats">⚖️ Weight: ${player.weight ? player.weight + " lbs" : 'N/A'}</p>
            <p class="stats">📍 Position: ${player.position || 'N/A'}</p>
            <div><a href="./details.html?id=${player.id}">Details</a></div>
        `;

        playerListContainer.appendChild(playerCard);
    });
}


fetchNBAPlayers();

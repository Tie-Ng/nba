

async function fetchNBAPlayers() {
    const apiKey = '9145376e-18b8-4f11-aa88-e87fb116ea88'; // Replace with your actual API key
    const apiUrl = `https://api.balldontlie.io/v1/players?per_page=35`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': apiKey,
            }
        });

        if (!response.ok) throw new Error('Error fetching data');

        const data = await response.json();
        const playerListContainer = document.getElementById('player-list');
        playerListContainer.innerHTML = '';

        const players = data.data.slice(0, 35); // Correctly fetch top 10 players

        players.forEach((player, index) => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card');

            playerCard.innerHTML = `
                <h2 class="rank">#${index + 1} - ${player.first_name} ${player.last_name}</h2>
                <p class="stats">🏀 Team: ${player.team.full_name}</p>
                <p class="stats">📏 Height: ${player.height}</p>
                <p class="stats">⚖️ Weight: ${player.weight + " lbs"}</p>
                <p class="stats">📍 Position: ${player.position || 'N/A'}</p>
            `;

            playerListContainer.appendChild(playerCard);
        });



        document.getElementById("searchInput").addEventListener("keyup", function () {
            const searchQuery = this.value.toLowerCase();
            const filteredPlayers = playersData.filter(player =>
                `${player.first_name} ${player.last_name}`.toLowerCase().includes(searchQuery)
            );
            displayPlayers(filteredPlayers);
        });

        fetchNBAPlayers();
    

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('player-list').innerHTML = "Error loading player rankings. Please try again.";
    }
}





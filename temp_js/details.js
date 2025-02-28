// Get the full URL
const urlParams = new URLSearchParams(window.location.search);

// Get the value of 'id'
const playerId = urlParams.get('id');



async function fetchNBAPlayer() {
    const apiKey = '9145376e-18b8-4f11-aa88-e87fb116ea88'; // Replace with your actual API key
    const apiUrl = `https://api.balldontlie.io/v1/players/${playerId}`;


    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': apiKey,
            }
        });

        if (!response.ok) throw new Error('Error fetching data');

        const data = await response.json();
        const player = data.data
                
        const div = document.querySelector('#player-div');
        console.log(div)

        div.innerHTML = `
            <h2 class="rank">  ${player.first_name} ${player.last_name}</h2>
            <p class="stats">🏀 Team: ${player.team.full_name}</p>
            <p class="stats">📏 Height: ${player.height || 'N/A'}</p>
            <p class="stats">⚖️ Weight: ${player.weight ? player.weight + " lbs" : 'N/A'}</p>
            <p class="stats">📍 Position: ${player.position || 'N/A'}</p>
        `;

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('player-list').innerHTML = "Error loading player rankings. Please try again.";
    }
}

fetchNBAPlayer()



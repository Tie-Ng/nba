async function fetchNBAGameResults() {
    const apiKey = '45638843-d528-49ac-a5b5-0ce050020863';
    const apiUrl = 'https://api-basketball.p.rapidapi.com/games';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
            }
        });

        if (!response.ok) throw new Error('Error');

        const data = await response.json();
        const gameListContainer = document.getElementById('game-list');
        gameListContainer.innerHTML = ''; // Xóa nội dung cũ

        if (!data.response || data.response.length === 0) {
            gameListContainer.innerHTML = "<p class='no-game'>No match</p>";
            return;
        }

        data.response.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.classList.add('game-item');
            gameItem.innerHTML = `
                <h3>${game.teams.home.name} 🆚 ${game.teams.away.name}</h3>
                <p class="score">🏆 ${game.scores.home.total || 'Chưa có'} - ${game.scores.away.total || 'Chưa có'} 🏆</p>
                <p>📅 Ngày: ${new Date(game.date).toLocaleString()}</p>
                <p>⏳ Trạng thái: ${game.status.long}</p>
            `;
            gameListContainer.appendChild(gameItem);
        });
    } catch (error) {
        console.error(error);
        document.getElementById('game-list').innerHTML = "<p class='error'>Lỗi tải dữ liệu.</p>";
    }
}

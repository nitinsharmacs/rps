const lobbyPage = (player, gameId) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Game Lobby ${gameId}</title>
</head>
<body>
  <div class="page">
    <header>
      <p class="player-name">${player.name}</p>
      <p class="game-id">${gameId}</p>
    </header>

    <main>
      <div class="game-area" id="game-area"></div>
    </main>
  </div>
</body>
</html>`;

module.exports = { lobbyPage };

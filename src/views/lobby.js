const lobbyPage = (player, gameId) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Game Lobby ${gameId}</title>
  <link rel="stylesheet" href="/css/style.css">
  <script src="/js/script.js"></script>
</head>
<body>
  <div class="page">
    <header>
      <p class="player-name">${player.name}</p>
      <p class="game-id">${gameId}</p>
    </header>

    <main>
      <div class="game-area" id="game-area">
        <h1 class="waiting-message">Waiting for players...</h1>
        <div class="moves hide">
          <div class="move rock" onclick="playMove('rock')">Rock</div>
          <div class="move paper" onclick="playMove('paper')">Paper</div>
          <div class="move scissor" onclick="playMove('scissor')">Scissor</div>
        </div>
        <div class="message-area"></div>
      </div>
    </main>
  </div>
</body>
</html>`;

module.exports = { lobbyPage };

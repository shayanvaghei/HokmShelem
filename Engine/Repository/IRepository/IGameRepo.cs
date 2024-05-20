﻿namespace Engine.Repository.IRepository
{
    public interface IGameRepo : IBaseRepo<Game>
    {
        string GetGameName(string playerName);
        GameInfoDto GetGameInfo(string gameName, string playerName);
        bool AllPlayersAreConnected(Game game);
        int GetPlayerIndex(Game game, string playerName);
        void UpdatePlayerStatusOfTheGame(Game game, string playerName, SD.PlayerInGameStatus status);
        void UpdateGame(Game game, GameUpdateDto model);
        void AssignPlayersCards(Game game);
        HakemCardsToHokm GetHakemCardsToHokm(Game game);
        bool HandlePlayerPlayedTheCard(Game game, string card, string playerName, int playerIndex);
        bool EndOfRoundGame(Game game);
        void RoundCalculation(Game game);
        void EmptyRoundCardsAndSuit(Game game);
        string EndOfTheGame(Game game);       
    }
}

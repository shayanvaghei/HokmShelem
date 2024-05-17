﻿namespace Engine.Repository.IRepository
{
    public interface ICardRepo : IBaseRepo<Card>
    {
        Card SetPlayerCards(string playerName, List<string> cards);
        List<string> GetCardsAsList(Card card);
        void RemoveCardFromPlayerHand(Card card, string cardToRemove);
        List<string> GetPlayerCardsAsList(Game game, string playerName);
    }
}

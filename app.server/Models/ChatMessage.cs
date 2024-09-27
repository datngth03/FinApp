namespace app.server.Models
{
    public class ChatMessage
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string UserId { get; set; }
        public DateTime Timestamp { get; set; }

        // Mối quan hệ với User
        public virtual AppUser User { get; set; }
    }
}

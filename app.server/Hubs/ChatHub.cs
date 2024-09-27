using app.server.Data;
using app.server.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace app.server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ApplicationDBContext _context;

        public ChatHub(ApplicationDBContext context)
        {
            _context = context;
        }

        public override async Task OnConnectedAsync()
        {
            // Lấy danh sách tin nhắn từ cơ sở dữ liệu
            var chatHistory = await _context.ChatMessages
                .Include(cm => cm.User)  // Bao gồm thông tin người dùng
                .OrderBy(m => m.Timestamp)  // Sắp xếp tin nhắn theo thời gian
                .Select(cm => new
                {
                    UserName = cm.User.UserName, // Lấy tên người dùng
                    cm.Message,
                })
                .ToListAsync();

            // Gửi toàn bộ lịch sử chat tới client vừa kết nối
            await Clients.Caller.SendAsync("ReceiveChatHistory", chatHistory);

            // Gọi phương thức kết nối từ lớp cơ sở
            await base.OnConnectedAsync();
        }

        public async Task SendMessage(string username, string message)
        {
            var appUser = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
            if (appUser != null)
            {
                var chatMessage = new ChatMessage
                {
                    UserId = appUser.Id,  // Lưu userId của appUser
                    Message = message,
                    Timestamp = DateTime.Now
                };

                // Lưu tin nhắn vào cơ sở dữ liệu
                _context.ChatMessages.Add(chatMessage);
                await _context.SaveChangesAsync();

                // Gửi tin nhắn đến tất cả các kết nối
                await Clients.All.SendAsync("ReceiveMessage", appUser.UserName, message); // Gửi tên người dùng cho frontend
            }
        }

    }

}

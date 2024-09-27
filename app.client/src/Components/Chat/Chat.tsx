import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import Cookies from 'js-cookie'; // Import thư viện js-cookie
import './Chat.css';
import { FaPaperPlane } from 'react-icons/fa';
interface Message {
    userName: string;
    message: string;
}

const Chat = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');


    // Lấy username từ cookies
    const storedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user') || '{}') : {};
    const userName = storedUser.userName || ''; // userName từ đăng nhập

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:5119/chathub') // Địa chỉ API của bạn
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);

        const startConnection = async () => {
            try {
                await newConnection.start();
                console.log('Connected!');

                // Lắng nghe lịch sử chat
                newConnection.on('ReceiveChatHistory', (chatHistory) => {
                    setMessages(chatHistory);
                });

                // Lắng nghe tin nhắn mới
                newConnection.on('ReceiveMessage', (userName, message) => {
                    setMessages(prevMessages => [...prevMessages, { userName, message }]);
                });
            } catch (e) {
                console.log('Connection failed: ', e);
            }
        };

        startConnection();

        return () => {
            if (newConnection) {
                newConnection.off('ReceiveChatHistory');
                newConnection.off('ReceiveMessage');
                newConnection.stop();
            }
        };

    }, []);

    const sendMessage = async () => {
        if (connection?.state === signalR.HubConnectionState.Connected) {
            try {
                await connection.send('SendMessage', userName, message);
                setMessage(''); // Xóa tin nhắn sau khi gửi
            } catch (e) {
                console.log('Sending message failed: ', e);
                // Thông báo lỗi tới người dùng
            }
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="message-list">
                {messages.map((m, index) => (
                    <div key={index} className={m.userName === userName ? 'my-message' : 'other-message'}>
                        <strong>{m.userName}:</strong> {m.message}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message"
                />
                <button onClick={sendMessage} className="send-button">
                    <FaPaperPlane />
                </button>
            </div>

        </div>
    );
};

export default Chat;

import React from 'react';

const ChatScreen = () => {
    return (
        <div className="chat-screen">
            <div className="chat-messages">

            </div>

            <div className="chat-input">
                <input type="text" placeholder="Type your message..." />
                <button>Send</button>
            </div>
        </div>
    );
};

export default ChatScreen;
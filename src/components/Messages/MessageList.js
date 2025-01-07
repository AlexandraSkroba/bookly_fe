import { Message } from "./Message";
import "./MessageList.css";;

export const MessageList = (props) => {
  const { messages } = props;

  return (
    <>
      <ul className="message-list" style={{overflowY: 'scroll', maxHeight: '70vh' }}>
        {messages && messages.map((message, index) => (
          <li key={index}>
            <Message message={message} />
          </li>
        ))}
      </ul>
    </>
  );
};

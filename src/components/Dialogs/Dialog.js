import { MessageInput } from "../Messages/MessageInput";
import { MessageList } from "../Messages/MessageList"
import { SubjectList } from "./SubjectList";


export const Dialog = (props) => {
  const { id, messages, subjects } = props;

  return (
    <>
      <div className="subjects__wrapper">
        <SubjectList dialogId={id} />
      </div>
      <MessageList messages={messages} />
      <MessageInput />
    </>
  )
}

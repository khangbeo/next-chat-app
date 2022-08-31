import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { db } from "../firebaseconfig";
const BottomBar = ({ id, user }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "chats", id, "messages"), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <FormControl p={3} onSubmit={sendMessage} as="form">
      <Input
        placeholder="Type a message"
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
};

export default BottomBar
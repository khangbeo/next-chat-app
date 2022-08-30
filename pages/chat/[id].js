import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Sidebar } from "../../components/Sidebar";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import getOtherEmail from "../../utils/getOtherEmail";
import { useState, useRef, useEffect } from "react";

const Topbar = ({ email }) => {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
      <Avatar src="" marginEnd={3} />
      <Heading size="lg">{email}</Heading>
    </Flex>
  );
};

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

const Chat = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user] = useAuthState(auth);

  const q = query(
    collection(db, "chats", id, "messages"),
    orderBy("timestamp")
  );
  const [messages] = useCollectionData(q);
  const [chat] = useDocumentData(doc(db, "chats", id));
  const bottomOfChat = useRef();

  useEffect(() => {
    setTimeout(
      bottomOfChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
      100
    );
  }, [messages]);

  const getMessages = () => {
    return messages?.map((msg) => {
      const sender = msg.sender === user.email;

      return (
        <Flex
          key={Math.random()}
          bg={sender ? "blue.100" : "green.100"}
          alignSelf={sender ? "flex-start" : "flex-end"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });
  };

  return (
    <Flex h="100vh">
      <Head>
        <title>Chat App</title>
      </Head>
      <Sidebar />

      <Flex flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)} />

        <Flex
          flex={1}
          direction="column"
          p={4}
          mx={5}
          overflowX="scroll"
          sx={{ scrollbarWidth: "none" }}
        >
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>

        <BottomBar id={id} user={user} />
      </Flex>
    </Flex>
  );
};

export default Chat;

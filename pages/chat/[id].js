import { Avatar, Flex, Heading, Text, Spinner, Center } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Sidebar } from "../../components/Sidebar";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db, auth } from "../../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef, useEffect } from "react";
import getOtherUser from "../../utils/getOtherUser";
import BottomBar from "../../components/BottomBar";
import TopBar from "../../components/TopBar";

const Chat = () => {
  const router = useRouter();
  const { id } = router.query;

  const [user] = useAuthState(auth);

  const q = query(
    collection(db, "chats", id, "messages"),
    orderBy("timestamp")
  );

  const [messages, loading] = useCollectionData(q);
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
          direction="column"
          alignSelf={sender ? "flex-start" : "flex-end"}
        >
          <Flex
            bg={sender ? "blue.100" : "green.100"}
            w="fit-content"
            minWidth="100px"
            borderRadius="lg"
            p={3}
            m={1}
          >
            <Text>{msg.text}</Text>
          </Flex>
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
        <TopBar email={getOtherUser(chat?.users, user)} />

        {loading && (
          <Center h="100vh" size="xl">
            <Spinner />
          </Center>
        )}
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

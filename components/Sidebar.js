import {
  Flex,
  Text,
  Button,
  Avatar,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebaseconfig";
import { useRouter } from "next/router";
import { useState } from "react";
import NewChatModal from "./NewChatModal";
import ChatList from "./ChatList";

export const Sidebar = () => {
  // current user
  const [user] = useAuthState(auth);
  const [snapshot] = useCollection(collection(db, "chats"));

  const router = useRouter();

  // chats collection
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input, setInput] = useState("");

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async (e) => {
    e.preventDefault();
    if (
      !chatExists(input) &&
      input !== user.email &&
      input !== null &&
      input !== ""
    ) {
      await addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
    setInput("");
    onClose();
  };

  return (
    <Flex
      h="100%"
      w="300px"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
    >
      <Flex
        h="81px"
        // bgColor="red.100"
        w="100%"
        align="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
        p={3}
      >
        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text>{user.displayName}</Text>
        </Flex>

        <IconButton
          size="sm"
          isRound
          icon={<ArrowLeftIcon />}
          onClick={() => signOut(auth)}
        />
      </Flex>

      <NewChatModal
        isOpen={isOpen}
        onClose={onClose}
        input={input}
        setInput={setInput}
        newChat={newChat}
      />
      <Button m={5} p={4} onClick={onOpen}>
        New Chat
      </Button>

      <Flex
        overflowX="scroll"
        direction="column"
        sx={{ scrollbarWidth: "none" }}
        flex={1}
      >
        <ChatList chats={chats} user={user} redirect={redirect} />
      </Flex>
    </Flex>
  );
};

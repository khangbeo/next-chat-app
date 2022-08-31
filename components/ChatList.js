import { Flex, Avatar, Text } from "@chakra-ui/react";
import getOtherUser from "../utils/getOtherUser";

const ChatList = ({ chats, user, redirect }) => {
  return chats
    ?.filter((chat) => chat.users.includes(user.email))
    .map((chat) => (
      <Flex
        key={Math.random()}
        p={3}
        align="center"
        _hover={{ bg: "gray.100", cursor: "pointer" }}
        onClick={() => redirect(chat.id)}
      >
        <Avatar src="" marginEnd={3} />
        <Text>{getOtherUser(chat.users, user)}</Text>
      </Flex>
    ));
};

export default ChatList
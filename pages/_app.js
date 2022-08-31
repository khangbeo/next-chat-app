import { useAuthState } from "react-firebase-hooks/auth";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { auth } from "../firebaseconfig";
import Login from "../components/Login";

/**
 * 
 * TODO: make a FORM component, able to add name
 * TODO: in SIDEBAR component, change chat room names to be the other user you're talking with
 * TODO: in CHAT Component, change email to name of other user
 * TODO: add timestamp of the message under thet chat bubble
 * TODO: update UI
 * TODO: add image/video/file upload
 * TODO: delete remove chat room
 * 
 */
function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh" size="xl">
          <Spinner />
        </Center>
      </ChakraProvider>
    );
  }

  if (!user) {
    return (
      <ChakraProvider>
        <Login />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

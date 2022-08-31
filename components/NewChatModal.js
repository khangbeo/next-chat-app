import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,Input,Button
} from "@chakra-ui/react";

function NewChatModal({ isOpen, onClose, input, setInput, newChat }) {
  const handleChange = ({ target }) => {
    setInput(target.value);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter email of chat recipient</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl p={3} onSubmit={newChat} as="form" isRequired>
              <Input
                placeholder="Type your recipient's email"
                autoComplete="off"
                onChange={handleChange}
                value={input}
                name="email"
              />
              <Button type="submit" hidden>
                Submit
              </Button>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewChatModal
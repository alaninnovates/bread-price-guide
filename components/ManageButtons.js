import {
    Box,
    Button, Code,
    Modal,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react';
import {FaEdit, FaTrash} from 'react-icons/fa';
import ItemModal from './ItemModal';
import {useAuthStore} from '../store/auth';

export default function ManageButtons({item}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {isOpen: deleteModalOpen, onOpen: openDeleteModal, onClose: closeDeleteModal} = useDisclosure();
    const token = useAuthStore(state => state.token);
    const updateItem = async (itemToUpdate) => {
        console.log(itemToUpdate);
        await fetch(`/api/item/${item._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemToUpdate)
        });
        window.location.reload();
    };
    const deleteItem = async () => {
        closeDeleteModal();
        await fetch(`/api/item/${item._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
            },
        });
        window.location.reload();
    };
    return (
        <>
            <Box>
                <Button colorScheme="teal" mr={2} onClick={onOpen}>
                    <FaEdit/>
                </Button>
                <Button colorScheme="red" mr={2} onClick={openDeleteModal}>
                    <FaTrash/>
                </Button>
            </Box>
            <ItemModal item={item} onSubmit={updateItem} onClose={onClose} isOpen={isOpen}/>
            <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Are you sure you want to delete the item <Code>{item.name}</Code>?</ModalHeader>
                    <ModalFooter>
                        <Button colorScheme="red" mr={2} onClick={deleteItem}>
                            Delete
                        </Button>
                        <Button onClick={closeDeleteModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
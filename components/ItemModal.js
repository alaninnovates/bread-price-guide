import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import ItemForm from './ItemForm';

export default function ItemModal({item = undefined, onSubmit, isOpen, onClose}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{item ? 'Edit' : 'Add'} Item</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <ItemForm item={item} onSubmit={onSubmit} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
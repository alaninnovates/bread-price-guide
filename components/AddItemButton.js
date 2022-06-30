import {FaPlus} from 'react-icons/fa';
import {Button, useDisclosure} from '@chakra-ui/react';
import ItemModal from './ItemModal';
import {useAuthStore} from '../store/auth';
import {useItemsStore} from '../store/items';

export default function AddItemButton() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const token = useAuthStore(state => state.token);
    // const itemsStore = useItemsStore();
    const createItem = async (item) => {
        await fetch(`/api/item`, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        });
        window.location.reload();
    };
    return (
        <>
            <Button
                colorScheme="teal"
                rightIcon={<FaPlus/>}
                mb={4}
                onClick={onOpen}
            >
                Add Item
            </Button>
            <ItemModal onSubmit={createItem} onClose={onClose} isOpen={isOpen}/>
        </>
    );
}
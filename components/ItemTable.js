import {Center, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {useAuth} from '../context/AuthContext';
import ManageButtons from './ManageButtons';
import AddItemButton from './AddItemButton';
import {useItemsStore} from '../store/items';
import {useEffect, useState} from 'react';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const ItemTable = ({items}) => {
    const {authenticated} = useAuth();
    return (
        <TableContainer p={10}>
            {authenticated && (<AddItemButton/>)}
            {/*{
                md: 'lg',
            }*/}
            <Table size={'md'} colorScheme={'black'}>
                <Thead>
                    <Tr>
                        <Th>Item</Th>
                        <Th isNumeric>Price</Th>
                        <Th>Notes</Th>
                        <Th>Last updated</Th>
                        {authenticated && <Th>Actions</Th>}
                    </Tr>
                </Thead>
                <Tbody>
                    {items.length ? items.map(item => (
                        <Tr key={item._id}>
                            <Td>{item.name}</Td>
                            <Td isNumeric>{item.price}</Td>
                            <Td>{item.note}</Td>
                            <Td>{dayjs().to(dayjs(item.lastUpdated).tz(dayjs.tz.guess()))}</Td>
                            {authenticated && (
                                <Td>
                                    <ManageButtons item={item}/>
                                </Td>
                            )}
                        </Tr>
                    )) : (
                        <Center pt={5}><Text>Your search query returned no results.</Text></Center>
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
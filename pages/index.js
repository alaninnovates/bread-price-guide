import {dbConnect} from '../lib/mongodb';
import {ItemTable} from '../components/ItemTable';
import {Box, Button, Center, Heading, HStack, Input} from '@chakra-ui/react';
import Link from 'next/link';
import {useAuth} from '../context/AuthContext';
import {useEffect, useState} from 'react';
import {createItemData} from '../lib/itemUtil';
import Head from 'next/head';
import {ColorModeSwitcher} from '../components/ColorModeSwitcher';

export default function Home({items}) {
    const {authenticated, logout} = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [displayItems, setDisplayItems] = useState(items);
    const search = async () => {
        const items = await fetch('/api/item/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: searchQuery,
            })
        }).then(res => res.json());
        setDisplayItems(items);
    };
    const reset = () => {
        setSearchQuery('');
        setDisplayItems(items);
    }
    return (
        <Box pt={10}>
            <ColorModeSwitcher />
            <Head>
                <title>Bread&apos;s price guide</title>
            </Head>
            <Center flexDir={'column'} gap={3}>
                <Heading size={'xl'}>Bread&apos;s Prices</Heading>
                {authenticated ? (
                    <Button onClick={logout}>
                        Logout
                    </Button>
                ) : (
                    <Link href={'/login'} passHref>
                        <Button as="a">
                            Login
                        </Button>
                    </Link>
                )}
            </Center>
            <HStack w={{ lg: '30%' }} px={10} pt={4}>
                <Input placeholder={'Search query'} value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}/>
                <Button onClick={search} colorScheme={"green"}>Search</Button>
                <Button onClick={reset}>Reset</Button>
            </HStack>
            <ItemTable items={displayItems}/>
        </Box>
    );
}

export async function getServerSideProps() {
    const db = await dbConnect();
    const items = await createItemData(db.collection('items').find());
    return {
        props: {
            items
        }
    };
}
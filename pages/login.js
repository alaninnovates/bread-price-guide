import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
    InputGroup,
    Container
} from '@chakra-ui/react';
import {useState} from 'react';
import {getToken} from '../lib/auth';
import {useRouter} from 'next/router';
import {useAuthStore} from '../store/auth';
import Head from 'next/head';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const authStore = useAuthStore();
    const login = async () => {
        const authData = await getToken(username, password);
        if (authData.success) {
            authStore.login(authData.token);
            await router.push('/');
        } else {
            alert(authData.message);
        }
    };
    return (
        <Container pt={10}>
            <Head>
                <title>Login</title>
            </Head>
            <FormControl isRequired>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" placeholder="Enter username" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
            </FormControl>
            <FormControl isRequired mt={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                    <Input
                        pr="4.5rem"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button mt={4} colorScheme={'green'} onClick={login}>Login</Button>
        </Container>
    );
}
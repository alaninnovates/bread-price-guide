import {ChakraProvider} from '@chakra-ui/react';
import {AuthProvider} from '../context/AuthContext';
import Script from 'next/script';

function MyApp({Component, pageProps}) {
    return (
        <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-JF117KETPM"/>
            <Script id={'google-analytics'}>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                
                    gtag('config', 'G-JF117KETPM');
                    `}
            </Script>
            <ChakraProvider>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
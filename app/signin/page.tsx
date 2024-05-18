"use client"
import Banner from '@/components/banner';
import Signin from '@/components/form/signin';
import { useEffect } from 'react';
import { useAuthentication } from '@/providers/AuthenticationProvider'
import { useRouter } from 'next/navigation';


const SignUp = () => {
    const { isAuthenticate } = useAuthentication();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticate) {
            router.push('/');
        }
    }, [isAuthenticate, router]);

    if (isAuthenticate) {
        return null;
    }

    return (
        <div className="page-form">
            <Signin></Signin>
        </div>
    );
}

export default SignUp;

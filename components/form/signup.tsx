import Link from 'next/link';
import style from './styles.module.scss';
import { useEffect, useState } from 'react';
import hashedPasswords from '../../utils/hashedPassword';
import { useForm, SubmitHandler } from "react-hook-form"
import { userType } from '../../utils/interface';
import { useRouter } from 'next/navigation';
import { useAuthentication } from '@/providers/AuthenticationProvider'

const SignUp = () => {

    const router = useRouter();

    const [userExist, setUserExist] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        if (name === 'username') { setUserExist(false); }
        if (name === 'email') { setEmailExist(false); }
    };

    const { register, handleSubmit, formState: { errors } } = useForm<userType>();

    const saveUser = async (datas: userType) => {
        const currentURL = typeof window !== 'undefined' ? window.location.href : '';
        const formURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdeRWyLwrbES_Pu_GQpKVcx3ucstm-HvQScJJI0wFuQanXTuQ/formResponse";
        const formData = new FormData();
        formData.append("entry.2029863728", datas.yourName);
        formData.append("entry.1019371648", datas.username);
        formData.append("entry.1717897255", datas.email);
        formData.append("entry.1706929265", currentURL + "/" + datas.id);
        await fetch(formURL, {
            method: "POST",
            body: formData,
        });
    }


    const onSubmit: SubmitHandler<userType> = (data) => {
        const userList = localStorage.getItem('userList');
        if (userList) {
            const userData: Array<userType> = JSON.parse(userList);
            const userExist = userData.some((user) => user.username === data.username);
            const emailExist = userData.some((user) => user.email === data.email);
            if (userExist || emailExist) {
                if (userExist) {
                    setUserExist(true)
                }
                if (emailExist) {
                    setEmailExist(true)
                }
            } else {
                const newData = { ...data, password: hashedPasswords(data.password), authentication: false, id: Math.floor(Math.random() * 90000) + 10000 };
                localStorage.setItem('userList', JSON.stringify([...userData, newData]));
                saveUser(newData);
                router.push('/signin');
            }
        } else {
            const newData = { ...data, password: hashedPasswords(data.password), authentication: false, id: Math.floor(Math.random() * 90000) + 10000 };
            localStorage.setItem('userList', JSON.stringify([newData]));
            saveUser(newData);
            router.push('/signin');
        }
    }

    const { isAuthenticate } = useAuthentication();

    useEffect(() => {
        if (isAuthenticate) {
            router.push('/');
        }
    }, [isAuthenticate, router]);

    if (isAuthenticate) {
        return null;
    }


    return (
        <div className={style.form}>
            <div className={style.form__block}>
                <h2 className={style.form__title}>Sign up</h2>
                <p className={style.form__subtitle}>Already have an account? <Link href="/signin">Sign in</Link></p>
                <form onSubmit={handleSubmit(onSubmit)} className={style.form__content}>
                    <input  {...register("yourName", { required: true })} placeholder='Your name' className={style.form__input} />
                    {errors.yourName && <p className={style.form__error}>This field is required</p>}
                    <input {...register("username", { required: true })} onChange={handleChange} placeholder='Username' className={style.form__input} />
                    {errors.username && <p className={style.form__error}>This field is required</p>}
                    {userExist === true ? <p className={style.form__error}>Username already exists</p> : null}
                    <input {...register("email",
                        {
                            required: { value: true, message: 'This field is required' },
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                        }
                    )} onChange={handleChange} placeholder='Email address' className={style.form__input} />
                    {errors.email && <p className={style.form__error}>{errors.email.message}</p>}
                    {emailExist === true ? <p className={style.form__error}>Email already exists</p> : null}
                    <div className={style.form__password}>
                        <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true })} placeholder='Password' className={style.form__input} />
                        <div onClick={() => setShowPassword(!showPassword)} className={showPassword === true ? style.form__password__show : style.form__password__hide}></div>
                    </div>
                    {errors.password && <p className={style.form__error}>This field is required</p>}
                    <div className={style.form__box}>
                        <label className={style.form__privacy}>
                            <input type="checkbox"  {...register("agreeTerms", { required: true })} />
                            <p>I agree with <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link></p>
                        </label>
                    </div>
                    {errors.agreeTerms && <p className={style.form__error}>This field is required</p>}
                    <button type="submit" className={style.form__submit}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
import style from './styles.module.scss';
import { useState } from 'react';
import { baseUser, userType } from '../../utils/interface';
import hashedPasswords from '../../utils/hashedPassword';
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuthentication } from '../../providers/AuthenticationProvider'
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const SignIn = () => {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [authentication, setAuthentication] = useState(false);
    const { saveUsername } = useAuthentication();
    const { register, handleSubmit, formState: { errors } } = useForm<baseUser>();
    const onSubmit: SubmitHandler<baseUser> = (data) => {
        const userList = localStorage.getItem('userList');
        if (userList) {
            const userData: Array<userType> = JSON.parse(userList);
            const userExist = userData.some((user) => user.username === data.username || user.email === data.username);
            if (userExist) {
                const user = userData.find((user) => user.username === data.username || user.email === data.username);
                if (user && user.password === hashedPasswords(data.password)) {
                    if (user.authentication) {
                        saveUsername(user);
                        setIncorrect(false);
                        router.push('/');
                    } else {
                        setAuthentication(true);
                    }
                } else {
                    setIncorrect(true)
                }
            } else {
                setIncorrect(true)
            }
        } else {
            setIncorrect(true)
        }
    };

    return (
        <div className={style.form}>
            <div className={style.form__block}>
                <h2 className={style.form__title}>Sign In</h2>
                <p className={style.form__subtitle}>Don’t have an accout yet? <Link href="/signup">Sign Up</Link></p>
                <form onSubmit={handleSubmit(onSubmit)} className={style.form__content}>
                    <input {...register("username", { required: true })} placeholder='Your username or email address' className={style.form__input} type="text" />
                    {errors.username && <p className={style.form__error}>This field is required</p>}
                    <div className={style.form__password}>
                        <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true })} placeholder='Password' className={style.form__input} />
                        <div onClick={() => setShowPassword(!showPassword)} className={showPassword === true ? style.form__password__show : style.form__password__hide}></div>
                    </div>
                    {errors.password && <p className={style.form__error}>This field is required</p>}
                    <div className={style.form__box}>
                        <label className={style.form__privacy}>
                            <input  {...register("remember")} type="checkbox" />
                            <p>Remember me</p>
                        </label>
                        <Link className={style.form__forgot} href="/">Forgot password?</Link>
                    </div>
                    {incorrect === true ? <p className={style.form__error}>username or password is incorrect</p> : null}
                    <button type="submit" className={style.form__submit} >Sign In</button>
                </form>
            </div>
            {authentication &&
                <div className={style.form__success}>
                    <div className={style.form__success__inner}>
                        <h2 className={style.form__success__title}>The account has not been verified</h2>
                        <p className={style.form__success__txt}>Please check your email and click on the attached link to verify your account</p>
                        <div className={style.form__success__close} onClick={() => setAuthentication(false)}>close</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default SignIn;
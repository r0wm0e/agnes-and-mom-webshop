import {SubmitHandler, useForm} from "react-hook-form";

export type AuthFormFields = {
    username: string;
    password: string;
}

interface AuthFormProps {
    onSubmit: SubmitHandler<AuthFormFields>;
    serverError: string;
    buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({onSubmit, serverError, buttonText}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<AuthFormFields>();

    return (
        <form className="flex flex-col gap-2 max-w-sm mx-auto mt-8" onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("username",
                    {
                        required: "E-post är obligatoriskt",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ogiltig e-postadress",
                        },
                    })
                }
                type="email"
                placeholder="Email"
                className="border p-2 rounded"/>
            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}

            <input
                {...register("password",
                    {
                        required: "Lösenord krävs",
                        minLength: {
                            value: 6,
                            message: "Lösenordet måste vara minst 6 tecken",
                        },
                    })
                }
                type="password"
                placeholder="Password"
                className="border p-2 rounded"/>
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

            {serverError && (
                <div className="text-red-600 text-sm border border-red-400 p-2 rounded bg-red-100">
                    {serverError}
                </div>
            )}

            <button type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300">
                {buttonText}
            </button>
        </form>
    );
};

export default AuthForm;
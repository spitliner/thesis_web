import {z} from "zod";
import {Form, InputField} from "@components/Form";
import { Link } from "react-router-dom";
import { Button } from "@components/Elements";

const schema = z.object({
    email: z.string().min(1, 'Required').email('Must be email'),
    password: z.string().min(1, 'Required')
})

type LoginValues = {
    email: string,
    password: string
}

type LoginFormProps = {
    onSuccess: () => void;
};
export const LoginForm = ({onSuccess}: LoginFormProps) => {
    return <div>
        <Form<LoginValues, typeof schema>
            onSubmit={async () => {
                onSuccess();
            }}
            schema={schema}
        >
            {({register, formState}) => (
                <>
                    <InputField
                        type="email"
                        label="Email Address"
                        error={formState.errors['email']}
                        registration={register('email')}
                    />
                    <InputField
                        type="password"
                        label="Password"
                        error={formState.errors['password']}
                        registration={register('password')}
                    />
                    <div className="p-3">
                        <Button type="submit" className="w-full">
                            Log in
                        </Button>
                    </div>
                </>
            )}
        </Form>
        <div className="mt-2 flex items-center justify-end">
            <div className="text-sm">
                <Link to="../register" className="font-medium text-blue-600 hover:text-blue-500">
                    Register
                </Link>
            </div>
        </div>
    </div>
};
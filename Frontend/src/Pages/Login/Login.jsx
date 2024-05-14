import { useState } from 'react';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import YupPassword from 'yup-password';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
YupPassword(yup);
export default function Login() {
  const navigate = useNavigate();
  const { setIsLogged, userInfo, setUserInfo } = useOutletContext();
  const [Error, setError] = useState({ is: false, content: '' });
  const [show, setShow] = useState(false);
  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().password().minSymbols(0).required(),
    remember: yup.boolean(),
  });
  const form = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      ///////// here is fetching ////////////////
      console.log('trying to login');
      const resutlt = await axios.post(
        'http://localhost:3000/auth/login',
        data,
        { withCredentials: true },
      );

      /////// end of fetching /////////////
      console.log('this is result :', resutlt);
      setUserInfo({ ...resutlt.data.Chercheur, type: resutlt.data.type });
      setIsLogged(true);
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ ...resutlt.data.Chercheur, type: resutlt.data.type }),
      );
      setError({ is: false, content: '' });
      setIsLogged(true);
      localStorage.setItem('isLogged', 'true');
      navigate('/');
    } catch (err) {
      setError({
        is: true,
        content: err.response ? err.response.data.message : 'big error',
      });
      console.log('the error is here : ' + err);
      if (err.response) console.log(err.response.data.message);
    }
  };

  return (
    <div className="relative h-screen ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="absolute left-[7vw] top-[6vw] flex flex-col items-start justify-between gap-[2vw] border-[0.1vw] border-solid border-buttonDark bg-white p-[4vw] shadow-xl"
        >
          <h1 className="m-0 font-title text-[2vw] font-semibold">LOGIN</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h3 className="mb-[0.5vw] font-title text-[1vw] font-medium">
                    Email
                  </h3>
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-[2vw] w-[20vw] rounded-t-sm border-0 border-b-[0.105vw] border-solid border-b-textDark text-[1vw] transition-colors focus:bg-background focus:outline-none active:outline-none"
                    type="text"
                    placeholder="Enter email"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h3 className="font-1 mb-[0.5vw] font-title text-[1vw] font-medium">
                    Password
                  </h3>
                </FormLabel>
                <FormControl>
                  <Input
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="h-[2vw] w-[20vw] rounded-t-sm border-0 border-b-[0.105vw] border-solid border-b-textDark text-[1vw] transition-colors focus:bg-background focus:outline-none active:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              checked={show}
              onCheckedChange={() => setShow(!show)}
            />
            <Label htmlFor="airplane-mode">Show password</Label>
          </div>
          <div className="flex w-[20vw] flex-row items-center justify-between">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="airplane-mode"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="airplane-mode">Remember me</Label>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <ResetRequest />
          <Button
            type="submit" // Added type for button
            className="h-auto w-[20.2vw] rounded-sm border-0 bg-buttonLight py-[0.65vw] font-title text-[1.1vw] font-medium text-textLight active:opacity-95"
          >
            Login
          </Button>
          {Error.is ? (
            <h2 className=" m-0 p-0 text-red-500">{Error.content}</h2>
          ) : null}
        </form>
      </Form>
    </div>
  );
}
function ResetRequest() {
  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button className="m-0 bg-transparent font-title text-[0.8vw] font-medium text-buttonLight no-underline hover:bg-transparent hover:underline">
          Forgot password ?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>vous avez oublié le mot de passe?</DialogTitle>
          <DialogDescription>
            nous vous enverrons un e-mail avec un lien pour réinitialiser votre
            mot de passe
          </DialogDescription>
        </DialogHeader>
        <div className="grid justify-start gap-4  py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-mail
            </Label>
            <Input id="email" defaultValue="" className="col-span-3" />
          </div>
        </div>

        <DialogFooter>
          <Button className="bg-buttonDark" type="submit">
            réinitialiser votre mot de passe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

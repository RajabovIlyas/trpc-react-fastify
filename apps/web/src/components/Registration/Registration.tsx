import { FC } from 'react';
import { useRegistration } from './registration.hook.ts';
import { Link } from '@tanstack/react-router';

const Registration: FC = () => {
  const { errors, handleSubmit, onSubmit, register } = useRegistration();

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-center font-bold">Registration</h3>
          <div className="mt-5">
            <div className="pb-5">
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="login"
              >
                E-mail
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                type="text"
                {...register('email')}
              />
              <p className="h-0 text-red-400">{errors.email?.message}</p>
            </div>
            <div className="pb-5">
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="name"
              >
                {' '}
                Name
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                type="text"
                {...register('name')}
              />
              <p className="h-0 text-red-400">{errors.name?.message}</p>
            </div>
            <div className="pb-5">
              <label
                className="font-semibold text-sm text-gray-600 pb-1 block"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                type="password"
                {...register('password')}
              />
              <p className="h-0 text-red-400">{errors.password?.message}</p>
            </div>
          </div>

          <div className="mt-5">
            <button
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              type="submit"
            >
              Registration
            </button>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <Link
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              to="/login"
            >
              or login
            </Link>
            <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;

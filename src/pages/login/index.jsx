import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CustomInput from '../../components/customInput';
import { AuthContext } from '../../components/context/auth.context';

const wait = time => new Promise(resolve => setTimeout(resolve, time));

const fields = [
  {
    component: CustomInput,
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'elon.musk@tesla.com',
    autoComplete: 'email',
    rules: {
      required: {
        value: true,
        message: 'Email is mandatory',
      },
    },
  },
  {
    component: CustomInput,
    name: 'password',
    type: 'password',
    label: 'Password',
    autoComplete: 'current-password',
    rules: {
      required: {
        value: true,
        message: 'Password is mandatory',
      },
    },
  },
];

function Login() {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
    reset,
    setError,
  } = useForm({
    mode: 'all',
  });

  const { login } = useContext(AuthContext);



  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-6"
        onSubmit={handleSubmit(value => login(value, reset, setError))}
      >
        {errors?.root && <p>{errors?.root?.message}</p>}
        {fields.map(({ component: Component, ...props }) => (
          <Component key={props.name} control={control} {...props} />
        ))}
        <div>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-wait"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <Link
          to="register"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Register
        </Link>
      </p>

    </div>
  );
}

export default Login;



// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import CustomInput from '../../components/customInput';

// const fields = [
//   {
//     component: CustomInput,
//     name: 'email',
//     type: 'email',
//     label: 'Email',
//     placeholder: 'elon.musk@tesla.com',
//     autoComplete: 'email',
//     rules: {
//       required: {
//         value: true,
//         message: 'Email is mandatory',
//       },
//     },
//   },
//   {
//     component: CustomInput,
//     name: 'password',
//     type: 'password',
//     label: 'Password',
//     autoComplete: 'current-password',
//     rules: {
//       required: {
//         value: true,
//         message: 'Password is mandatory',
//       },
//     },
//   },
// ];

// function Login() {
//   const {
//     control,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm({
//     mode: 'onBlur',
//   });

//   const navigate = useNavigate();

//   const onSubmit = async (formData) => {
//     try {
//       const response = await fetch('http://localhost:3000/users');
//       const userData = await response.json();

//       const foundUser = userData.find(
//         (user) => user.email === formData.email
//       );

//       if (!foundUser) {
//         throw new Error('User not found');
//       }

//       const enteredPassword = formData.password.trim();
//       const storedPassword = foundUser.password.trim();
//       const passwordsMatch = enteredPassword.toLowerCase() === storedPassword.toLowerCase();

//       if (!passwordsMatch) {
//         throw new Error('Incorrect email or password');
//       } else {
//         localStorage.setItem('user', JSON.stringify(foundUser));
//         navigate('/');

//       }


//     } catch (error) {
//       console.error('Login error:', error.message);
//       setError('password', {
//         message: error.message,
//       });
//     }
//   };

//   return (
//     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//       <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//         {fields.map(({ component: Component, ...props }) => (
//           <Component key={props.name} control={control} {...props} />
//         ))}
//         {errors && errors.email && (
//           <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
//         )}

//         <div>
//           <button
//             type="submit"
//             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Sign in
//           </button>
//         </div>
//       </form>
//       <p className="mt-10 text-center text-sm text-gray-500">
//         Not a member?{' '}
//         <Link
//           to="register"
//           className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
//         >
//           Register
//         </Link>
//       </p>
//     </div>
//   );
// }

// export default Login;

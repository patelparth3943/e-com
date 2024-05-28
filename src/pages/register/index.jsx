/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import CustomCheckbox from '../../components/customCheckbox';
import CustomSlider from '../../components/customSlider';
import customRadio from '../../components/customRadio';
import { AuthContext } from '../../components/context/auth.context';

const fields = [
  {
    component: CustomInput,
    name: 'name',
    placeholder: 'Elon Musk',
    autoComplete: 'name',
    label: 'Name',
    rules: {
      required: {
        value: true,
        message: 'Name is mendatory',
      },
    },
  },
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
        message: 'Email is mendatory',
      },
      // validate: async data => {
      //   const res = await fetch(`http://localhost:3000/users?email=${data}`);
      //   const json = await res.json();
      //   if (json.length > 0) return 'Email already exist';
      //   return null;
      // },
    },
  },
  {
    component: CustomSlider,
    name: 'age',
    label: 'age',
    min: '0',
    max: '100',
    step: '1',

    rules: {
      required: {
        value: true,
        message: 'Name is mendatory',
      },
    },
  },
  {
    component: customRadio,
    name: 'apply',
    label: 'apply',
    options: [
      {
        value: 'yes',
        text: 'yes',
      },
      {
        value: 'no',
        text: 'no',
      },

    ],
    rules: {
      required: {
        value: true,
        message: 'this is mendatory',
      },
    },
  },
  {
    component: CustomSelect,
    name: 'gender',
    autoComplete: 'sex',
    label: 'Gender',
    placeholder: 'Please Select gender',
    options: [
      {
        value: 'male',
        text: 'Male',
      },
      {
        value: 'female',
        text: 'Female',
      },
      {
        value: 'other',
        text: 'Other',
      },
    ],
    rules: {
      required: {
        value: true,
        message: 'Gender is mendatory',
      },
    },
  },
  {
    component: CustomCheckbox,
    name: 'hobbies',
    label: 'Hobbies',
    options: [
      {
        value: 'cricket',
        text: 'Cricket',
      },
      {
        value: 'football',
        text: 'Football',
      },
      {
        value: 'tennis',
        text: 'Tennis',
      },
    ],
    rules: {
      required: {
        value: true,
        message: 'Gender is mendatory',
      },
    },
  },
  {
    component: CustomInput,
    name: 'password',
    type: 'password',
    label: 'Password',
    autoComplete: 'new-password',
    rules: {
      required: {
        value: true,
        message: 'Password is mendatory',
      },
    },
  },
  {
    component: CustomInput,
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    autoComplete: 'new-password',
    rules: {
      required: {
        value: true,
        message: 'Confirm Password is mendatory',
      },
    },
  },
];

function Register() {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
    reset,
    setError,
  } = useForm({
    mode: 'all',
  });
  // const navigate = useNavigate();
  const { register } = useContext(AuthContext);


  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-6"
        onSubmit={handleSubmit(value => register(value, reset, setError))}
      >
        {errors?.root && <p>{errors?.root?.message}</p>}
        {fields.map(({ component: Component, ...props }) => (
          <Component key={props.name} control={control} {...props} />
        ))}
        <div>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-400 disabled:cursor-wait"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member?{' '}
        <Link
          to="/auth"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;

import React, { Fragment, useContext, useMemo, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Navigate, Outlet } from 'react-router-dom';
import { ShoppingCartIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '../components/context/auth.context';
import { CartContext } from '../components/context/cartcontext';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function MainLayout() {
  const { user, logout } = useContext(AuthContext);
  const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [cartOpen, setCartOpen] = useState(false);

  const userNavigation = useMemo(
    () => [
      { name: 'Your Profile', href: '#' },
      { name: 'Settings', href: '#' },
      { name: 'Sign out', onClick: logout },
    ],
    [logout]
  );

  if (!user) {
    return <Navigate to="/auth" />;
  }

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map(item => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Sheet>
                      <SheetTrigger>
                        <button
                          type="button"
                          onClick={() => setCartOpen(!cartOpen)}
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">cart</span>
                          {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-2">{cart.length}</span>
                          )}
                        </button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Shopping Cart</SheetTitle>
                          <SheetDescription>
                            <div className="p-4 max-h-96 overflow-y-auto">
                              {cart.length > 0 ? (
                                cart.map(item => (
                                  <Card key={item.id} className="flex items-center mb-4">
                                    <CardHeader className="w-1/4">
                                      <img className="aspect-square object-contain" src={item.image} alt={item.title} />
                                    </CardHeader>
                                    <CardContent className="w-2/4 flex flex-col gap-2">
                                      <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                                      <p className="text-pink-600 text-lg">{Intl.NumberFormat("en-IN", { currency: "USD", style: 'currency' }).format(item.price)}</p>
                                    </CardContent>
                                    <CardFooter className="w-1/4 flex flex-col items-end">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          className="px-2 py-1 bg-gray-300 rounded"
                                          onClick={() => decreaseQuantity(item.id)}
                                        >
                                          -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                          className="px-2 py-1 bg-pink-600 text-white rounded"
                                          onClick={() => increaseQuantity(item.id)}
                                        >
                                          +
                                        </button>
                                      </div>
                                    </CardFooter>
                                  </Card>
                                ))
                              ) : (
                                <p className="text-center text-gray-500">Your cart is empty</p>
                              )}
                            </div>
                            <div className="flex justify-between items-center px-4 py-2 border-t">
                              <span className="text-lg font-medium">Total</span>
                              <span className="text-lg font-medium">{Intl.NumberFormat("en-IN", { currency: "USD", style: 'currency' }).format(totalAmount)}</span>
                            </div>
                            <div className="flex justify-between px-4 py-2">
                              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-black">Continue Shopping</button>
                              <button className="px-4 py-2 bg-orange-600 text-white rounded-md">Checkout</button>
                            </div>
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map(item => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <button
                                  type="button"
                                  onClick={item.onClick}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                  )}
                                >
                                  {item.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {navigation.map(item => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map(item => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <Outlet />
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;



// import React, { Fragment, useContext, useMemo, useState } from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { Navigate, Outlet } from 'react-router-dom';
// import { ShoppingCartIcon } from 'lucide-react';
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// import { AuthContext } from '../components/context/auth.context';
// import { CartContext } from '../components/context/cartcontext';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
//   { name: 'Reports', href: '#', current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// function MainLayout() {
//   const { user, logout } = useContext(AuthContext);
//   const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
//   const [cartOpen, setCartOpen] = useState(false);

//   const userNavigation = useMemo(
//     () => [
//       { name: 'Your Profile', href: '#' },
//       { name: 'Settings', href: '#' },
//       { name: 'Sign out', onClick: logout },
//     ],
//     [logout]
//   );

//   if (!user) {
//     return <Navigate to="/auth" />;
//   }

//   return (
//     <div className="min-h-full">
//       <Disclosure as="nav" className="bg-gray-800">
//         {({ open }) => (
//           <>
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <div className="flex h-16 items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <img
//                       className="h-8 w-8"
//                       src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                       alt="Your Company"
//                     />
//                   </div>
//                   <div className="hidden md:block">
//                     <div className="ml-10 flex items-baseline space-x-4">
//                       {navigation.map(item => (
//                         <a
//                           key={item.name}
//                           href={item.href}
//                           className={classNames(
//                             item.current
//                               ? 'bg-gray-900 text-white'
//                               : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                             'rounded-md px-3 py-2 text-sm font-medium'
//                           )}
//                           aria-current={item.current ? 'page' : undefined}
//                         >
//                           {item.name}
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="hidden md:block">
//                   <div className="ml-4 flex items-center md:ml-6">
//                     <Sheet>
//                       <SheetTrigger>
//                         <button
//                           type="button"
//                           onClick={() => setCartOpen(!cartOpen)}
//                           className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                         >
//                           <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
//                           <span className="absolute -inset-1.5" />
//                           <span className="sr-only">cart</span>
//                           {cart.length > 0 && (
//                             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-2">{cart.length}</span>
//                           )}
//                         </button>
//                       </SheetTrigger>
//                       <SheetContent>
//                         <SheetHeader>
//                           <SheetTitle>Shopping Cart</SheetTitle>
//                           <SheetDescription>
//                             <div className="p-4  overflow-y-auto">
//                               {cart.length > 0 ? (
//                                 cart.map(item => (
//                                   <Card key={item.id} className="mb-4">
//                                     <CardHeader>
//                                       <img className="aspect-square object-contain" src={item.image} alt={item.title} />
//                                     </CardHeader>
//                                     <CardContent className="flex flex-col gap-4">
//                                       <CardTitle className="line-clamp-1">{item.title}</CardTitle>
//                                       <CardDescription className="line-clamp-2">{item.description}</CardDescription>
//                                       <p>{Intl.NumberFormat("en-US", { currency: "USD", style: 'currency' }).format(item.price)}</p>
//                                       <div className="flex items-center space-x-2">
//                                         <button
//                                           className="px-2 py-1 bg-gray-300 rounded"
//                                           onClick={() => decreaseQuantity(item.id)}
//                                         >
//                                           -
//                                         </button>
//                                         <span>{item.quantity}</span>
//                                         <button
//                                           className="px-2 py-1 bg-gray-300 rounded"
//                                           onClick={() => increaseQuantity(item.id)}
//                                         >
//                                           +
//                                         </button>
//                                       </div>
//                                     </CardContent>
//                                     <CardFooter>
//                                       <span className="text-lg font-medium">${item.price * item.quantity}</span>
//                                     </CardFooter>
//                                   </Card>
//                                 ))
//                               ) : (
//                                 <p className="text-center text-gray-500">Your cart is empty</p>
//                               )}
//                             </div>
//                           </SheetDescription>
//                         </SheetHeader>
//                       </SheetContent>
//                     </Sheet>

//                     {/* Profile dropdown */}
//                     <Menu as="div" className="relative ml-3">
//                       <div>
//                         <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                           <span className="absolute -inset-1.5" />
//                           <span className="sr-only">Open user menu</span>
//                           <img
//                             className="h-8 w-8 rounded-full"
//                             src={user.imageUrl}
//                             alt=""
//                           />
//                         </Menu.Button>
//                       </div>
//                       <Transition
//                         as={Fragment}
//                         enter="transition ease-out duration-100"
//                         enterFrom="transform opacity-0 scale-95"
//                         enterTo="transform opacity-100 scale-100"
//                         leave="transition ease-in duration-75"
//                         leaveFrom="transform opacity-100 scale-100"
//                         leaveTo="transform opacity-0 scale-95"
//                       >
//                         <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                           {userNavigation.map(item => (
//                             <Menu.Item key={item.name}>
//                               {({ active }) => (
//                                 <button
//                                   type="button"
//                                   onClick={item.onClick}
//                                   className={classNames(
//                                     active ? 'bg-gray-100' : '',
//                                     'block px-4 py-2 text-sm text-gray-700 w-full text-left'
//                                   )}
//                                 >
//                                   {item.name}
//                                 </button>
//                               )}
//                             </Menu.Item>
//                           ))}
//                         </Menu.Items>
//                       </Transition>
//                     </Menu>
//                   </div>
//                 </div>
//                 <div className="-mr-2 flex md:hidden">
//                   {/* Mobile menu button */}
//                   <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                     <span className="absolute -inset-0.5" />
//                     <span className="sr-only">Open main menu</span>
//                     {open ? (
//                       <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                     ) : (
//                       <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                     )}
//                   </Disclosure.Button>
//                 </div>
//               </div>
//             </div>

//             <Disclosure.Panel className="md:hidden">
//               <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
//                 {navigation.map(item => (
//                   <Disclosure.Button
//                     key={item.name}
//                     as="a"
//                     href={item.href}
//                     className={classNames(
//                       item.current
//                         ? 'bg-gray-900 text-white'
//                         : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                       'block rounded-md px-3 py-2 text-base font-medium'
//                     )}
//                     aria-current={item.current ? 'page' : undefined}
//                   >
//                     {item.name}
//                   </Disclosure.Button>
//                 ))}
//               </div>
//               <div className="border-t border-gray-700 pb-3 pt-4">
//                 <div className="flex items-center px-5">
//                   <div className="flex-shrink-0">
//                     <img
//                       className="h-10 w-10 rounded-full"
//                       src={user.imageUrl}
//                       alt=""
//                     />
//                   </div>
//                   <div className="ml-3">
//                     <div className="text-base font-medium leading-none text-white">
//                       {user.name}
//                     </div>
//                     <div className="text-sm font-medium leading-none text-gray-400">
//                       {user.email}
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                   >
//                     <span className="absolute -inset-1.5" />
//                     <span className="sr-only">View notifications</span>
//                     <BellIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>
//                 <div className="mt-3 space-y-1 px-2">
//                   {userNavigation.map(item => (
//                     <Disclosure.Button
//                       key={item.name}
//                       as="a"
//                       href={item.href}
//                       className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
//                     >
//                       {item.name}
//                     </Disclosure.Button>
//                   ))}
//                 </div>
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>

//       <header className="bg-white shadow">
//         <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//             Dashboard
//           </h1>
//         </div>
//       </header>
//       <main>
//         <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
//           <Outlet />
//         </div>
//       </main>

//       {/* Cart modal */}
//       {cartOpen && <cart open={cartOpen} onClose={() => setCartOpen(false)} />}
//     </div>
//   );
// }

// export default MainLayout;


// import React, { Fragment, useContext, useMemo, useState } from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { Navigate, Outlet } from 'react-router-dom';
// import { ShoppingCartIcon } from 'lucide-react';
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// import { AuthContext } from '../components/context/auth.context';
// import { CartContext } from '../components/context/cartcontext';
// import Cart from '../pages/cart/cart';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
//   { name: 'Reports', href: '#', current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// function MainLayout() {
//   const { user, logout } = useContext(AuthContext);
//   const { cart } = useContext(CartContext); // Access CartContext
//   const [cartOpen, setCartOpen] = useState(false);

//   const userNavigation = useMemo(
//     () => [
//       { name: 'Your Profile', href: '#' },
//       { name: 'Settings', href: '#' },
//       { name: 'Sign out', onClick: logout },
//     ],
//     [logout]
//   );

//   if (!user) {
//     return <Navigate to="/auth" />;
//   }
//   const { increaseQuantity, decreaseQuantity } = useContext(CartContext);
//   return (
//     <div className="min-h-full">
//       <Disclosure as="nav" className="bg-gray-800">
//         {({ open }) => (
//           <>
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <div className="flex h-16 items-center justify-between">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0">
//                     <img
//                       className="h-8 w-8"
//                       src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                       alt="Your Company"
//                     />
//                   </div>
//                   <div className="hidden md:block">
//                     <div className="ml-10 flex items-baseline space-x-4">
//                       {navigation.map(item => (
//                         <a
//                           key={item.name}
//                           href={item.href}
//                           className={classNames(
//                             item.current
//                               ? 'bg-gray-900 text-white'
//                               : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                             'rounded-md px-3 py-2 text-sm font-medium'
//                           )}
//                           aria-current={item.current ? 'page' : undefined}
//                         >
//                           {item.name}
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="hidden md:block">
//                   <div className="ml-4 flex items-center md:ml-6">
//                     <Sheet>
//                       <SheetTrigger>

//                         <button
//                           type="button"
//                           onClick={() => setCartOpen(!cartOpen)}
//                           className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                         >
//                           <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
//                           <span className="absolute -inset-1.5" />
//                           <span className="sr-only">cart</span>
//                           {cart.length > 0 && (
//                             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-2">{cart.length}</span>
//                           )}
//                         </button>
//                       </SheetTrigger>
//                       <SheetContent>
//                         <SheetHeader>
//                           <SheetTitle>Are you absolutely sure?</SheetTitle>
//                           <SheetDescription>
//                             <div className="p-4 max-h-96 overflow-y-auto">
//                               {cart.length > 0 ? (
//                                 cart.map(item => (
//                                   <Card key={item.id} className="mb-4">
//                                     <CardHeader>
//                                       <img className="aspect-square object-contain" src={item.image} alt={item.title} />
//                                     </CardHeader>
//                                     <CardContent className="flex flex-col gap-4">
//                                       <CardTitle className="line-clamp-1">{item.title}</CardTitle>
//                                       <CardDescription className="line-clamp-2">{item.description}</CardDescription>
//                                       <p>{Intl.NumberFormat("en-US", { currency: "USD", style: 'currency' }).format(item.price)}</p>
//                                       <div className="flex items-center space-x-2">
//                                         <button
//                                           className="px-2 py-1 bg-gray-300 rounded"
//                                           onClick={() => decreaseQuantity(item.id)}
//                                         >
//                                           -
//                                         </button>
//                                         <span>{item.quantity}</span>
//                                         <button
//                                           className="px-2 py-1 bg-gray-300 rounded"
//                                           onClick={() => increaseQuantity(item.id)}
//                                         >
//                                           +
//                                         </button>
//                                       </div>
//                                     </CardContent>
//                                     <CardFooter>
//                                       <span className="text-lg font-medium">${item.price * item.quantity}</span>
//                                     </CardFooter>
//                                   </Card>
//                                 ))
//                               ) : (
//                                 <p className="text-center text-gray-500">Your cart is empty</p>
//                               )}
//                             </div>


//                           </SheetDescription>
//                         </SheetHeader>
//                       </SheetContent>
//                     </Sheet>



//                     {/* Profile dropdown */}
//                     <Menu as="div" className="relative ml-3">
//                       <div>
//                         <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                           <span className="absolute -inset-1.5" />
//                           <span className="sr-only">Open user menu</span>
//                           <img
//                             className="h-8 w-8 rounded-full"
//                             src={user.imageUrl}
//                             alt=""
//                           />
//                         </Menu.Button>
//                       </div>
//                       <Transition
//                         as={Fragment}
//                         enter="transition ease-out duration-100"
//                         enterFrom="transform opacity-0 scale-95"
//                         enterTo="transform opacity-100 scale-100"
//                         leave="transition ease-in duration-75"
//                         leaveFrom="transform opacity-100 scale-100"
//                         leaveTo="transform opacity-0 scale-95"
//                       >
//                         <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                           {userNavigation.map(item => (
//                             <Menu.Item key={item.name}>
//                               {({ active }) => (
//                                 <button
//                                   type="button"
//                                   onClick={item.onClick}
//                                   className={classNames(
//                                     active ? 'bg-gray-100' : '',
//                                     'block px-4 py-2 text-sm text-gray-700 w-full text-left'
//                                   )}
//                                 >
//                                   {item.name}
//                                 </button>
//                               )}
//                             </Menu.Item>
//                           ))}
//                         </Menu.Items>
//                       </Transition>
//                     </Menu>
//                   </div>
//                 </div>
//                 <div className="-mr-2 flex md:hidden">
//                   {/* Mobile menu button */}
//                   <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                     <span className="absolute -inset-0.5" />
//                     <span className="sr-only">Open main menu</span>
//                     {open ? (
//                       <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                     ) : (
//                       <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                     )}
//                   </Disclosure.Button>
//                 </div>
//               </div>
//             </div>

//             <Disclosure.Panel className="md:hidden">
//               <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
//                 {navigation.map(item => (
//                   <Disclosure.Button
//                     key={item.name}
//                     as="a"
//                     href={item.href}
//                     className={classNames(
//                       item.current
//                         ? 'bg-gray-900 text-white'
//                         : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                       'block rounded-md px-3 py-2 text-base font-medium'
//                     )}
//                     aria-current={item.current ? 'page' : undefined}
//                   >
//                     {item.name}
//                   </Disclosure.Button>
//                 ))}
//               </div>
//               <div className="border-t border-gray-700 pb-3 pt-4">
//                 <div className="flex items-center px-5">
//                   <div className="flex-shrink-0">
//                     <img
//                       className="h-10 w-10 rounded-full"
//                       src={user.imageUrl}
//                       alt=""
//                     />
//                   </div>
//                   <div className="ml-3">
//                     <div className="text-base font-medium leading-none text-white">
//                       {user.name}
//                     </div>
//                     <div className="text-sm font-medium leading-none text-gray-400">
//                       {user.email}
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                   >
//                     <span className="absolute -inset-1.5" />
//                     <span className="sr-only">View notifications</span>
//                     <BellIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </div>
//                 <div className="mt-3 space-y-1 px-2">
//                   {userNavigation.map(item => (
//                     <Disclosure.Button
//                       key={item.name}
//                       as="a"
//                       href={item.href}
//                       className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
//                     >
//                       {item.name}
//                     </Disclosure.Button>
//                   ))}
//                 </div>
//               </div>
//             </Disclosure.Panel>
//           </>
//         )}
//       </Disclosure>

//       <header className="bg-white shadow">
//         <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//             Dashboard
//           </h1>
//         </div>
//       </header>
//       <main>
//         <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
//           <Outlet />
//         </div>
//       </main>

//       {/* Cart modal */}
//       {cartOpen && <Cart open={cartOpen} onClose={() => setCartOpen(false)} />}
//     </div>
//   );
// }

// export default MainLayout;
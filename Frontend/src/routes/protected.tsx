import {MainLayout} from '@components/Layout';
import {MessagesRoutes} from "@features/messages/routes";


export const protectedRoutes = [
    {
        path: '/*',
        element: <MainLayout/>,
        children: [
            {path: 'messages/*', element: <MessagesRoutes/>},
            // {path: '/profile', element: <Profile/>},
            // {path: '/', element: <Dashboard/>},
            // {path: '*', element: <Navigate to="."/>},
        ],
    },
];
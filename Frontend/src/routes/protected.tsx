import {ContentLayout, MainLayout} from '@components/Layout';


export const protectedRoutes = [
    {
        path: '/*',
        element: <MainLayout/>,
        children: [
            {index: true, element: <ContentLayout title="title here">Content heres</ContentLayout>},
            // {path: '/users', element: <Users/>},
            // {path: '/profile', element: <Profile/>},
            // {path: '/', element: <Dashboard/>},
            // {path: '*', element: <Navigate to="."/>},
        ],
    },
];
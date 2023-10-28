import * as React from 'react';

import {Head} from '@components/Elements/Head'

type ContentLayoutProps = {
    children: React.ReactNode;
    title: string;
};

export const ContentLayout = ({children, title}: ContentLayoutProps) => {
    return (
        <>
            <Head title={title}/>
            <div className="container-fluid row h-100 p-0" style={{marginLeft: '4.5rem'}}>
                <div className="col-3" style={{backgroundColor: 'red'}}>
                    <h1 className="">{title}</h1>
                </div>
                <div className="col-9" style={{backgroundColor: 'green'}}>{children}</div>
            </div>

        </>
    );
};
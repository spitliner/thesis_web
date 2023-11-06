import {Head} from '@components/Elements/Head'
import {ReactNode} from "react";

type ContentLayoutProps = {
    title: string;
    children: ReactNode
    navbar: ReactNode
};

export const ContentLayout = ({title, children, navbar}: ContentLayoutProps) => {
    return (
        <>
            <Head title={title}/>
            <div className="container-fluid row h-100 p-0 g-0" style={{marginLeft: '4.5rem'}}>
                <div className="col-3" style={{backgroundColor: 'red'}}>
                    <h1 className="">{title}</h1>
                    {navbar}
                </div>
                <div className="col-9" style={{backgroundColor: 'green'}}>{children}</div>
            </div>

        </>
    );
};
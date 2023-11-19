import {ContentLayout} from "@components/Layout";
import {Outlet} from "react-router-dom";

type MessagesLayoutProps = {
    title: string;
};

export const MessagesLayout = ({title}: MessagesLayoutProps) => {
    return (
        <ContentLayout title={title} navbar={<div>Channels List </div>}>
            <Outlet />
        </ContentLayout>
    )
}
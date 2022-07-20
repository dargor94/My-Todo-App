import {withAuthenticationRequired} from "@auth0/auth0-react";

export const ProtectedComponent = ({component, ...args}) => {

    const Cp = withAuthenticationRequired(component);
    return <Cp {...args} />
};

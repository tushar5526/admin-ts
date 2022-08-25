import * as React from 'react';
import {Layout, LayoutProps} from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';

// eslint-disable-next-line react/display-name
export default (props: LayoutProps) => {
    return <Layout {...props} appBar={AppBar} menu={Menu}/>;
};

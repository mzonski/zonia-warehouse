import React from 'react';

export const appNavigationRef = React.createRef<any>();

export const appNavigate = (name: string, params: any) => appNavigationRef.current?.navigate(name, params);

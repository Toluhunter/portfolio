declare module 'react-awesome-slider/dist/autoplay' {
    import { ComponentType, PropsWithChildren } from 'react';
    const withAutoplay: (component: ComponentType<PropsWithChildren<any>>) => ComponentType<PropsWithChildren<any>>;
    export default withAutoplay;
}
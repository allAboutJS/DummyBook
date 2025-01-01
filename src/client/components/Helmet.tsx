import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet";

export default Helmet as unknown as (props: PropsWithChildren) => JSX.Element;

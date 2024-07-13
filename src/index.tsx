/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import "uno.css";

const root = document.getElementById("root") as HTMLDivElement;

render(() => <App />, root);

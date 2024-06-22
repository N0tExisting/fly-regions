/* @refresh reload */
import "solid-devtools";
import { render } from "solid-js/web";

import "uno.css";
import App from "./App";

const root = document.getElementById("root") as HTMLDivElement;

render(() => <App />, root);

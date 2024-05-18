import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import { Window } from '@tauri-apps/api/window';
import "./App.css";

const appWindow = Window.getCurrent();

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <div class={"page_root"}>
      <div data-tauri-drag-region class={"titlebar"}>
        <button onClick={() => appWindow.close()}>Close</button>
      </div>
      <div class="container">
        <h1>Titlebar Bug Demo</h1>
        <text>In TauriV2</text>

        <div class="row">
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo vite" alt="Vite logo"/>
          </a>
          <a href="https://tauri.app" target="_blank">
            <img src="/tauri.svg" class="logo tauri" alt="Tauri logo"/>
          </a>
          <a href="https://solidjs.com" target="_blank">
            <img src={logo} class="logo solid" alt="Solid logo"/>
          </a>
        </div>

        <text>Find the bug by trying to resize the app from the top</text>
        <text>The app can be resized from the close button although it is within the titlebar</text>

        <form
          class="row"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>

        <p>{greetMsg()}</p>
      </div>
    </div>
  );
}

export default App;

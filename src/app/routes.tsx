import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Welcome } from "./components/Welcome";
import { WhatIsCrypto } from "./components/WhatIsCrypto";
import { CaesarLesson } from "./components/CaesarLesson";
import { Simulator } from "./components/Simulator";
import { Challenges } from "./components/Challenges";
import { BruteForce } from "./components/BruteForce";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Welcome },
      { path: "criptografia", Component: WhatIsCrypto },
      { path: "cifra-cesar", Component: CaesarLesson },
      { path: "simulador", Component: Simulator },
      { path: "desafios", Component: Challenges },
      { path: "forca-bruta", Component: BruteForce },
    ],
  },
]);

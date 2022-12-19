import { observer, Local } from "./lib/Lib.js";

import Save     from "./components/Save.js";
import Header   from "./components/Header.js";
import Actions  from "./components/Actions.js";
import Board    from "./components/Board.js";

const root = document.getElementById("root"),
  components = root.children;

const local = new Local();
const board = new Board({id: "board_container"});
const actions = new Actions({id: "actions_container", board: board});
const header = new Header({id: "header_container", board: board});
const save = new Save({id: "save_container", board: board, local: local});

board.actions = actions;

root.innerHTML = `
  ${header.html()}
  ${actions.html()}
  ${board.html()}
  ${save.html()}
`;

observer(board, local, save);

components.save_container.addEventListener("click", (e) => save.onClick(e));
components.header_container.addEventListener("submit", header.onSubmit);
components.actions_container.addEventListener("click", (e) => actions.onClick(e));
components.board_container.addEventListener("click", (e) => board.onClick(e));

// local.reset();

board.load(local);

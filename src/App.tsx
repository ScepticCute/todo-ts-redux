import { Boards } from './components/Boards/Boards';
import styles from './App.module.scss';
import { FormCreateBoard } from './components/FormCreateBoard/FormCreateBoard';
import { useState } from 'react';

import { HiPencilSquare } from 'react-icons/hi2';

function App() {
  const [boardCreatorIsOpen, setBoardCreatorOpen] = useState(false);
  return (
    <>
      {boardCreatorIsOpen ? <FormCreateBoard setOpen={setBoardCreatorOpen} /> : ''}
      {/* Выше расположено модальное окно */}

      <div className={styles.App}>
        <header className={styles.header}>
          <h1 className={styles.logo}>TODO APP</h1>
          <button
            className={styles.create_board_button}
            onClick={() => setBoardCreatorOpen(!boardCreatorIsOpen)}>
            <HiPencilSquare />
          </button>
        </header>

        <Boards />
      </div>
    </>
  );
}

export default App;

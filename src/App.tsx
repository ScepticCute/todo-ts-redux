import { Boards } from './components/Boards/Boards';
import styles from './App.module.scss';
import { FormCreateBoard } from './components/FormCreateBoard/FormCreateBoard';
import { useState } from 'react';

function App() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1>TODO APP</h1>
      </header>
      <button onClick={() => setOpen(!isOpen)}>Создать новую доску</button>
      {isOpen ? <FormCreateBoard setOpen={setOpen} /> : ''}
      <Boards />
    </div>
  );
}

export default App;

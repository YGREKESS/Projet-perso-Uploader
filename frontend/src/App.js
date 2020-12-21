import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import LayoutDownload from './components/LayoutDownload';
import LayoutUpload from './components/LayoutUpload';
import LayoutSent from './components/LayoutSent';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={LayoutUpload} />
        <Route path="/sent/:id" component={LayoutSent}/>
        <Route path="/download/:id" component={LayoutDownload}/>
      </div>
    </BrowserRouter>
  );
}

export default App;

/**
Il faut que je recupère l'id de props.match.params pour retrouver les fichiers du post 
puis à l'aide de l'API, les télécharger, soit tous, soit un par un. */
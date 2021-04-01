import classes from './App.module.scss';
import mainBgSrc from './assets/main-bg.jpg';
import Layout from './containers/Layout/Layout';

const App = () => {
  return (
    <main className={classes.App}>
      <Layout/>
      <div className={classes.mainBackground}>
        <img src={mainBgSrc} alt="background cooking"/>
      </div>
    </main>
  );
}

export default App;

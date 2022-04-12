import style from './css/main.module.scss';

function _Main(props) {
  const { children } = props;
  return (
    <main className={style.main}>
      {children}
    </main>
  );
}

export default _Main;

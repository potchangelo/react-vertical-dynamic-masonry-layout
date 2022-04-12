import { Link } from 'react-router-dom';
import style from './css/headerNav.module.scss';

function _HeaderNav() {
  return (
    <header className={style.main}>
      <Link className={style.link} to="/">
        <div>
          <img className={style.logo} src="/images/logo-light-64.png" alt="zinglecode" />
        </div>
        <div>
          <h1 className="title is-6">React Pinterest Layout</h1>
          <h3 className="subtitle is-7">by Zinglecode</h3>
        </div>
      </Link>
    </header>
  );
}

export default _HeaderNav;

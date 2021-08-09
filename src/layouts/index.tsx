import { IRouteComponentProps } from 'umi';
import styles from './layouts.less';
import Header from '../components/Header';
import PlayerWidget from '../components/PlayerWidget';

export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  return (
    <div className={styles.layout}>
      <Header/>
      {children}
      <PlayerWidget/>
    </div>
  )
}

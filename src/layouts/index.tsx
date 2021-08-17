import { IRouteComponentProps } from 'umi';
import styles from './layouts.less';
import Header from '../components/Header';
import PlayerWidget from '../components/PlayerWidget';
import Toast from '@/components/Toast';
import { Helmet } from 'umi';

export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  return (
    <div className={styles.layout}>
      <Helmet>
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <Header />
      {children}
      <PlayerWidget />
      <Toast/>
    </div>
  );
}

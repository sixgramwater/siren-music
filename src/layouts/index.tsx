import { IRouteComponentProps } from 'umi';
import styles from './layouts.less';
import Header from '../components/Header';


export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  return (
    <div className={styles.layout}>
      <Header/>
      {children}
    </div>
  )
}

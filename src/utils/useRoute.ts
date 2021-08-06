import { useSelector, useDispatch } from 'umi';

export const useRoute = () => {
  const routes = useSelector((state: any)=>state.app.routes);
  const curRouteIndex = useSelector((state: any) => state.app.curRouteIndex);
  const curRoute = routes[curRouteIndex];
  const dispatch = useDispatch();
  const toggleRouteForward = () => {
    dispatch({
      type: 'app/routeForward',
    })
  }
  const toggleRouteBackward = () => {
    dispatch({
      type: 'app/routeBackward'
    })
  }
  const jumpToRoute = (path: string) => {
    dispatch({
      type: 'app/setRoute',
      payload: path,
    })
  }
  return [
    {
      route: curRoute,
      index: curRouteIndex,
    },
    toggleRouteForward,
    toggleRouteBackward,
    jumpToRoute
  ]

}

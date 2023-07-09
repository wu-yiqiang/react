import { Switch ,NavLink,withRouter} from 'react-router-dom';
import RouterView from '@/router/routerConfig'
import { useState, useEffect, Suspense } from 'react'
import SvgIcon from '@/components/SvgIcon'
import CircularProgress from '@material-ui/core/CircularProgress'
import routerMap from './router/router'
import style from './App.module.less'

function App(props:any) {
  const [footerShow, setFooterShow] = useState(false)
   const [currentIndex, setCurrentIndex] = useState(1)
   const routerChange = () => {
     const targetRouter = routerMap.find((item: any) => item.path === props.location.pathname)
     const index = routerMap.findIndex((item: any) => item.path === props.location.pathname)
     setCurrentIndex(index)
     setFooterShow(targetRouter?.footerShow)
   }
   useEffect(() => {
     routerChange()
   }, [props.location])
   const FooterList = routerMap.map((v, index) => {
    return v.footerShow ? (
      <NavLink key={index} to={v.path} className={style.item} activeClassName={style.active}>
        <SvgIcon name={v.meta.icon} color={currentIndex === index ? '#3f51b5' : '#606060'} size="30px" />
        <div className="title">{v.title}</div>
      </NavLink>
    ) : null
   })
   return (
     <div className={style.page}>
       <div className={style.content}>
         {/* fallback={<CircularProgress />} */}
         <Suspense fallback={''}>
           <Switch>
             <RouterView />
           </Switch>
         </Suspense>
       </div>
       {footerShow ? <div className={style.Footer}>{FooterList}</div> : ''}
     </div>
   )
}

export default withRouter(App)

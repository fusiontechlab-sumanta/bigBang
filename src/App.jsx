import { Suspense, lazy, useEffect, useState } from 'react'

import './App.css'
// import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from 'react-toastify';
import HLSPlayer from './components/Test/Video';
import BasicExample from './components/Test/model';
import Basketball from './pages/Basketball';
import Casino from './pages/Casino/Casino';
import Andarbahar from './pages/Casino/AndarBaharCasino';
import CasinoTeen20 from './pages/Casino/CasinoTeen20';
import Card32 from './pages/Casino/Card32';
import LotteryDetail from './pages/LotteryDetail';
import SettingsPage from './pages/Setting';
import ProtectRoute from './components/Auth/ProtectRoute';
import Loading from './components/Loading';
import './globalsocket'
import './socket'
import socket from './socket';


const queryClient = new QueryClient();

function App() {
  const Home = lazy(() => import('./pages/home'))
  const Header = lazy(() => import('./components/Header'))
  const LeftSidebar = lazy(() => import('./components/LeftSidebar'))
  const RightSidebar = lazy(() => import('./components/RightSidebar'))
  const BottomHeader = lazy(() => import('./components/BottomHeader'))
  const InPlay = lazy(() => import('./pages/InPlay'))
  const MultiMarkets = lazy(() => import('./pages/MultiMarkets'))
  const Cricket = lazy(() => import('./pages/Cricket'))
  const Tennis = lazy(() => import('./pages/Tennis'))
  const Soccer = lazy(() => import('./pages/Soccer'))
  const HorseRacing = lazy(() => import('./pages/HorseRacing'))
  const GreyhoundRacing = lazy(() => import('./pages/GreyhoundRacing'))
  const Politics = lazy(() => import('./pages/Politics'))
  const Lottery = lazy(() => import('./pages/Lottery'))
  const LiveCasino = lazy(() => import('./pages/LiveCasino'))
  const VirtualSports = lazy(() => import('./pages/VirtualSports'))
  const TipsPreviews = lazy(() => import('./pages/TipsPreviews'))
  const Sports = lazy(() => import('./pages/Sports'))
  const Account = lazy(() => import('./pages/Account/Account'))
  const MyProfile = lazy(() => import('./pages/Account/MyProfile'))
  const Booking = lazy(() => import('./pages/Contest/Booking'))
  const BallByBall = lazy(() => import('./pages/Contest/BallByBall'))
  const RollingCommision = lazy(() => import('./pages/Account/RollingCommision'))
  const AccountStatement = lazy(() => import('./pages/Account/AccountStatement'))
  const BetHistory = lazy(() => import('./pages/Account/BetHistory'))
  const ProfitLoss = lazy(() => import('./pages/Account/Profit&Loss'))
  const PasswordHistory = lazy(() => import('./pages/Account/PasswordHistory'))
  const ActivityLog = lazy(() => import('./pages/Account/ActivityLog'))

  const [user, setUser] = useState(false)

  // useEffect(() => {
  //   //live data cricket
  //   socket.emit('getLiveDataByEventId')
  //   const storedToken = localStorage.getItem('token');
  //   // const storedUserName = localStorage.getItem('username');
  //   // const storedPoints = localStorage.getItem('point');

  //   if (storedToken) {
  //     setUser(true);
  //   } else {
  //     setUser(false);
  //   }

  // }, []);
  useEffect(() => {
    // Emit socket event once on mount
    socket.emit('getLiveDataByEventId');
  
    const checkTokenAndLogout = () => {
      const storedToken = localStorage.getItem('token');
  
      if (!storedToken) {
        setUser(false);
        return;
      }
  
      setUser(true);
  
      // Optional: validate token with server (e.g. session expired)
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };
  
      fetch("https://admin.bigbbang.com/api/user-logout", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Logout failed with status ${response.status}`);
          }
          return response.json(); // assuming the server returns JSON
        })
        .then((result) => {
          localStorage.clear();
          setUser(false);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    };
  
    const interval = setInterval(checkTokenAndLogout, 1800000); // Every 1 min
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  



  return (
    <>
   
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loading />}>
            <Header />

          </Suspense>

          <div className='flex w-full  gap-2  overflow-hidden  mt-[0px]'>
            {/* left sidebar */}
            <div className='w-[20%] max-lg:hidden  bg-white'>
              <Suspense fallback={<Loading />}>
                <LeftSidebar />

              </Suspense>
            </div>
            <div className='w-[57%] max-lg:w-full '>
              <Suspense fallback={<Loading />}>

                <Routes>
                  <Route element={<ProtectRoute user={user} />}>
                    <Route path="/multimarket" element={<MultiMarkets />} />
                    <Route path="/activity-log" element={<ActivityLog />} />
                    <Route path="/password-history" element={<PasswordHistory />} />
                    <Route path="/myprofile" element={<MyProfile />} />
                  </Route>
                  <Route path="/" element={<Home />} />
                  <Route path="/${pathSegments}" element={<Navigate to="/" replace />} />
                  <Route path="/inplay" element={<InPlay />} />
                  <Route path="/cricket" element={<Cricket />} />
                  <Route path="/tennis" element={<Tennis />} />
                  <Route path="/soccer" element={<Soccer />} />
                  <Route path="/horseracing" element={<HorseRacing />} />
                  <Route path="/greyhoundracing" element={<GreyhoundRacing />} />
                  <Route path="/politics" element={<Politics />} />
                  <Route path="/lottery" element={<Lottery />} />
                  <Route path="/livecasino" element={<LiveCasino />} />
                  <Route path="/virtualsports" element={<VirtualSports />} />
                  <Route path="/tips" element={<TipsPreviews />} />
                  <Route path="/sports" element={<Sports />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/rolling-commission" element={<RollingCommision />} />
                  <Route path="/account-statement" element={<AccountStatement />} />
                  <Route path="/bet-history" element={<BetHistory />} />
                  <Route path="/profit-loss" element={<ProfitLoss />} />


                  <Route path="/Test" element={<BasicExample />} />
                  <Route path="/fullmarket/:name/:eventId" element={<Booking />} />
                  <Route path="/BallByBall" element={<BallByBall />} />
                  <Route path="/basketball" element={<Basketball />} />
                  <Route path="/casino" element={<Casino />} />


                  <Route path="/Andarbahar" element={<Andarbahar />} />
                  <Route path="/CasinoTeen20" element={<CasinoTeen20 />} />
                  <Route path="/Card32" element={<Card32 />} />

                  <Route path="/lottery/5556" element={<LotteryDetail />} />
                  <Route path="/setting" element={<SettingsPage />} />

                </Routes>

              </Suspense>


            </div>

            <div className='w-[23%] max-lg:hidden bg-white' style={{ "overflow": "scroll" }}>
              <Suspense fallback={<Loading />}>
                <RightSidebar />
              </Suspense>
            </div>


            <div className='fixed lg:hidden bottom-6 bg-gray-600 w-full'>
              <Suspense fallback={<Loading />}>
                <BottomHeader />

              </Suspense>
            </div>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ToastContainer />

    </>
  )
}

export default App

import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLoading,
  IonButton,
  IonToast,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { heart, home } from 'ionicons/icons';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import CountryDetails from './pages/Details/CountryDetails';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useTypedSelector } from './store/reducers';
import _ from 'lodash';

const App: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const isLoading = useTypedSelector((state) => state.country.isLoading);
  const notification = useTypedSelector(
    (state) => state.country.notificationMsg
  );
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setShowLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    const msg = notification.split('-')[0];
    setToastMsg(msg);
    if (!_.isEmpty(notification)) {
      setShowToast(true);
    }
  }, [notification]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact={true} />
            <Route path="/favorites" component={Favorites} exact={true} />
            <Route path="/details/:list/:id" component={CountryDetails} />
            <Route
              path="/"
              render={() => <Redirect to="/home" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="favorites" href="/favorites">
              <IonIcon icon={heart} />
              <IonLabel>Favorites</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
      />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMsg}
        duration={1000}
      />
    </IonApp>
  );
};

export default App;

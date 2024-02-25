import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ref, onValue, getDatabase } from 'firebase/database';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { auth } from 'src/firebase';

import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// ----------------------------------------------------------------------
const token = localStorage.getItem('token');

if (!token) {
  <Navigate to="/login" />;
}
export default function AppView() {
  const [turbidity, setTurbidity] = useState(null);
  const lol = '0';
  useEffect(() => {
    const user = auth.currentUser;
    const db = getDatabase();
    // eslint-disable-next-line prefer-destructuring
    const uid = user.uid;
    // eslint-disable-next-line prefer-template
    const TurbidityRef = ref(db, 'UsersData/' + uid + '/turbidity');
    onValue(TurbidityRef, (snapshot) => {
      console.log(lol);
      const turbidityValue = snapshot.val();
      console.log(turbidityValue);
      setTurbidity(turbidityValue);
    });
  });
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Temperature"
            total="34"
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_sun.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="TDS"
            total="40"
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_circle.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="pH"
            total={turbidity}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_gradient.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Turbidity"
            total="5"
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_cloud.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Overview"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'TDS',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Ph',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Temp',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

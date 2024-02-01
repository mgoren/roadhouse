import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { StyledLink, PageTitle, Paragraph, SectionDivider } from 'components/Layout/SharedStyles';
import config from 'config';
const { EVENTS } = config;

export default function Home() {

  return (
    <>
      <Box sx={{ maxWidth: 700 }}>
        <PageTitle>
          Portland Roadhouse<br />
          Sunday, March 10, 2024
        </PageTitle>

        <Box mb={2}>
          <img src={process.env.PUBLIC_URL + '/roadhouse/roadhouse-logo.png'} alt='' style={{ maxWidth: "100%", height: "auto" }} />
        </Box>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Five Bands and Five Callers<br />
        </Typography>

        <Paragraph sx={{ mb: 2 }}>
          Final event of the <StyledLink to='https://cascadepromenade.org'>Cascade Promenade</StyledLink>
        </Paragraph>

        <Paragraph>
          The Iron and Titanium Dancer awards return!
        </Paragraph>

        <Paragraph>
          Benefit for <StyledLink to='https://nwfolklife.org'>NW Folklife</StyledLink>
        </Paragraph>

        <Paragraph>
          <StyledLink to='flyer.pdf'>Portland Roadhouse flyer</StyledLink>
        </Paragraph>

        <Paragraph>
          Noon to 6:25pm
        </Paragraph>

        <Paragraph>
          Admission $10 to $25, sliding scale
        </Paragraph>

        <Paragraph>
          The Portland Roadhouse will follow PCDC's <StyledLink to='https://portlandcountrydance.org/covid19'>Covid Policy</StyledLink>.<br />
        </Paragraph>

        <SectionDivider />
      </Box>

      <Typography variant='h4' align='center' sx={{ m: 4 }}>
        2024 Roadhouse Schedule
      </Typography>

      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Grid container spacing={0} sx={{ mt: 4 }}>
          <Grid border='solid' item xs={2}><Typography variant="h6">Start</Typography></Grid>
          <Grid border='solid' item xs={2}><Typography variant="h6">End</Typography></Grid>
          <Grid border='solid' item xs={8}><Typography variant="h6">Event</Typography></Grid>

          {EVENTS.map((event, index) => (
            <React.Fragment key={index}>
              <Grid border='solid' item xs={2}><Typography sx={{p: 2}}>{event.start}</Typography></Grid>
              <Grid border='solid' item xs={2}><Typography sx={{p: 2}}>{event.end}</Typography></Grid>
              <Grid border='solid' item xs={8}>
                  <Typography sx={{p: 2, fontStyle: event.description.includes('with') ? 'normal' : 'italic'}}>
                    {event.description}
                  </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {EVENTS.map((event, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography>{event.start} &ndash; {event.end}</Typography>
            <Typography sx={{fontStyle: event.description.includes('with') ? 'normal' : 'italic'}}>
              {event.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}

import { Typography, Box, } from '@mui/material';
import { StyledLink, StyledPaper, PageTitle, Paragraph } from 'components/Layout/SharedStyles';

export default function Home() {

  return (
    <StyledPaper extraStyles={{ maxWidth: 750 }} align="center">
      <PageTitle>
        Portland Roadhouse<br />
        Sunday, March 10, 2024
      </PageTitle>

      <Box mb={2}>
        <img src={process.env.PUBLIC_URL + '/roadhouse/roadhouse-logo.png'} alt='' />
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Five Bands and Five Callers<br />
      </Typography>

      <Paragraph>
        Watch this space for details.
      </Paragraph>

      <Paragraph>
        Noon to about 6:00pm
      </Paragraph>

      <Paragraph>
        Admission $10 to $25, sliding scale
      </Paragraph>

      <Paragraph sx={{ mb: 2 }}>
        Final event of the <StyledLink to='https://cascadepromenade.org'>Cascade Promenade</StyledLink>
      </Paragraph>

      <Paragraph>
        The Iron and Titanium Dancer awards return!
      </Paragraph>

      <Paragraph>
        Benefit for <StyledLink to='https://nwfolklife.org'>NW Folklife</StyledLink>
      </Paragraph>
    </StyledPaper>
  );
}

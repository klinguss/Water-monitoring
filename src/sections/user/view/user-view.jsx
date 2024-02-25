import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { auth } from 'src/firebase';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const user = auth.currentUser;
    setEmail(user.email);
  }, []);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">User</Typography>
      </Stack>

      <Stack spacing={3} sx={{ height: 1 }}>
        <TextField name="email" label="Email address" value={email} />
      </Stack>
    </Container>
  );
}

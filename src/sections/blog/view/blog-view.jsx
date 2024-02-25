import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {
  Alert,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { posts } from 'src/_mock/blog';
import { db, auth } from 'src/firebase';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function BlogView() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const postsCollectionRef = collection(db, 'posts');
  const handleClick = async (e) => {
    e.preventDefault();
    await addDoc(postsCollectionRef, {
      text,
      author: { name: auth.currentUser.email, id: auth.currentUser.uid },
    });
    <Alert severity="success">This is a success Alert.</Alert>;
    setOpen(false);
    Navigate('/blog');
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Blog</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleClickOpen}
        >
          New Post
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: {},
          }}
        >
          <DialogTitle>Create Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Share your current progress. This will help the community
            </DialogContentText>
            <TextField
              sx={{ my: 3 }}
              name="title"
              label="Title"
              value={title}
              multiline
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={{ my: 0.5 }}
              name="text"
              label="Text"
              value={text}
              multiline
              fullWidth
              onChange={(e) => setText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={handleClick}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </Container>
  );
}

import { Title, Text, Container } from '@mantine/core';
import classes from './Error.module.css';

export function MaxParticipantContainer() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>409</div>
      <Title className={classes.title}>The maximum number of users has been reached.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 409 page.<br/>
        The maximum number of users for the meeting you accessed has been reached.<br/>
        Please contact your meeting administrator.
      </Text>
    </Container>
  );
}
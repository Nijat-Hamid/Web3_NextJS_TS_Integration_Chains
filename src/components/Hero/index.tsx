import { createStyles, Title, Text, Container, rem,Box } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: rem(20),
    paddingBottom: rem(80),

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('xs')]: {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

}));

export function HeroText() {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper} >
      <div className={classes.inner}>
        <Title className={classes.title}>
          Lending Borrowing{' '}
          <Text component="span" className={classes.highlight} inherit>
            WETH-AAVEV2
          </Text>{' '}
          for chain-Ethereum
        </Title>

        <Container p={0} >
          <Text size="lg" color="dimmed" className={classes.description}>
            AAVE v2 Contract: 0x987115C38Fd9Fd2aA2c6F1718451D167c13a3186
          </Text>
          
        </Container>
      </div>
    </Box>
  );
}
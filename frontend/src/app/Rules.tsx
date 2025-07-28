import { Info } from '@mui/icons-material';
import { Button, Link } from '@mui/material';

export function Rules() {
    return (
        <Button
            variant={'contained'}
            startIcon={<Info />}
            component={Link}
            href={'https://github.com/eoyoa/Julink/blob/main/RULES.md'}
            target="_blank"
            rel="noopener noreferrer"
        >
            Rules
        </Button>
    );
}
